<script setup>
import { computed, useAttrs } from 'vue';
import { VInput, VIcon, VFlagIcon, EmptyPlaceholder } from '@/uikit';
import { AppPopup, AppPopupHead, AppPopupBody, AppPopupSearch } from '@/components/Popup';
import { phoneMask } from './utils';
import { useI18n } from 'vue-i18n';
import { usePopup } from '@/hooks/usePopup';
import { useSearch } from '@/hooks/useSearch'; 
import { useCountries } from '@/hooks/useCountries';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    country: {
        type: Object,
        required: true,
        default: () => ({
            code: '%code%',
            dialCode: '%dialCode%'
        })
    },
    placeholder: {
        type: String,
        default: ''
    },
    error: {
        type: [String, Boolean],
        default: false
    }
});

const emit = defineEmits({
    'update:modelValue': modelValue => typeof modelValue === 'string' || typeof modelValue === 'number'
});

const inputValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', `${ value }`);
    }
});

const attrs = useAttrs();
const { t } = useI18n();

const {
    isPopupOpen,
    openPopup,
    closePopup
} = usePopup('Popup');

const { countries } = useCountries();
const { search, filteredResults } = useSearch(countries);

const selectCountry = (code, dialCode) => {
    const { country } = props;

    country.code = code;
    country.dialCode = dialCode;

    closePopup();
};
</script>

<template>
    <VInput
        v-model="inputValue"
        v-bind="attrs"
        type="tel"
        maxlength="13"
        :mask="phoneMask"
        :error="error"
        :placeholder="placeholder"
    >
        <template #addon-left>
            <button
                :class="[styles.select, {
                    [styles.opened]: isPopupOpen
                }]"
                @click="openPopup"
            >
                <VFlagIcon
                    :code="country.code"
                    :class="styles.selectFlag"
                />

                <div :class="styles.selectText">
                    {{ country.dialCode }}
                </div>

                <div :class="styles.selectArrow">
                    <VIcon name="arrow-down-xs" />
                </div>
            </button>
        </template>
    </VInput>

    <AppPopup v-model="isPopupOpen">
        <AppPopupHead>
            {{ t('selectCountry') }}
        </AppPopupHead>

        <AppPopupSearch
            v-model="search"
            :placeholder="t('enterCountryName')"
        />

        <AppPopupBody :class="styles.popupBody">
            <ul
                v-if="filteredResults.length"
                :class="styles.list"
            >
                <li
                    v-for="({ code, text, dialCode }) in filteredResults"
                    :key="code"
                    :class="styles.country"
                    @click="selectCountry(code, dialCode)"
                >
                    <VFlagIcon
                        :code="code"
                        :class="styles.countryFlag"
                    />

                    <div :class="styles.countryText">
                        {{ text }}
                    </div>

                    <div :class="styles.countryPhone">
                        {{ dialCode }}
                    </div>
                </li>
            </ul>

            <EmptyPlaceholder
                v-else
                :class="styles.placeholder"
            />
        </AppPopupBody>
    </AppPopup>
</template>

<style lang="scss" module="styles">
@import './PhoneInput.module.scss';
</style>