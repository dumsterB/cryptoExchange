import AccessToken from '../tokens/AccessToken';
import RefreshToken from '../tokens/RefreshToken';
import { getNewTokens } from '@/states/user/fetch/auth';
import wrappedAsyncFunction from '@/utils/wrappedAsyncFunction';

export async function refreshCredentials() {
    const { accessToken, refreshToken } = await getNewTokens(RefreshToken.get());

    if (!accessToken || !refreshToken)
        throw new Error('no tokens');

    AccessToken.set(accessToken);
    RefreshToken.set(refreshToken);

    return { ok: true };
}

export const handleRefreshCredentials = wrappedAsyncFunction(refreshCredentials);