import { ref } from 'vue';
import { object, string, ref as yupRef } from 'yup';
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import { useToast } from '@/components/Toast';
import { useFieldValidation } from '@/hooks/useFieldValidation';
import { useWaitList, waitLists } from '@/states/user/hooks/useWaitList';
import { saveNewPassword } from '@/states/user/fetch/resetPassword';
import { UNKNOWN_ERROR_KEY } from '@/config';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/config/constants/auth';
import parseError from '@/utils/parseError';

// return form logic
export function usePasswordForm(onSuccessSubmit) {
    const { t } = useI18n();
    const toast = useToast();
    const waitList = useWaitList(waitLists.RESET_PASSWORD);
    
    const isLoading = ref(false);
    const validationSchema = object({
        password: string()
            .required(t('errors.empty'))
            .min(PASSWORD_MIN_LENGTH, t('errors.minLength', { count: PASSWORD_MIN_LENGTH }))
            .max(PASSWORD_MAX_LENGTH, t('errors.maxLength', { count: PASSWORD_MAX_LENGTH }))
            .matches(/[a-zA-Z]/, t('errors.containsOneCapitalLetter')),
        passwordConfirm: string()
            .required(t('errors.empty'))
            .oneOf([yupRef('passwordConfirm'), null], t('errors.passwordNotMatch'))
    });

    const { handleSubmit } = useForm({ validationSchema });

    const {
        password,
        passwordError,
        passwordListeners
    } = useFieldValidation('password');

    const {
        passwordConfirm,
        passwordConfirmError,
        passwordConfirmListeners
    } = useFieldValidation('passwordConfirm');

    const submit = async ({ password, passwordConfirm }) => {
        try {
            isLoading.value = true;

            const { ok } = await saveNewPassword(
                waitList.id.value,
                password,
                passwordConfirm
            );

            if (!ok)
                throw new Error(UNKNOWN_ERROR_KEY);

            waitList.remove();
            onSuccessSubmit();
        } catch (e) {
            const error = parseError(e);

            toast.openDanger(t(error));
        } finally {
            isLoading.value = false;
        }
    };

    return {
        isLoading,
        savePassword: handleSubmit(submit),
        password,
        passwordError,
        passwordListeners,
        passwordConfirm,
        passwordConfirmError,
        passwordConfirmListeners
    };
}