import type {Token} from '@/states/types/types';
import {onMounted} from 'vue';

export function useFetchCurrencies(){
    const currencies:Token[] = [
        {
            id:'1',
            name: 'Solana',
            symbol: 'Sol',
            type: 'coin',
            chain: null,
            price: 32,
            icon: 'solana',
            standard: null,
            decimals: 16,
            explorer: [],
        },
        {
            id:'2',
            name: 'Ethereum',
            symbol: 'Eth',
            type: 'coin',
            chain: null,
            price: 2000,
            icon: 'ethereum',
            standard: null,
            decimals: 16,
            explorer: [],
        },
    ];
    const fetch = async () => {
        try {
            console.log('data');
        } catch ({ message }) {
            console.log(message);
        }
    };
    onMounted(fetch);

    return {
        currencies
    };
}