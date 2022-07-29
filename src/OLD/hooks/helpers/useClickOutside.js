import { onBeforeUnmount, onMounted, ref, unref } from 'vue';

export function useClickOutside(target, handler, options = {}) {
    const { ignore = [], triggerOnMount = true } = options;

    if (!window)
        return;

    const shouldListen = ref(true);

    let fallback;

    const listener = (event) => {
        window.clearTimeout(fallback);
    
        const el = unref(target);
        const composedPath = event.composedPath();
    
        if (!el || el === event.target || composedPath.includes(el) || !shouldListen.value)
            return;
    
        if (ignore?.length > 0) {
            if (ignore.some((target) => {
                const el = unref(target);

                return el && (event.target === el || composedPath.includes(el));
            }));

            return;
        }
    
        handler(event);
    };

    const onPointerDown = e => {
        const el = unref(target);

        shouldListen.value = !!el && !e.composedPath().includes(el);
    };

    const onPointerup = e => {
        fallback = window.setTimeout(() => listener(e), 50);
    };

    const initClickOutside = () => {
        window.addEventListener('click', listener, { passive: true });
        window.addEventListener('pointerdown', onPointerDown, { passive: true });
        window.addEventListener('pointerup', onPointerup, { passive: true });
    };

    const destroyClickOutside = () => {
        window.removeEventListener('click', listener);
        window.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointerup', onPointerup);
    };

    if (triggerOnMount) {
        onMounted(initClickOutside);
        onBeforeUnmount(destroyClickOutside);
    }

    return {
        initClickOutside,
        destroyClickOutside
    };
}