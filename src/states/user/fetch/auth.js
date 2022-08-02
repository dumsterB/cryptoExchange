import { apiClient } from '@/app/api/client';

export async function loginWithAccountData({ login, password }) {
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
    return apiClient.get('/auth/logout');
}

export function getNewTokens(refreshToken) {
    return apiClient.post(
        '/auth/refresh',
        { token: refreshToken }
    );
}