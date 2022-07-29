<script>
export default {
    name: 'AssetLayout'
};
</script>

<script setup>
import AppContainer from '@/components/AppContainer.vue';
import TheHeader from '@/components/general/header/TheHeader.vue';
import TheSidebar from '@/components/general/sidebar/TheSidebar.vue';
import VerificationAlert from '@/components/user/verification/alert/VerificationAlert.vue';
import { useUserStore } from '@/stores/user';
import ErrorBoundary from '@/components/error/ErrorBoundary.vue';
import IconButton from '@/components/general/IconButton.vue';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';
import { useChartPopup } from '@/components/asset/chart/hooks/useChartPopup';

const userStore = useUserStore();
const showChartButton = window.innerWidth < 1200;

const { openChartPopup } = useChartPopup();
</script>

<template>
    <div :class="styles.wrapper">
        <div :class="styles.container">
            
            <TheHeader v-if="showChartButton">
                <template #mobileAddon>
                    <IconButton
                        :class="styles.chartButton"
                        @click="openChartPopup"
                    >
                        <VIcon name="graph" />
                    </IconButton>
                </template>
            </TheHeader>
            <TheHeader v-else />
            
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
@import './AssetLayout.module.scss';
</style>