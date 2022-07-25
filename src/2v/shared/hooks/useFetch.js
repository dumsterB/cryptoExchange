import { wrappedAsyncFunction } from "@/utils/wrappedFunction";
import { onBeforeMount, ref } from "vue";

export function useFetch(fetchCb, initialProps = null) {
    const data = ref(initialProps || {});
    const error = ref('');
    const isLoading = ref(false);

    const wrappedFetchCb = wrappedAsyncFunction(fetchCb);

    onBeforeMount(async () => {
        isLoading.value = true;

        const {
            error: errorMsg,
            ...res
        } = await wrappedFetchCb();

        isLoading.value = false;

        if (res) {
            data.value = res;
        }

        if (error.value) {
            error.value = errorMsg;
        }
    });

    return {
        data,
        isLoading
    };
}