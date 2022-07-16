<script setup>
import VIcon from '@/components/common/icon/VIcon.vue';

defineProps({
    active: Boolean,
    completed: Boolean
});
</script>

<template>
    <div
        :class="[
            styles.step,
            {
                [styles.active]: active,
                [styles.completed]: completed
            }
        ]"
    >
        <div :class="styles.checkbox">
            <div :class="styles.checkboxTick">
                <VIcon name="check" />
            </div>
        </div>

        <div :class="styles.text">

            <slot />

        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './AuthStep.module.scss';
</style>