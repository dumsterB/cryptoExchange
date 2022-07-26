import { defineStore } from 'pinia';

export const currencies = {
    rub: {
        almostZero: '~0,00 ₽',
        code: 'rub',
        locale: 'ru',
        name: 'russianRuble',
        symbol: 'RUB',
        sign: '₽',
        image: '/images/fiat/rub.png'
    },
    eur: {
        almostZero: '~0,00 €',
        code: 'eur',
        locale: 'de-DE',
        name: 'euro',
        symbol: 'Euro',
        sign: '€',
        image: '/images/fiat/eur.png'
    },
    usd: {
        almostZero: '~$0.00',
        code: 'usd',
        locale: 'en-US',
        name: 'usDollar',
        symbol: 'USD',
        sign: '$',
        image: '/images/fiat/usd.png'
    }
};

export const useCurrencyStore = defineStore('currency', {
    state() {
        return {
            code: currencies.usd.code
        };
    },
    getters: {
        currency() {
            return currencies[this.code];
        }
    }
});