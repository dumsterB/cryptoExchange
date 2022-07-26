<script setup>
import { useI18n } from 'vue-i18n';
import CurrencyIcon from '../../icon/CurrencyIcon.vue';

defineProps({
    code: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    active: Boolean
});

const emit = defineEmits({
    click: code => typeof code === 'string'
});

const { t } = useI18n();
</script>

<template>
    <button
        :class="styles.currency"
        @click="emit('click', code)"
    >

        <CurrencyIcon :image="image" />

        <div :class="styles.symbol">
            {{ symbol }}
        </div>

        <div :class="styles.name">
            {{ t(`currency.${ name }`) }}
        </div>

    </button>
</template>

<style lang="scss" module="styles">
@import './CurrencySwitcherItem.module.scss';
</style>