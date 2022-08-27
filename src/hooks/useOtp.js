import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTimer } from './useTimer';
import { useToast } from '@/components/Toast';
import { OPT_CODE_SEND_INTERVAl } from '@/config/constants/auth';
import parseError from '@/utils/parseError';

export function useOtp({
    sendFetch,
    submitFetch,
    handleSuccessSubmit
}) {
    const { t } = useI18n();
    const toast = useToast();
    const { timer, startTimer } = useTimer(OPT_CODE_SEND_INTERVAl);

    const state = reactive({
        error: false,
        loading: false,
        sendingAvailable: true
    });

    const send = async () => {
        try {
            state.loading = true;

            await sendFetch();

            startTimer({
                onStart: () => state.sendingAvailable = false,
                onEnd: () => state.sendingAvailable = true
            });
        } catch (e) {
            const error = parseError(e);

            toast.openDanger(t(error));
        } finally {
            state.loading = false;
        }
    };

    const submit = async code => {
        try {
            state.loading = true;

            const data = await submitFetch(code);

            handleSuccessSubmit(data);
        } catch (e) {
            const error = parseError(e);

            state.error = true;
            toast.openDanger(t(error));
        } finally {
            state.loading = false;
        }
    };

    const resetError = () => state.error = false;

    return {
        state,
        timer,
        send,
        submit,
        resetError
    };
}