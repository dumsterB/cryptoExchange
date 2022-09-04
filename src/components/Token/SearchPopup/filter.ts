import type { Token } from '@/states/types';
import { computed, unref, type ComputedRef, type Ref } from 'vue';

export function createFilterCurrency(search: Ref<string>): (token: Token) => boolean {
    const lowerSearchParts = unref(search)
        .toLowerCase()
        .split(/\s+/)
        .filter((s: string) => s.length > 0);
  
    if (lowerSearchParts.length === 0) {
        return () => true;
    }
  
    const matchesSearch = (s: string): boolean => {
        const sParts = s
            .toLowerCase()
            .split(/\s+/)
            .filter((s_) => s_.length > 0);
  
        return lowerSearchParts.every(
            (p: string) => p.length === 0 || sParts.some((sp) => sp.startsWith(p) || sp.endsWith(p))
        );
    };

    return ({ symbol, name }) => !!(symbol && matchesSearch(symbol)) || !!(name && matchesSearch(name));
}
  

export function useSortedCurrenciesByQuery(currencies: Ref<Token[]>, searchQuery: Ref<string>): ComputedRef<Token[]> {
    return computed(() => {
        if (!currencies.value)
            return [];
        
        const trimmedSearchQuery = searchQuery.value.toLowerCase().trim();

        const symbolMatch = trimmedSearchQuery.split(/\s+/).filter(
            (s) => s.length > 0
        );

        if (symbolMatch.length > 1)
            return currencies.value;
    
        const exactMatches: Token[] = [];
        const symbolSubstrings: Token[] = [];
        const rest: Token[] = [];

        currencies.value.forEach((currency) => {
            const currencySymbol = currency.symbol?.toLowerCase();

            if (currencySymbol === symbolMatch[0] || currency.name?.toLowerCase() === trimmedSearchQuery) {
                return exactMatches.push(currency);
            }

            if (currencySymbol.startsWith(trimmedSearchQuery)) {
                return symbolSubstrings.push(currency);
            }

            return rest.push(currency);
        });

        return [
            ...exactMatches,
            ...symbolSubstrings,
            ...rest
        ];
    });
}