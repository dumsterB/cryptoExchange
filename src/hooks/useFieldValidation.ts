import { computed } from 'vue';
import { useField } from 'vee-validate';

const record = <K extends string, V>(key: K, value: V) => ({ [key]: value }) as Record<K, V>;

export function useFieldValidation<T extends string>(name: T) {
    const { errorMessage, value, handleChange } = useField(
        name,
        undefined,
        { validateOnValueUpdate: false }
    );

    const listeners = computed(() => ({
        blur: handleChange,
        change: handleChange,
        input: errorMessage.value
            ? handleChange // aggressive
            : (e: Event) => handleChange(e, false) // lazy
    }));

    return {
        ...record(`${name}` as const, value),
        ...record(`${name}Error` as const, errorMessage),
        ...record(`${name}Listeners` as const, listeners),
    };
}