import useSWRV from "swrv";
import { computed} from "vue";

export function useSwr(key, fetchCb) {
    const { data, error } = useSWRV(key, fetchCb);

    const isLoading = computed(() => {
        return data.value === undefined && !error.value;
    });

    return {
        data,
        error,
        isLoading
    };
}