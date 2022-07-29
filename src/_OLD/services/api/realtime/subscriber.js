import { ref, onMounted, onUnmounted } from 'vue'

export function useSubscriberForRealtimeUpdate(subscribeCb, unsubscribeCb) {
    const data = ref([]);

    onMounted(() => {
        subscribeCb(result => {
            data.value = result;
        });
    });

    onUnmounted(() => {
        unsubscribeCb(); 
    });

    return {
        data
    };
}