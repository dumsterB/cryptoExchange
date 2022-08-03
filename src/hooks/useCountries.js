import { ref, onBeforeMount, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

export function useCountries() {
    const { locale } = useI18n();

    const countries = shallowRef([]);
    const isLoading = ref(false);

    const load = async () => {
        try {
            const countries = await import(`../app/localization/countries/${ locale.value }.json`);
    
            return countries.default;
        } catch ({ message }) {
            console.error(message);
    
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