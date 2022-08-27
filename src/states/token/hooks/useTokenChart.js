import { onUnmounted, ref, watchEffect } from 'vue';
import { socketClient } from '@/app/api/client';
import { useCurrencyStore } from '@/states/currency/store';

export function useTokenChart(tokenId, interval) {
    const SOCKET_SCOPE = 'assetChart';

    const subs = new Set();

    const data = ref([]);
    const isLoading = ref(true);
    // const isFullHistoryLoaded = ref(false);
    const currencyStore = useCurrencyStore();

    const subscribeToTokenChart = intervalValue => {
        isLoading.value = true;

        subs.add(intervalValue);
        socketClient.subscribeToScope(
            SOCKET_SCOPE,
            {
                symbol: tokenId,
                period: intervalValue,
                currency: currencyStore.currency.id
            },
            res => {
                if (Array.isArray(res)) {
                    data.value = res;
                } else {
                    data.value.shift();
                    data.value.push(res);
                }

                if (isLoading.value) {
                    isLoading.value = false;
                }

                // if (isFullHistoryLoaded.value) {
                // data.value.shift();
                // data.value.push(res);
                // } else {
                //     data.value = res;
                // }
            }
        );

        // test
        // setTimeout(() => {
        //     isLoading.value = false;
        //     data.value = [{ x: 1, y: 4 }, { x: 4, y: 6 }, { x: 8, y: Math.floor(Math.random() * 10) }, { x: 12, y: Math.floor(Math.random() * 10) }];
        // }, 3000);

        // setTimeout(() => {
        //     // console.log([...toRaw(data.value)]);

        //     data.value.shift();
        //     data.value.push({ x: 16, y: Math.floor(Math.random() * 10) });

        //     // console.log([...toRaw(data.value)]);
        // }, 2000);
    };

    const unsubscribeFromTokenChart = intervalValue => {
        socketClient.unsubscribeFromScope(SOCKET_SCOPE);
        subs.delete(intervalValue);
    };

    const clearSubs = () => {
        subs.forEach(unsubscribeFromTokenChart);
    };

    watchEffect(() => {
        clearSubs();
        subscribeToTokenChart(interval.value);
    });

    onUnmounted(clearSubs);

    return {
        data,
        isLoading
    };
}