import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useBalance = defineStore('balance', {
    state: () => ({
        balance: useStorage('balance', 1000)
    })
});