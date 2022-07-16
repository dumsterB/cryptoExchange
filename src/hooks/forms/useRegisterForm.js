import { reactive, ref } from 'vue';
import { object, string, ref as yupRef } from 'yup';

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import { useToast } from '@/hooks/toast/useToast';

import { handleRegister } from '@/services/auth/register/start';
import { EMAIL_FIELD, PHONE_FIELD, PASSWORD_FIELD, PASSWORD_CONFIRM_FIELD } from '@/services/auth/fields';

export function useRegisterForm() {
    const { t } = useI18n(); 
    const toast = useToast();
    const router = useRouter();

    const PHONE_MAX_LENGTH = 13;
    const PASSWORD_MIN_LENGTH = 8;
    const PASSWORD_MAX_LENGTH = 32;

    const validationSchema = object({
        [EMAIL_FIELD]: string()
            .required(t('errors.empty'))
            .email(t('errors.invalidEmail')),
        [PHONE_FIELD]: string()
            .required(t('errors.empty'))
            .max(PHONE_MAX_LENGTH, t('errors.maxLength', { count: PHONE_MAX_LENGTH })),
        [PASSWORD_FIELD]: string()
            .required(t('errors.empty'))
            .min(PASSWORD_MIN_LENGTH, t('errors.minLength', { count: PASSWORD_MIN_LENGTH }))
            .max(PASSWORD_MAX_LENGTH, t('errors.maxLength', { count: PASSWORD_MAX_LENGTH }))
            .matches(/[a-zA-Z]/, t('errors.containsOneCapitalLetter')),
        [PASSWORD_CONFIRM_FIELD]: string()
            .required(t('errors.empty'))
            .oneOf([yupRef(PASSWORD_FIELD), null], t('errors.passwordNotMatch'))
    });

    const isLoading = ref(false);

    const {
        handleSubmit,
        setFieldError
    } = useForm({ validationSchema });

    const {
        value: email,
        errorMessage: emailError
    } = useField(EMAIL_FIELD);

    const {
        value: phone,
        errorMessage: phoneError
    } = useField(PHONE_FIELD);

    const phoneCountry = reactive({
        code: 'ru',
        dialCode: '+7'
    });

    const {
        value: password,
        errorMessage: passwordError
    } = useField(PASSWORD_FIELD);

    const {
        value: passwordConfirm,
        errorMessage: passwordConfirmError
    } = useField(PASSWORD_CONFIRM_FIELD);


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
            toast.open({
                view: 'danger',
                text: t(error)
            });
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