import { wrappedAsyncFunction } from "@/utils/wrappedFunction";
import { onBeforeMount, onMounted, ref } from "vue";

export function useFetch(fetchCb, initialProps = null) {
    const data = ref({});
    const isLoading = ref(false);

    const wrappedFetchCb = wrappedAsyncFunction(fetchCb);

    onBeforeMount(async () => {
        data.value = await wrappedFetchCb();
    });

    onBefe

    return {
        data,
        isLoading
    };
}