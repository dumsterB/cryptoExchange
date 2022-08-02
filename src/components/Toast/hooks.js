import { ref } from 'vue';
import { variants } from './variants';

const toasts = ref([]);

export function useToast() {
    const open = ({ text, view }) => {
        const id = Date.now();

        toasts.value.push({
            id,
            text,
            view
        });
    };

    const openDanger = text => open({
        text,
        view: variants.DANGER
    });

    const remove = id => {
        toasts.value = toasts.value.filter(toast => toast.id !== id);
    };

    return {
        open,
        openDanger,
        remove
    };
}

export function useToasts() {
    return { toasts };
}