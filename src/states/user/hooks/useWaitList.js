import { useStorage } from '@vueuse/core';
import { computed } from 'vue';

const lists = new Map();

export const waitLists = {
    REGISTER: 'waitlist-register',
    RESET_PASSWORD: 'waitlist-reset-password'
};

// return waitlist controls and data
export function useWaitList(key) {
    let storage;

    // init or get waitlist
    if (lists.has(key)) {
        storage = lists.get(key);
    } else {
        storage = useStorage(
            key,
            { id: null }
        );

        lists.set(
            key,
            storage
        );
    }

    const id = computed(() => storage.value?.id);

    const update = id =>  storage.value.id = id;
    const remove = () => storage.value = null;

    return {
        id,
        update,
        remove
    };
}