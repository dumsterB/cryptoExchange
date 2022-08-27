import { ref } from 'vue';
import { object, string } from 'yup';
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import { useToast } from '@/components/Toast';
import { useFieldValidation } from '@/hooks/useFieldValidation';
import { useWaitList, waitLists } from '@/states/user/hooks/useWaitList';
import { requestPasswordReset } from '@/states/user/fetch/resetPassword';
import parseError from '@/utils/parseError';

// return form logic
export function useEmailForm(onSuccessSubmit) {
    const { t } = useI18n();
    const toast = useToast();
    const waitList = useWaitList(waitLists.RESET_PASSWORD);
    
    const isLoading = ref(false);
    const validationSchema = object({
        email: string()
            .required(t('errors.empty'))
            .email(t('errors.invalidEmail'))
    });

    const { handleSubmit, setFieldError } = useForm({ validationSchema });

    const {
        email,
        emailError,
        emailListeners,
    } = useFieldValidation('email');

    const onSubmit = async ({ email }) => {
        try {
            isLoading.value = true;

            const { waitListID } = await requestPasswordReset(email);

            if (!waitListID)
                throw new Error('no waitlist id!');

            waitList.update(waitListID);
            
            onSuccessSubmit();
        } catch (e) {
            const error = parseError(e);

            setFieldError(
                'email',
                true
            );
            toast.openDanger(t(error));
        } finally {
            isLoading.value = false;
        }
    };

    return {
        email,
        emailError,
        emailListeners,
        isLoading,
        submit: handleSubmit(onSubmit)
    };
}