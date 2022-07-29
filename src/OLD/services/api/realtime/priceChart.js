import { useCurrencyStore } from "@/2v/entities/currency/store/currency";
import { reactive, ref } from "vue";
import apiClient from "../client/apiClient";
import { subscribeToSocketScope, unsubscribeFromSocketScope } from "./client/realtime";

export function useRealtimePriceChart(setItems, pushItem) {
    const SOCKET_SCOPE = 'assetChart';

    const subscriber = reactive({
        key: '',
        hasInitRes: false
    });

    const isLoading = ref(true);
    const currencyStore = useCurrencyStore();

    // TODO: loading custom interval
    const subscribeToTickerChart = (ticker, interval) => {
        if (subscriber.key) {
            subscriber.key = '';
            subscriber.hasInitRes = false;

            unsubscribeFromSocketScope();
        }

        const key = `${ ticker }_${ currencyStore.currency.code }_${ interval }`;

        subscriber.key = key;
        subscriber.hasInitRes = false;

        // TODO !!!:  do right payload
        subscribeToSocketScope(
            SOCKET_SCOPE,
            data => {
                if (subscriber.hasInitRes)
                    return pushItem(data);

                setItems(data);
                
                isLoading.value = false;
                subscriber.hasInitRes = true;
            }
        );

        // test
        // const cb = data => {
        //     if (subscriber.hasInitRes)
        //         return pushItem(data);

        //     setItems(data);
                
        //     isLoading.value = false;
        //     subscriber.hasInitRes = true;
        // };

        // setTimeout(() => cb(priceData), 300);
    };

    const unsubscribeFromTickerChart = () => {
        console.log('unsubscribe', subscriber.key);
        subscriber.key = null;
        subscriber.hasInitRes = false;

        unsubscribeFromSocketScope(SOCKET_SCOPE);
    };

    return {
        isLoading,
        subscribeToTickerChart,
        unsubscribeFromTickerChart
    };
}