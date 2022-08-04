<script setup>
import { computed } from 'vue';
// import { formatTsToBeautifulDate } from '@/utils/format/date';

const props = defineProps({
    dayTs: {
        type: Number,
        required: true
    }
});

const date = computed(() => {
    return props.dayTs;
    // return formatTsToBeautifulDate(props.dayTs);
});
</script>

<template>
    <div :class="styles.group">

        <div :class="styles.title">
            {{ date }}
        </div>

        <slot />

    </div>
</template>

<style lang="scss" module="styles">
@import './TransactionGroup.module.scss';
</style>