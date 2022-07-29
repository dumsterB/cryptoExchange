<script setup>
import { computed, useCssModule, useSlots } from 'vue';

const props = defineProps({
    view: {
        type: String,
        default: 'primary',
        validator: view => ['primary'].includes(view)
    }
});

const slots = useSlots();
const styles = useCssModule('styles');

const alertClasses = computed(
    () => [styles.alert, styles[props.view]]
);
</script>

<template>
    <div :class="alertClasses">

        <div
            v-if="slots.icon?.()"
            :class="styles.icon"
        >
            <slot name="icon" />
        </div>

        <div :class="styles.content">
            <slot />
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './AlerNotification.module.scss';
</style>