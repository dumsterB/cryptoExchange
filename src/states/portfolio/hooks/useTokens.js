import { computed, ref } from 'vue';
import { socketClient } from '@/app/api/client';
import { useSocketSub } from '@/hooks/useSocketSub';
import { useCurrencyStore } from '@/states/currency/store';
import { usePortfolioStore } from '../store';

export function usePortfolioTokens() {
    const SCOPE = 'portfolioAssets';
    const isLoading = ref(true);

    const currencyStore = useCurrencyStore();
    const portfolioStore = usePortfolioStore();

    const tokens = computed(
        () => portfolioStore.list
    );

    useSocketSub({
        subscribeCb: () => {
            socketClient.subscribeToScope(
                SCOPE,
                {
                    currency: currencyStore.id
                },
                res => {
                    isLoading.value = false;
                    portfolioStore.list = res;
                }
            );
        },
        unsubscribeCb: () => socketClient.unsubscribeFromScope(SCOPE)
    });

    return {
        tokens,
        isLoading
    };
}