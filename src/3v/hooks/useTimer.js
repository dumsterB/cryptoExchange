import { onUnmounted, ref, unref } from 'vue';

const SECOND = 1;
const MS_IN_SECOND = 1000;

export function useTimer(secondsInterval) {
    let timeout;
    let interval;

    const timer = ref(0);
    const secondsIntervalMs = unref(secondsInterval) * MS_IN_SECOND;

    const startTimer = (onStart = null, onEnd = null) => {
        onStart?.();

        timer.value = secondsInterval;

        interval = setInterval(
            () => timer.value -= SECOND,
            MS_IN_SECOND
        );
    
        timeout = setTimeout(
            () => {
                onEnd?.();
                resetTimer();
            },
            secondsIntervalMs
        );   
    };

    const resetTimer = () => {
        timer.value = 0;

        clearTimeout(timeout);
        clearInterval(interval);
    };

    onUnmounted(resetTimer);

    return {
        timer,
        startTimer,
        resetTimer
    };
}