<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
defineProps({
    // eslint-disable-next-line vue/require-default-prop
    data: {
        type: Object,
    },
});
const emit = defineEmits({
    'submit': null
});
const submit = () =>{
    emit('submit');
};

</script>
<template>
    <div :class="styles.action">
        <div :class="styles.actionLabel">
            <!-- TODO: translate -->
            {{ t('getSum') }}
        </div>

        <div :class="styles.actionValue">
            {{ data.netSum }}
        </div>

        <slot name="submit"></slot>
    </div>
</template>

<style lang="scss" module="styles">
@import './WithdrawalFooter.scss';
</style>