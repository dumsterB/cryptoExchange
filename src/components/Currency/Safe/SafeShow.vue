<script setup>
import { h, nextTick, ref, useSlots, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useBalanceStore } from '@/states/balance/store';
import { createBlurSvg } from './utils';

// TODO: render function component
const slots = useSlots();
const balanceStore = useBalanceStore();

const div = ref(null);
const blurHeight = ref(0);

const { hideBalances } = storeToRefs(balanceStore);

watch(hideBalances, async (hidden) => {
    if (!hidden)
        return;
    
    if (!div.value)
        await nextTick();

    const { fontSize } = getComputedStyle(div.value.parentNode);

    blurHeight.value = parseInt(fontSize);
}, {
    immediate: true
});

const render = () => !hideBalances.value
    ? slots.default()
    : h(
        'div', {
            ref: div,
            style: {
                height: `${ blurHeight.value }px`,
                fontSize: `${ blurHeight.value }px`
            }
        },
        [
            createBlurSvg(blurHeight.value)
        ]
    );
</script>

<template>
    <render />
</template>