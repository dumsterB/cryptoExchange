import { ref } from 'vue';
import { socketClient } from '@/app/api/client';
import { useCurrencyStore } from '@/states/currency/store';
import { useSocketSub } from '@/hooks/useSocketSub';

export function useTokenPrice(tokenId) {
    const SOCKET_SCOPE = 'assetPrice';

    const price = ref(0);
    const currencyStore = useCurrencyStore();

    useSocketSub({
        subscribeCb: () => socketClient.subscribeToScope(
            SOCKET_SCOPE,
            {
                asset: [tokenId],
                currency: currencyStore.currency.id
            },
            value => price.value = value
        ),
        unsubscribeCb: () => socketClient.unsubscribeFromScope(SOCKET_SCOPE)
    });
    
    return { price };
}