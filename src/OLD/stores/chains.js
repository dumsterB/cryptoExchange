import { defineStore } from 'pinia'

export const useChainsStore = defineStore('chains', {
    state: () => ({
        chains: [
            {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'Bitcoin',
                iconUrl: 'https://amazon',
                explorerName: 'etherscan',
                explorerTokenUrl: 'https://etherscan.io/token/{ADDRESS}',
                explorerTxUrl: 'https://etherscan.io/tx/{HASH}',
                sendingAvailable: true, // лучше учесть изначально, тк сеть может висеть
                tradingAvailable: true
            },
            {
                id: 'ethereum',
                name: 'Ethereum',
                symbol: 'ERC-20',
                iconUrl: 'https://amazon',
                explorerName: 'etherscan',
                explorerTokenUrl: 'https://etherscan.io/token/{ADDRESS}',
                explorerTxUrl: 'https://etherscan.io/tx/{HASH}',
                sendingAvailable: true, // лучше учесть изначально, тк сеть может висеть
                tradingAvailable: true
            },
            {
                id: 'tron',
                name: 'Tron',
                symbol: 'TRC-20',
                iconUrl: 'https://amazon',
                explorerName: 'etherscan',
                explorerTokenUrl: 'https://etherscan.io/token/{ADDRESS}',
                explorerTxUrl: 'https://etherscan.io/tx/{HASH}',
                sendingAvailable: true, // лучше учесть изначально, тк сеть может висеть
                tradingAvailable: true
            },
            {
                id: 'solana',
                name: 'Solana',
                symbol: 'Solana',
                iconUrl: 'https://amazon',
                explorerName: 'etherscan',
                explorerTokenUrl: 'https://etherscan.io/token/{ADDRESS}',
                explorerTxUrl: 'https://etherscan.io/tx/{HASH}',
                sendingAvailable: true, // лучше учесть изначально, тк сеть может висеть
                tradingAvailable: true
            }
        ]
    })
})