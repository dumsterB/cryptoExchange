<script setup>
import { computed, useAttrs } from 'vue';
import VInput from '@/components/common/input/VInput.vue';
import AppPopup from '@/components/popup/AppPopup.vue';
import AppPopupBody from '@/components/popup/build/body/AppPopupBody.vue';
import AppPopupHead from '@/components/popup/build/head/AppPopupHead.vue';
import EmptyPlaceholder from '@/components/general/empty/EmptyPlaceholder.vue';
import AppPopupSearch from '@/components/popup/build/search/AppPopupSearch.vue';
import FlagIcon from '@/components/general/flag/FlagIcon';
import VIcon from '@/components/common/icon/VIcon.vue';
import { useI18n } from 'vue-i18n';
import { usePopup } from '@/hooks/helpers/usePopup';
import { useCountries } from '@/hooks/country/useCountries';
import { useSearch } from '@/hooks/search/useSearch';
import { numberMask } from '@/utils/mask/number';

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
} = usePopup();

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
        :mask="numberMask"
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
                <FlagIcon
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
                    <FlagIcon
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