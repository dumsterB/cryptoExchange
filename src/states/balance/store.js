import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useBalanceStore = defineStore('balance', {
    state: () => ({
        hideBalances: useStorage('hide-balances', false)
    })
});