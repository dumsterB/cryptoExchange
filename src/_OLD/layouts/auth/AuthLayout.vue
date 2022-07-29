<script>
import ErrorBoundary from '@/components/error/ErrorBoundary.vue';
export default {
    name: "AuthLayout",
    components: { ErrorBoundary }
};
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