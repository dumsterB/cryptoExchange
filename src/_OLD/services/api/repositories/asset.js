import apiClient from "../client/apiClient";

export async function getAssetInfo(id) {
    const { message } = await apiClient.post(
        '/wallet/asset',
        { assetID: id }
    );
    
    return message;

    // return  {
    //     id: 'solana',
    //     type: 'coin',
    //     name: 'Solana',
    //     symbol: 'SOL',
    //     chain: 'Solana',
    //     address: '0x02140412sadasd41221',
    //     value: 0,
    //     price: 0,
    //     standard: null,
    //     decimals: 18,
    //     website: ['https://solana.com'],
    //     explorer: [
    //         'https://explorer.solana.com',
    //         'https://solanabeach.io',
    //         'https://solana.fm/',
    //     ],
    //     iconUrl: '/images/crypto/sol.png',
    // };
}