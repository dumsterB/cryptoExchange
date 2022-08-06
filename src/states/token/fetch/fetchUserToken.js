import { apiClient } from '@/app/api/client';
import { MOCK_API_CALLS } from '@/config';

export async function fetchUserToken(id) {
    if (MOCK_API_CALLS)
        return {
            id: 'solana',
            type: 'coin',
            name: 'Solana',
            symbol: 'SOL',
            chain: 'Solana',
            address: '0x02140412sadasd41221',
            value: 0,
            price: 30,
            standard: null,
            decimals: 18,
            website: ['https://solana.com'],
            explorer: [
                'https://explorer.solana.com',
                'https://solanabeach.io',
                'https://solana.fm/',
            ],
            iconUrl: '/images/crypto/sol.png',
        };
        
    const { message: data } = await apiClient.post(
        '/wallet/asset',
        { assetID: id }
    );
    
    return data;
}

export const userTokenState = {
    id: '%id%',
    type: '%type%',
    name: '%name%',
    symbol: '%symbol%',
    chain: '%chain%',
    address: '%address%',
    value: 0,
    price: 0,
    standard: null,
    decimals: 0,
    website: [],
    explorer: [],
    iconUrl: '%iconUrl%'
};