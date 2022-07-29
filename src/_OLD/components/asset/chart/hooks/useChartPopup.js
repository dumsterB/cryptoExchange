import { usePopup } from '@/hooks/helpers/usePopup';

const {
    isPopupOpen: isChartPopupOpen,
    openPopup: openChartPopup,
    closePopup: closeChartPopup
} = usePopup();

export function useChartPopup() {
    return {
        isChartPopupOpen,
        openChartPopup,
        closeChartPopup
    };
}