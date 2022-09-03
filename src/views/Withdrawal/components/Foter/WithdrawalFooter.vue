<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
defineProps({
    // eslint-disable-next-line vue/require-default-prop
    sum: {
        type: Object,
    },
});



</script>
<template>
    <div :class="styles.action">
        <div :class="styles.actionLabel">
            {{ t('getSum') }}
        </div>

        <div :class="styles.actionValue">
            {{ sum.netSum }}
        </div>

        <slot name="submit"></slot>
    </div>
</template>

<style lang="scss" module="styles">
@import './WithdrawalFooter.scss';
</style>