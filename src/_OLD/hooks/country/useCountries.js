import { ref, onBeforeMount, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import logError from '@/services/logger/error';

// TODO: cache
export function useCountries() {
    const { locale } = useI18n();

    const countries = shallowRef([]);
    const isLoading = ref(false);

    const load = async () => {
        try {
            const countries = await import(`../../locales/countries/${ locale.value }.json`);
    
            return countries.default;
        } catch ({ message }) {
            logError(message);
    
            return [];
        }
    };

    onBeforeMount(async () => {
        isLoading.value = true;

        countries.value = await load();

        isLoading.value = false;
    });

    return {
        countries,
        isLoading
    };   
}