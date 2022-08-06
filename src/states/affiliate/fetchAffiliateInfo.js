import { apiClient } from '@/app/api/client';
import { MOCK_API_CALLS } from '@/config';

async function getAffiliateInfo() {
    if (MOCK_API_CALLS)
        return {
            code: '370641523',
            income: 0,
            allFriends: 0,
            activeFriends: 0
        };
        
    const { message } = await apiClient.post('/affiliate/info');

    return message; 
}

export default getAffiliateInfo;