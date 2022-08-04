import { onMounted, onUnmounted } from 'vue';

export function usePopupEscClose(callback) {
    const fn = event => {
        event.key === 'Escape' && callback();
    };

    const add = () => {
        window.addEventListener('keydown', fn);
    };

    const remove = () => {
        window.removeEventListener('keydown', fn);
    };

    onMounted(add);

    onUnmounted(remove);
}