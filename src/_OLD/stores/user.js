import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        set(user) {
            this.user = user;
        },
        reset() {
            this.user = null;
        }
    }
});