import { defineStore } from 'pinia';
// import { USD_TYPE, ALL_CURRENCIES } from '@/utils/currency';

export const useMainStore = defineStore('main', {
    state: () => ({
        // currency: USD_TYPE,
        hideBalances: false
    }),

    actions: {
        // changeCurrency(currency) {
        //     if (!ALL_CURRENCIES.map(({ id }) => id).includes(currency)) {
        //         console.warn('unknown currency');

        //         return;
        //     }

        //     this.currency = currency;
        // }
    }
});