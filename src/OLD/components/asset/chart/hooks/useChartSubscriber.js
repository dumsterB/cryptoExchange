import { onUnmounted, watch, watchEffect } from 'vue';

export function useChartSubscriber(
    subCallback,
    interval,
    delay,
    isReady
) {
    let timeout;
    
    watch(
        interval,
        subCallback
    );

    const start = () => {
        if (delay) {
            timeout = setTimeout(
                subCallback,
                delay
            );
        } else {
            subCallback();
        }
    };

    if (isReady.value) {
        start();
    } else {
        const stopWatcher = watchEffect(() => {
            if (isReady.value) {
                start();
                stopWatcher();
            }
        });
    }
    
    onUnmounted(() => {
        if (timeout) {
            clearTimeout(timeout);
        }
    });
}