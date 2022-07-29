<script>
export default {
    name: 'DefaultLayout'
};
</script>

<script setup>
import AppContainer from '@/components/AppContainer.vue';
import TheHeader from '@/components/general/header/TheHeader.vue';
import TheSidebar from '@/components/general/sidebar/TheSidebar.vue';
import VerificationAlert from '@/components/user/verification/alert/VerificationAlert.vue';
import { useUserStore } from '@/stores/user';
import ErrorBoundary from '@/components/error/ErrorBoundary.vue';

const userStore = useUserStore();
</script>

<template>
    <div :class="styles.wrapper">
        <div :class="styles.container">
            
            <TheHeader />
            
            <TheSidebar />
            
            <ErrorBoundary>
                <AppContainer>
                    <VerificationAlert v-if="!userStore.user.isVerified" />
                
                    <slot />
                </AppContainer>
            </ErrorBoundary>
            
        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './DefaultLayout.module.scss';
</style>