import { defineStore } from 'pinia';

export const usePortfolioStore = defineStore('portfolio', {
    state() {
        return {
            list: [],
            assetsTotal: 0, // общая сумма крипты
            assetsTotalFiat: 0, // и тут уже сумма в зависимости от выбранной фиатной валюты
            absoluteChange24h: 0, // это сумма в usd, rub или eur, которая изменилась за 24 час
            relativeChange24h: 0, // это процент изменения за 24 часа
        };
    }
});