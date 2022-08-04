<script setup>
import { VInput } from '@/uikit';
import CountryAutocomplete from './Country/CountryAutocomplete.vue';
import { useI18n } from 'vue-i18n';
import { usePersonalInfoForm } from './hooks';

defineProps({
    loading: Boolean
});

const emit = defineEmits({
    'update:loading': null,
    'completed': null
});

const { t } = useI18n();

const handleComplete = () => emit('completed');
const handleLoading = isLoading => emit('update:loading', isLoading);

const {
    savePersonalInfo,
    name,
    nameError,
    surname,
    surnameError,
    country,
    countryError,
    setCountryError,
    resetCountryError,
} = usePersonalInfoForm(handleComplete, handleLoading);

defineExpose({ save: savePersonalInfo });
</script>

<template>
    <VInput
        v-model="name"
        :label="t('name')"
        :error="nameError"
        :class="styles.input"
    />

    <VInput
        v-model="surname"
        :label="t('surname')"
        :error="surnameError"
        :class="styles.input"
    />

    <CountryAutocomplete
        v-model="country"
        :class="styles.input"
        :error="countryError"
        @keydown="resetCountryError"
        @nothing-selected="setCountryError"
    />
</template>

<style lang="scss" module="styles">
@import './PersonForm.module.scss';
</style>