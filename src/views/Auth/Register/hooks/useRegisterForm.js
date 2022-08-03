import { reactive, ref } from 'vue';
import { object, string, ref as yupRef } from 'yup';
import { handleRegister } from '@/states/user/services/register';
import { fields } from '@/utils/auth';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import { useToast } from '@/components/Toast';

export function useRegisterForm() {
    const { t } = useI18n(); 
    const toast = useToast();
    const router = useRouter();

    // TODO: move to config
    const PHONE_MAX_LENGTH = 13;
    const PASSWORD_MIN_LENGTH = 8;
    const PASSWORD_MAX_LENGTH = 32;

    const validationSchema = object({
        [fields.EMAIL]: string()
            .required(t('errors.empty'))
            .email(t('errors.invalidEmail')),
        [fields.PHONE]: string()
            .required(t('errors.empty'))
            .max(PHONE_MAX_LENGTH, t('errors.maxLength', { count: PHONE_MAX_LENGTH })),
        [fields.PASSWORD]: string()
            .required(t('errors.empty'))
            .min(PASSWORD_MIN_LENGTH, t('errors.minLength', { count: PASSWORD_MIN_LENGTH }))
            .max(PASSWORD_MAX_LENGTH, t('errors.maxLength', { count: PASSWORD_MAX_LENGTH }))
            .matches(/[a-zA-Z]/, t('errors.containsOneCapitalLetter')),
        [fields.PASSWORD_CONFIRM]: string()
            .required(t('errors.empty'))
            .oneOf([yupRef(fields.PASSWORD), null], t('errors.passwordNotMatch'))
    });

    const isLoading = ref(false);

    const {
        handleSubmit,
        setFieldError
    } = useForm({ validationSchema });

    const {
        value: email,
        errorMessage: emailError
    } = useField(fields.EMAIL);

    const {
        value: phone,
        errorMessage: phoneError
    } = useField(fields.PHONE);

    // TODO: autodetect phone
    const phoneCountry = reactive({
        code: 'ru',
        dialCode: '+7'
    });

    const {
        value: password,
        errorMessage: passwordError
    } = useField(fields.PASSWORD);

    const {
        value: passwordConfirm,
        errorMessage: passwordConfirmError
    } = useField(fields.PASSWORD_CONFIRM);


    const register = handleSubmit(async ({ phone, ...fields }) => {
        isLoading.value = true;

        const { ok, error } = await handleRegister(
            {
                phone: `${ phoneCountry.dialCode }${ phone }`,
                ...fields
            },
            (field, message) => setFieldError(field, t(message))
        );

        isLoading.value = false;

        if (error) {
            toast.openDanger(t(error));
        }

        if (ok) {
            router.push({ name: 'registerFlow' });
        }
    });

    return {
        isLoading,
        register,
        email,
        emailError,
        phone,
        phoneError,
        phoneCountry,
        password,
        passwordError,
        passwordConfirm,
        passwordConfirmError
    };
}