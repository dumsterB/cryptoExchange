import { onMounted, onUnmounted, watch } from 'vue';
import { useCurrencyStore } from '@/stores/currency';
import { storeToRefs } from 'pinia';

export function useSocketSub({
    subscribeCb,
    unsubscribeCb,
    watchForCurrencyChange = true
}) {
    const currencyStore = useCurrencyStore();
    const { code } = storeToRefs(currencyStore);

    if (watchForCurrencyChange) {
        watch(code, subscribeCb);
    }

    onMounted(subscribeCb);
    onUnmounted(unsubscribeCb);
}