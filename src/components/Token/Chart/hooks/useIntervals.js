import { computed, ref } from 'vue';
import { intervals } from '../config/intervals';

export function useIntervals(styles) {
    const interval = ref(intervals.hour.value);

    const intervalsList = computed(() => Object.values(intervals)
        .map(({ label, value }) => {
            return {
                value,
                label,
                classes: [
                    styles.interval,
                    { [styles.active]: interval.value === value }
                ]
            };
        })
    );

    const updateInterval = val => interval.value = val;

    return {
        interval,
        intervalsList,
        updateInterval
    };
}