import router from '@/app/router';
import { useUserStore } from '../store';
import { logoutFromAccount } from '../fetch/auth';
import { AccessToken, RefreshToken } from '@/utils/auth';

export function systemLogout() {
    const userStore = useUserStore();

    userStore.clear();
    AccessToken.remove();
    RefreshToken.remove();
}

export async function logout() {
    try {
        await logoutFromAccount();
    } catch ({ message }) {
        console.error(message);
    }

    systemLogout();
    router.push('/login');
}