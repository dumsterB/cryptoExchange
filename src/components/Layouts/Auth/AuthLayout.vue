<script>
export default {
    name: 'AuthLayout'
};
</script>

<script setup>
import { ErrorBoundary } from '@/components/Error';
</script>

<template>
    <div :class="styles.wrapper">
        <ErrorBoundary>
            <slot />
        </ErrorBoundary>
    </div>
</template>

<style lang="scss" module="styles">
@import './AuthLayout.module.scss';
</style>