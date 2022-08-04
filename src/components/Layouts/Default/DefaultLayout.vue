<script>
export default {
    name: 'DefaultLayout'
};
</script>

<script setup>
import { VContainer } from '@/uikit';
import { TheHeader, TheSidebar } from '@/components/Menus';
import { VerificationAlert } from '@/components/User';
import { ErrorBoundary } from '@/components/Error';
</script>

<template>
    <div :class="styles.wrapper">
        <div :class="styles.container">
            
            <TheHeader />
            
            <TheSidebar />

            <ErrorBoundary>
                <VContainer>
                    <VerificationAlert />

                    <slot />
                </VContainer>
            </ErrorBoundary>
            
        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './DefaultLayout.module.scss';
</style>