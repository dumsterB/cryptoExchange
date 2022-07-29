<script setup>
import { computed, useCssModule } from 'vue';
import { formatPercent } from '@/3v/utils/percent';

const styles = useCssModule('styles');

const props = defineProps({
    value: {
        type: [String, Number],
        required: true
    }
});

const percent = computed(() => {
    return formatPercent(props.value);
});

const classes = computed(() => {
    return [styles.percent, {
        [styles.green]: props.value >= 0,
        [styles.red]: props.value < 0
    }];
});
</script>

<template>
    <div :class="classes">

        <div :class="styles.text">
            {{ percent }}
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './PercentChange.module.scss';
</style>