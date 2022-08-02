import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state() {
        return {
            user: null,
            // user: {
            //     name: 'Вадим',
            //     surname: 'Александров',
            //     avatar: '/images/dev/avatar.png',
            //     email: '',
            //     phone: '',
            //     countryCode: '',
            //     verification: {
            //         level: 'basic-kyc-level',
            //         status: 'init',
            //         result: '',
            //         videoStatus: '',
            //         verified: false
            //     }
            // }
        };
    },
    actions: {
        update(user) {
            this.user = user;
        },
        clear() {
            this.user = null;
        }
    }
});