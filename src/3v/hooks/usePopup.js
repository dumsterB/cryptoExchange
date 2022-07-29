import { ref } from 'vue';

export function usePopup(isOpen = false) {
    const isPopupOpen = ref(isOpen);

    const openPopup = () => {
        isPopupOpen.value = true;
    }

    const closePopup = () => {
        isPopupOpen.value = false;
    }

    const togglePopup = () => {
        isPopupOpen.value = !isPopupOpen.value;
    }

    return {
        isPopupOpen,
        openPopup,
        closePopup,
        togglePopup
    };
}