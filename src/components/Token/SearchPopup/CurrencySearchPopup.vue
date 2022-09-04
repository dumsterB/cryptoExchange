<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import { AppPopup, AppPopupHead, AppPopupBody, AppPopupSearch } from '@/components/Popup';
import { EmptyPlaceholder } from '@/uikit';
import CurrencyRow from './Row/CurrencyRow';
import type { Token } from '@/states/types';
import { useI18n } from 'vue-i18n';
import { refDebounced } from '@vueuse/shared';
import { createFilterCurrency, useSortedCurrenciesByQuery } from './filter';

// TODO:
// 1. autofocus input
// 2. on search list.scrollTo(0)

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    currencies: {
        type: Array as PropType<Token[]>,
        default: () => ([])
    },
    selectedCurrency: {
        type: Object as PropType<Token>,
        required: true
    },
    search: Boolean,
    opened: Boolean
});

const emit = defineEmits<{
    (e: 'update:opened', opened: boolean): void,
    (e: 'select-currency', currency: Token): void
}>();

const { t } = useI18n();
const input = ref(null);

const title = computed<string>(
    () => props.title || t('selectToken')
);

const isOpen = computed<boolean>({
    get: () => props.opened,
    set: val => emit('update:opened', val)
});

const searchQuery = ref('');
const debouncedQuery = refDebounced(searchQuery, 200);

const filteredCurrencies = computed<Token[]>(() => {
    const filterToken = createFilterCurrency(debouncedQuery);

    return Object.values(props.currencies).filter(filterToken);
});
const filteredQueryCurrencies = useSortedCurrenciesByQuery(
    filteredCurrencies,
    debouncedQuery
);

const handleEnter = () => {
    if (filteredQueryCurrencies.value.length) {
        const currency = filteredQueryCurrencies.value[0];

        if (currency.symbol.toLowerCase() === debouncedQuery.value.trim().toLowerCase() || filteredQueryCurrencies.value.length === 1) {
            handleCurrencySelect(currency);
        }
    }
};

const handleCurrencySelect = (currency: Token) => {
    emit('select-currency', currency);

    isOpen.value = false; 
};
</script>

<template>
    <AppPopup v-model="isOpen">
        <AppPopupHead>
            {{ title }}
        </AppPopupHead>

        <AppPopupSearch
            v-if="search"
            ref="input"
            v-model="searchQuery"
            :placeholder="t('enterTokenName')"
            @keydown.enter="handleEnter"
        />

        <AppPopupBody :class="styles.popupBody">
            <CurrencyRow
                v-for="({ id, type, name, symbol, standard, chain, decimals, value, iconUrl, ...currency }) in filteredCurrencies"
                :key="id"
                :type="type"
                :name="name"
                :symbol="symbol"
                :standard="standard"
                :chain="chain"
                :decimals="decimals"
                :value="value"
                :icon-url="iconUrl"
                :disabled="selectedCurrency.id === id"
                @click="handleCurrencySelect({ id, type, name, symbol, standard, chain, decimals, value, iconUrl, ...currency })"
            />
            
            <EmptyPlaceholder v-if="!filteredCurrencies.length" />
        </AppPopupBody>
    </AppPopup>
</template>

<style lang="scss" module="styles">
@import 'CurrencySearchPopup.module';
</style>