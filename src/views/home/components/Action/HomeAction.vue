<script setup>
import { VIcon } from '@/uikit';

defineProps({
    to: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});
</script>

<template>
    <RouterLink
        :to="to"
        :class="styles.item"
    >
        <div :class="styles.wrap">
            
            <div :class="styles.icon">
                <VIcon :name="icon" />
            </div>

            <div :class="styles.text">
                <slot />
            </div>

        </div>
    </RouterLink>
</template>

<style lang="scss" module="styles">
@import './HomeAction.module.scss';
</style>