import { apiClient } from '@/app/api/client';
import { MOCK_API_CALLS } from '@/config';

async function fetchAffiliateFriends() {
    if (MOCK_API_CALLS)
        return [
            {
                name: 'Дмитрий Сергеев',
                email: 'serg****@mail.ru',
                income: 25.00,
                level: 1
            },
            {
                name: 'Дмитрий Сергеев',
                email: 'serg****@mail.ru',
                income: 25.00,
                level: 1
            }
        ];

    const { message } = await apiClient.post('/affiliate/friends');

    return message;
}

export default fetchAffiliateFriends;