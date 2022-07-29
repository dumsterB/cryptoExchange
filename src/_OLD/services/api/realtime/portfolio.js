import { useCurrencyStore } from '@/2v/entities/currency/store/currency';
import { onMounted, onUnmounted, ref } from 'vue';
import { subscribeToSocketScope } from './client/realtime';

export function useRealtimePortfolioAssetsUpdate() {
    const assets = ref([]);
    const isLoading = ref(true);

    const SCOPE = 'portfolioAssets';
    const currencyStore = useCurrencyStore();

    const subscribe = (updateCallback) => {
        subscribeToSocketScope(
            SCOPE,
            {
                currency: currencyStore.currency.code
            },
            assets => {
                isLoading.value = false;

                updateCallback(assets);
            }
        );

        console.log('do subscribeFromPortfolioAssetsUpdate');
    };

    const unsubscribe = () => {
        // TODO: logic
        console.log('do unsubscribeFromPortfolioAssetsUpdate');
    };

    onMounted(() => {
        subscribe(portfolioAssets => {
            assets.value = portfolioAssets;
        });
    });

    onUnmounted(() => {
        unsubscribe(); 
    });

    return {
        assets,
        isLoading
    };
}

export function useRealtimePortfolioTransactionsUpdate() {
    const transactions = ref([]);

    const subscribe = updateCb => {
        updateCb([
            // {
            //     txs: [
            //         {
            //             id: 'afasfasf',
            //             hash: '0xdde7b4bf512dc99156bde8a4a780466b6a907e43706a8101492eed340bc32e11',
            //             type: 'deposit',
            //             assetFrom: {
            //                 id: 'rub',
            //                 name: 'Ruble',
            //                 symbol: 'RUB',
            //                 decimals: 2,
            //                 chain: null,
            //                 iconUrl: '/images/dev/rub.png',
            //                 value: 7500,
            //                 price: 100,

            //             },
            //             assetTo: {
            //                 id: 'ethereum',
            //                 name: 'Ethereum',
            //                 symbol: 'ETH',
            //                 decimals: 16,
            //                 chain: 'ethereum',
            //                 iconUrl: '/images/dev/eth.png',
            //                 value: 0.09253200,
            //                 price: 100,
            //             },
            //             fee: {
            //                 value: 0.001,
            //                 price: 10
            //             },
            //             addressFrom: null,
            //             addressTo: '0xbbbd96327fb76ee01b660001608aea2e8196e193',
            //             status: 'confirmed',
            //             timestamp: 1654164000
            //         }
            //     ],
            //     dayTs: 1654160400
            // }
        ]);
    };

    const unsubscribe = () => {
        
    };

    onMounted(() => {
        subscribe(transactionsRes => {
            transactions.value = transactionsRes;
        });
    });

    onUnmounted(() => {
        unsubscribe();
    });
    

    return { transactions };
}