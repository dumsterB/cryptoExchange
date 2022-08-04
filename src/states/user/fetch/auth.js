import { apiClient } from '@/app/api/client';
import { MOCK_API_CALLS } from '@/config';

export async function loginWithAccountData({ login, password }) {
    if (MOCK_API_CALLS)
        return {
            accessToken: 'mocked_access_token',
            refreshToken: 'mocked_refresh_token'
        };

    const {
        message: {
            accessToken,
            refreshToken
        }
    } = await apiClient.post(
        '/auth/login',
        { login, password }
    );

    return {
        accessToken,
        refreshToken
    };
}

export async function logoutFromAccount() {
    if (MOCK_API_CALLS)
        return {};
        
    return apiClient.get('/auth/logout');
}

export function getNewTokens(refreshToken) {
    return apiClient.post(
        '/auth/refresh',
        { token: refreshToken }
    );
}