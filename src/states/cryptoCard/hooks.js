import { useStorage } from '@vueuse/core';

const isVisible = useStorage('show-crypto-card-promo', true);

export function useCryptoCard({ shortDescription = false } = {}) {
    const url = '/order-card';

    const title = 'cryptoCardPromoTitle';
    const description = shortDescription
        ? 'cryptoCardPromoDescriptionShort'
        : 'cryptoCardPromoDescription';


    const hide = () => {
        isVisible.value = false;
    };

    return {
        url,
        title,
        description,
        hide,
        isVisible
    };
}