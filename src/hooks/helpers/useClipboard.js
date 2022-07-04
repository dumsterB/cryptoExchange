import { ref, unref } from 'vue'

export function useClipboard() {
    const navigator = window.navigator;
    const copiedDuring = 1500;
  
    const isCopySupported = Boolean(navigator && 'clipboard' in navigator);
    const isCopied = ref(false);
  
    async function copyToClipboard(source) {
        const value = unref(source);

        if (isCopySupported && value != null) {
            await navigator.clipboard.writeText(value)

            console.log(value)

            isCopied.value = true
           
            setTimeout(() => isCopied.value = false, copiedDuring);
        }
    }
  
    return {
        isCopySupported,
        isCopied,
        copyToClipboard
    }
}