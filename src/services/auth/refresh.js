import AccessToken from './tokens/AccessToken';
import RefreshToken from './tokens/RefreshToken';
import { getNewTokens } from '@/services/api/repositories/auth';
import { wrappedAsyncFunction } from '@/utils/wrappedFunction';

export async function refresh() {
    const { accessToken, refreshToken } = await getNewTokens(RefreshToken.get());

    if (!accessToken || !refreshToken)
        throw new Error('no tokens');

    AccessToken.set(accessToken);
    RefreshToken.set(refreshToken);

    return { ok: true };
}

export const handleRefresh = wrappedAsyncFunction(refresh);