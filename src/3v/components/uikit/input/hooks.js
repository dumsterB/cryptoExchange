import { onMounted, unref } from 'vue';
import Inputmask from 'inputmask';

// TODO: может взять imask js ?
export function useInputMask(input, options = {}) {
    const init = () => Inputmask(options).mask(unref(input));

    onMounted(init);
}