import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTimer } from './useTimer';
import { useToast } from '@/components/Toast';
import { OPT_CODE_SEND_INTERVAl } from '@/config/constants/auth';
import wrappedAsyncFunction from '@/utils/wrappedAsyncFunction';

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

    const wrappedSendFetch = wrappedAsyncFunction(sendFetch);
    const wrappedSubmitFetch = wrappedAsyncFunction(submitFetch);

    const send = async () => {
        state.loading = true;

        const { error } = await wrappedSendFetch();

        state.loading = false;

        if (error) {
            toast.openDanger(t(error));
        } else {
            startTimer({
                onStart: () => state.sendingAvailable = false,
                onEnd: () => state.sendingAvailable = true
            });
        }
    };

    const submit = async code => {
        state.loading = true;

        const { error, ...data } = await wrappedSubmitFetch(code);

        state.loading = false;

        if (error) {
            toast.openDanger(t(error));
        } else {
            handleSuccessSubmit(data);
        }
    };

    return {
        state,
        timer,
        send,
        submit
    };
}