import { apiClient } from '@/app/api/client';
import { MOCK_API_CALLS } from '@/config';

export async function getUserData() {
    if (MOCK_API_CALLS)
        return {
            name: 'Вадим',
            surname: 'Александров',
            avatar: '/images/dev/avatar.png',
            email: '',
            phone: '',
            countryCode: '',
            verification: {
                level: 'basic-kyc-level',
                status: 'init',
                result: '',
                videoStatus: '',
                verified: false
            }
        };

    const { message } = await apiClient.get('/user/info');

    return message;
}