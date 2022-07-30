import { onMounted, onUnmounted, watch } from "vue";
import { useCurrencyStore } from "@/stores/currency";
import { storeToRefs } from "pinia";

export function useSocketSub({
    subscribeCb,
    unsubscribeCb,
    watchForCurrencyChange = true
}) {
    const currencyStore = useCurrencyStore();
    const { currencyCode } = storeToRefs(currencyStore);

    if (watchForCurrencyChange) {
        watch(currencyCode, subscribeCb);
    }

    onMounted(subscribeCb);
    onUnmounted(unsubscribeCb);
}