import router from '@/router';

import AccessToken from './tokens/AccessToken';
import RefreshToken from './tokens/RefreshToken';

import { useUserStore } from '@/stores/user';
import { logoutFromAccount } from '@/services/api/repositories/auth';

export function systemLogout() {
    AccessToken.remove();
    RefreshToken.remove();

    const userStore = useUserStore();

    userStore.reset();
}

export async function logout() {
    try {
        await logoutFromAccount(); // async function
    } catch ({ message }) {
        console.error(message);
    }

    systemLogout();

    router.push('/login');
}