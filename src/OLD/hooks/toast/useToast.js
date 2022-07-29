import { useState } from './useState';

export function useToast() {
    const { toasts } = useState();

    const open = (options = { view: 'default', text: '' }) => {
        const id = Date.now();

        toasts.set(id, options);
    };

    const close = id => {
        toasts.delete(id);
    };

    return {
        open,
        close
    };
}