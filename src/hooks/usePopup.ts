import { ref } from 'vue';

const record = <K extends string, V>(key: K, value: V) => ({ [key]: value }) as Record<K, V>;

export function usePopup<T extends string>(name: T) {
    const isOpen = ref(false);

    const open = () => {
        isOpen.value = true;
    };

    const close = () => {
        isOpen.value = false;
    };

    const toggle = () => {
        isOpen.value = !isOpen.value;
    };

    return {
        ...record(`is${name}Open` as const, isOpen),
        ...record(`open${name}` as const, open),
        ...record(`close${name}` as const, close),
        ...record(`toggle${name}` as const, toggle)
    };
}