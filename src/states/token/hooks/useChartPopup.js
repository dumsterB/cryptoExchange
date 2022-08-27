import { ref } from 'vue';

const isOpen = ref(false);

// like a store, for popup.
// Because the open button in a one place and popup comp in another place
export function useChartPopup() {
    const open = () => isOpen.value = true;

    return {
        open,
        isOpen
    };
}