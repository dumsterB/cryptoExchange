// import useSWRV from 'swrv';
// import { computed } from 'vue';

// export function useFetch(key, fetchCb, initialData = {}) {
//     const { data: res, error } = useSWRV(key, fetchCb);

//     const data = computed(
//         () => res.value ?? initialData
//     );
//     const isLoading = computed(
//         () => res.value === undefined && !error.value
//     );

//     return {
//         data,
//         error,
//         isLoading
//     };
// }

import { onMounted, ref } from 'vue';

export function useFetch(cacheKey, fetchCb, initialData) {
    const data = ref({ ...initialData });
    const error = ref('');
    const isLoading = ref(false);

    const fetch = async () => {
        try {
            isLoading.value = true;

            data.value = await fetchCb();

            isLoading.value = false;
        } catch ({ message }) {
            error.value = message;
        }
    };

    onMounted(fetch);

    return {
        data,
        error,
        isLoading
    };
}