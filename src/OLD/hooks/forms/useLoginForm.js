import { ref } from 'vue';
import { object, string } from 'yup';

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useToast } from '../toast/useToast';
import { useField, useForm } from 'vee-validate';

import { handleLogin } from '@/services/auth/login';
import { EMAIL_FIELD, PASSWORD_FIELD } from '@/services/auth/fields';

export function useLoginForm() {
    const { t } = useI18n();
    const toast = useToast();
    const router = useRouter();

    const validationSchema = object({
        [EMAIL_FIELD]: string()
            .required(t('errors.empty'))
            .email(t('errors.invalidEmail')),
        [PASSWORD_FIELD]: string().required(t('errors.empty'))
    });

    const { handleSubmit } = useForm({ validationSchema });

    const {
        value: email,
        errorMessage: emailError
    } = useField(EMAIL_FIELD);

    const {
        value: password,
        errorMessage: passwordError
    } = useField(PASSWORD_FIELD);

    const isLoading = ref(false);

    const login = handleSubmit(async ({ email, password }) => {
        isLoading.value = true;

        const result = await handleLogin({
            login: email,
            password
        });

        isLoading.value = false;

        if (result?.error) {
            toast.open({
                view: 'danger',
                text: t(result.error)
            });
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