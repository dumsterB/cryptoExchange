<script setup>
import { computed, useCssModule } from 'vue';

const props = defineProps({
    change: {
        type: Number,
        default: 0
    },
    changeFormatFn: {
        type: [Function, null],
        default: null
    }
});

const styles = useCssModule('styles');

const changeClasses = computed(() => {
    return [styles.change, {
        [styles.green]: props.change > 0,
        [styles.red]: props.change < 0
    }];
});

const changeValue = computed(() => {
    const change = props.changeFormatFn
        ? props.changeFormatFn(props.change)
        : props.change;

    return props.change > 0
        ? `+${ change }`
        : `${ change }`;
});
</script>

<template>
    <div :class="styles.count">

        <div :class="styles.label">
            <slot name="label" />
        </div>

        <div :class="styles.value">
            <slot name="value" />
        </div>

        <div
            v-if="change"
            :class="changeClasses"
        >
            {{ changeValue }}
        </div>


    </div>
</template>

<style lang="scss" module="styles">
@import './CountItem.module.scss';
</style>