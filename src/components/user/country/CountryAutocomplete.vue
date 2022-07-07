<script setup>
import { reactive, ref, watch } from 'vue';
import EmptyPlaceholder from '@/components/general/empty/EmptyPlaceholder.vue';
import FlagIcon from '@/components/general/flag/FlagIcon';
import VInput from '@/components/common/input/VInput.vue';
import { useI18n } from 'vue-i18n';
import { useCountries } from '@/hooks/country/useCountries';
import { useSearch } from '@/hooks/search/useSearch';
import { useClickOutside } from '@/hooks/helpers/useClickOutside';

// TODO: autodetect country
const props = defineProps({
    // country code
    modelValue: {
        type: [String, Number],
        default: ''
    },
    max: {
        type: Number,
        default: 3
    }
});

const emit = defineEmits({
    'update:modelValue': null
});

const { t } = useI18n();

const { countries } = useCountries();
const { search, filteredResults } = useSearch(countries, props.max);

const selectedResult = reactive({
    code: '',
    text: ''
});

watch(search, val => {
    const { text, code } = selectedResult;

    if (code && (!val || text !== val)) {
        selectedResult.text = selectedResult.code = '';

        emit('update:modelValue', '');
    } 
});

const dropdown = ref(null);
const isDropdownVisible = ref(false);

const openDropdown = () => isDropdownVisible.value = true;
const closeDropdown = () => isDropdownVisible.value = false;

const { initClickOutside, destroyClickOutside } = useClickOutside(
    dropdown,
    closeDropdown,
    { triggerOnMount: false }
);

watch(isDropdownVisible, visible => {
    if (visible) {
        initClickOutside();
    } else {
        destroyClickOutside();
    }
});

const selectResult = (code, text) => {
    emit('update:modelValue', code);

    search.value = text;

    selectedResult.code = code;
    selectedResult.text = text;
    
    closeDropdown();
};
</script>

<template>
    <div :class="styles.wrap">

        <VInput
            v-model="search"
            :label="t('country')"
            @keydown="openDropdown"
        >
            <template #addon-left>
                <FlagIcon
                    v-if="selectedResult.code"
                    :code="selectedResult.code"
                    :class="styles.inputFlag"
                />
            </template>
        </VInput>

        <Transition name="country-autocomplete">
            <div
                v-if="isDropdownVisible"
                ref="dropdown"
                :class="styles.dropdown"
            >
                <div
                    v-if="filteredResults.length"
                    :class="styles.list"
                >
                    <div
                        v-for="({ code, text }) in filteredResults"
                        :key="code"
                        :class="styles.country"
                        @click="selectResult(code, text)"
                    >
                        <FlagIcon
                            :code="code"
                            :class="styles.countryFlag"
                        />

                        <div :class="styles.countryText">
                            {{ text }}
                        </div>
                    </div>
                </div>

                <EmptyPlaceholder
                    v-else
                    :class="styles.placeholder"
                />
            </div>
        </Transition>

    </div>
</template>

<style lang="scss" module="styles">
@import './CountryAutocomplete.module.scss';
</style>

<style lang="scss">
.country-autocomplete-enter {
    &-from {
        opacity: 0;
        transform: translate(0, -15px);
    }

    &-to {
        opacity: 1;
        transform: translate(0, 0);
    }

    &-active {
        transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
    }
}
</style>