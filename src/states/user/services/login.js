import { useUserStore } from '../store';
import { getUserData } from '../fetch/data';
import { loginWithAccountData } from '../fetch/auth';
import { AccessToken, RefreshToken } from '@/utils/auth';
import wrappedAsyncFunction from '@/utils/wrappedAsyncFunction';

export async function loginWithCredentials() {
    const user = await getUserData();
    const userStore = useUserStore();
    
    if (user) {
        userStore.update(user);
    } else {
        throw new Error('errors.somethingFailed');
    }
}

async function login(form) {
    const result = await loginWithAccountData(form);

    if (!result?.accessToken || !result?.refreshToken) {
        throw new Error('errors.somethingFailed');
    }

    const { accessToken, refreshToken } = result;

    AccessToken.set(accessToken);
    RefreshToken.set(refreshToken);

    await loginWithCredentials();

    return { ok: true };
}

export const handleLogin = wrappedAsyncFunction(login);