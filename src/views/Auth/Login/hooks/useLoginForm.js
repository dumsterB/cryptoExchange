import { ref } from 'vue';
import { object, string } from 'yup';
import { handleLogin } from '@/states/user/services/login';
import { fields } from '@/utils/auth';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useToast } from '@/components/Toast';
import { useField, useForm } from 'vee-validate';

export function useLoginForm() {
    const { t } = useI18n();
    const toast = useToast();
    const router = useRouter();

    const validationSchema = object({
        [fields.EMAIL]: string()
            .required(t('errors.empty'))
            .email(t('errors.invalidEmail')),
        [fields.PASSWORD]: string().required(t('errors.empty'))
    });

    const { handleSubmit } = useForm({ validationSchema });

    const {
        value: email,
        errorMessage: emailError
    } = useField(fields.EMAIL);

    const {
        value: password,
        errorMessage: passwordError
    } = useField(fields.PASSWORD);

    const isLoading = ref(false);

    const login = handleSubmit(async ({ email, password }) => {
        isLoading.value = true;

        const result = await handleLogin({
            login: email,
            password
        });

        isLoading.value = false;

        if (result?.error) {
            toast.openDanger(t(result.error));
        }

        if (result?.ok) {
            router.push({ name: 'home' });
        }
    });

    return {
        isLoading,
        login,
        email,
        emailError,
        password,
        passwordError
    };
}