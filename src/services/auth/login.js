import { useUserStore } from '@/stores/user';
import { wrappedAsyncFunction } from '@/utils/wrappedFunction';
import { getUserMetadata, loginToAccount } from '@/services/api/repositories/auth';
import AccessToken from './tokens/AccessToken';
import RefreshToken from './tokens/RefreshToken';

export async function loginWithTokens() {
    const user = await getUserMetadata();
    const userStore = useUserStore();
    
    if (user) {
        userStore.set(user);
    } else {
        throw new Error('errors.somethingFailed');
    }
}

async function login(form) {
    const result = await loginToAccount(form);

    if (!result?.accessToken || !result?.refreshToken) {
        throw new Error('errors.somethingFailed');
    }

    const { accessToken, refreshToken } = result;

    AccessToken.set(accessToken);
    RefreshToken.set(refreshToken);

    await loginWithTokens();

    return { ok: true };
}

export const handleLogin = wrappedAsyncFunction(login);