import { computed, isRef, ref } from 'vue';

export function useSearch(items, max = false) {
    const search = ref('');

    const filteredResults = computed(() => {
        const results = isRef(items)
            ? items.value
            : items;

        if (!search.value)
            return max  
                ? results.slice(0, max)
                : results;

        const arr = [];
        const searchStr = search.value.toLowerCase();

        results.some(country => {
            if (max && arr.length === max)
                return true;

            if (country.text.toLowerCase().substr(0, search.value.length) === searchStr)
                arr.push(country);
        });

        return arr;
    });

    return {
        search,
        filteredResults
    };
}