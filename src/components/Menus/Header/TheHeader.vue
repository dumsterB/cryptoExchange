<script setup>
import { computed, defineAsyncComponent, ref, useAttrs, useCssModule } from 'vue';
import { VButton, VIcon, VContainer, VIconButton } from '@/uikit'; 
import { AppPopup } from '@/components/Popup';
import { CurrencySwitcher } from '@/components/Currency';
import MobileMenu from '../Mobile/MobileMenu.vue';
import GlobalSettings from '../Settings/GlobalSettings.vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { usePopup } from '@/hooks/usePopup';
import { useUserStore } from '@/states/user/store';
import { useBalanceStore } from '@/states/balance/store';

const { t } = useI18n();
const attrs = useAttrs();
// const slots = useSlots();
const route = useRoute();
const styles = useCssModule('styles');

const userStore = useUserStore();

// const headerClasses = computed(() => [
//     styles.header,
//     { [styles.mobileAddon]: hasMobileAddon.value }
// ]);

// const hasMobileAddon = computed(() => !!slots.mobileAddon?.());

let addonComponent = null;

if (route.meta.headerMobileAddon) {
    addonComponent = defineAsyncComponent(
        () => import(route.meta.headerMobileAddon)
    );   
}

const headerClasses = computed(() => [
    styles.header,
    { [styles.mobileAddon]: addonComponent }
]);

// mobile menu
const isMobileMenuOpened = ref(false);
const openMobileMenu = () => isMobileMenuOpened.value = true;

// settings menu
const {
    togglePopup: toggleSettingMenu,
    isPopupOpen: isSettingsMenuVisible
} = usePopup();

const settingsButton = ref(null);

// balance show
const balanceStore = useBalanceStore();
const balanceButtonIcon = computed(() => balanceStore.hideBalances ? 'eye' : 'eye-off');

const handleBalanceButtonClick = () => {
    balanceStore.hideBalances = !balanceStore.hideBalances;
};
</script>

<template>
    <div
        :class="headerClasses"
        v-bind="attrs"
    >
        <VContainer>
            <div :class="styles.wrap">
                <div
                    v-if="addonComponent"
                    :class="styles.mobileAddon"
                >
                    <Component :is="addonComponent" />
                </div>
                
                <div
                    v-else
                    :class="styles.title"
                >
                    {{ route.meta.title ?? t('hello', { name: userStore.user.name }) }}
                </div>

                <div :class="styles.side">
                    <div :class="[styles.button, styles.buttonBuy]">
                        <!-- TODO: real url -->
                        <VButton
                            size="xs"
                            to="/"
                        >
                            <template #icon>
                                <VIcon name="usdt" />
                            </template>

                            {{ t('buyItem', { item: 'USDT' }) }}
                        </VButton>
                    </div>

                    <CurrencySwitcher :class="styles.button" />

                    <VIconButton
                        :class="styles.button"
                        @click="handleBalanceButtonClick"
                    >
                        <VIcon :name="balanceButtonIcon" />
                    </VIconButton>

                    <div
                        ref="settingsButton"
                        :class="styles.button"
                    >
                        <VIconButton @click="toggleSettingMenu">
                            <VIcon name="settings" />
                        </VIconButton>
                    </div>

                    <div :class="styles.menuButton">
                        <VIconButton @click="openMobileMenu">
                            <VIcon name="burger" />
                        </VIconButton>
                    </div>
                </div>
            </div>
        </VContainer>
    </div>

    <MobileMenu
        v-model:visible="isMobileMenuOpened"
        @open-settings="toggleSettingMenu"
    />

    <AppPopup
        v-model="isSettingsMenuVisible"
        view="pane"
        :pane-activator="settingsButton"
    >
        <GlobalSettings />
    </AppPopup>
</template>

<style lang="scss" module="styles">
@import './TheHeader.module.scss';
</style>
