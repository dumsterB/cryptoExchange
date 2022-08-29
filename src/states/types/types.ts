export type Token = {
    id: string,
    type: 'coin' | 'token' | 'fiat',
    name: string,
    symbol: string,
    chain: string | null,
    value?: number,
    price?: number,
    standard: string | null,
    decimals: number,
    website?: Array<string>,
    explorer: Array<string>,
    icon: string
}

export type Fiat = {
    id: string,
    name: string,
    symbol: string,
    value?: number,
    price?: number,
    decimals: number,
    iconUrl: string
}