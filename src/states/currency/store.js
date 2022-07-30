import { defineStore } from 'pinia';

export const currencies = {
    rub: {
        id: 'ruble',
        almostZero: '~0,00 ₽',
        code: 'rub',
        locale: 'ru',
        name: 'russianRuble',
        symbol: 'RUB',
        sign: '₽',
        image: '/images/fiat/rub.png',
    },
    eur: {
        id: 'euro',
        almostZero: '~0,00 €',
        code: 'eur',
        locale: 'de-DE',
        name: 'euro',
        symbol: 'Euro',
        sign: '€',
        image: '/images/fiat/eur.png',
        // modifyParts: parts => {
        //     if (parts[parts.length - 1]?.type === 'currency') {
        //         const currency = parts.pop();

        //         parts.unshift(currency);
        //     }

        //     return parts;
        // }
    },
    usd: {
        id: 'dollar',
        almostZero: '~$0.00',
        code: 'usd',
        locale: 'en-US',
        name: 'usDollar',
        symbol: 'USD',
        sign: '$',
        image: '/images/fiat/usd.png',
        // modifyParts: parts => {
        //     if (parts[parts.length - 1]?.type === 'currency') {
        //         const currency = parts.pop();

        //         parts.unshift(currency);
        //     }

        //     return parts;
        // }
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
        },
        id() {
            return this.currency.id;
        }
    }
});