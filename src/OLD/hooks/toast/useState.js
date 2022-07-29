import { reactive } from 'vue';

const toasts = reactive(new Map());

export function useState() {
    return { toasts };
}