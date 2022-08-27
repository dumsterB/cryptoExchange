<script>
export default {
    inheritAttrs: false
};
</script>

<script setup>
import { computed, ref, useAttrs } from 'vue';
import { VTooltip } from '@/uikit';
import { useI18n } from 'vue-i18n';
import { useClipboard } from '../../hooks/useClipboard';

defineProps({
    value: {
        type: [String, Number],
        default: ''
    }
});

const attrs = useAttrs();
const { t } = useI18n();
const { isCopied, isCopySupported, copyToClipboard } = useClipboard();

const isTooltipVisible = ref(false);
const tooltipContent = computed(() => isCopied.value
    ? t('copied')
    : t('copy')
);

const showTooltip = () => isTooltipVisible.value = true;
const hideTooltip = () => isTooltipVisible.value = false;
</script>

<template>
    <VTooltip
        :show="isTooltipVisible"
        placement="top"
        arrow
    >
        <button
            :class="styles.button"
            v-bind="attrs"
            @mouseenter="showTooltip"
            @mouseleave="hideTooltip"
            @touchstart="showTooltip"
            @touchend="hideTooltip"
            @click="copyToClipboard(value)"
        >
            <slot
                :is-copied="isCopied"
                :is-copy-supported="isCopySupported"
            />
        </button>

        <template #content>
            {{ tooltipContent }}
        </template>
    </VTooltip>
</template>

<style lang="scss" module="styles">
@import './CopyButton.module.scss';
</style>