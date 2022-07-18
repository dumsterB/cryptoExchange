import { onUnmounted, ref, unref } from 'vue';

export function useClipboard() {
    const navigator = window.navigator;
    const copiedDuring = 1500;
  
    const isCopySupported = Boolean(navigator && 'clipboard' in navigator);
    const isCopied = ref(false);

    let timeout;
    let lastCopyTime = 0;
  
    async function copyToClipboard(source) {
        const value = unref(source);

        if (isCopySupported && value != null) {
            await navigator.clipboard.writeText(value);

            isCopied.value = true;
            lastCopyTime = Date.now();
           
            timeout = setTimeout(() => {
                if (Date.now() - lastCopyTime >= copiedDuring) {
                    lastCopyTime = Date.now();
                        
                    isCopied.value = false;
                    timeout = null;
                }
            }, copiedDuring);
        }
    }

    onUnmounted(
        () => timeout && clearTimeout(timeout)
    );
  
    return {
        isCopySupported,
        isCopied,
        copyToClipboard
    };
}