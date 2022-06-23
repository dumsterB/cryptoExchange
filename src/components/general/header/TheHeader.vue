<script setup>
import { ref, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';

import AppContainer from '@/components/AppContainer.vue';
import AppPopup from '@/components/popup/AppPopup.vue';
import BalanceButton from '@/components/general/button/BalanceButton';
import CurrencySwitcher from '@/components/fiat/switcher/CurrencySwitcher.vue';
import GlobalSettings from '@/components/popup/views/settings/GlobalSettings.vue';
import MenuButton from '@/components/general/button/MenuButton';
import MobileMenu from '@/components/general/menu/MobileMenu.vue';
import SettingsButton from '@/components/general/button/SettingsButton';
import VButton from '@/components/common/button/VButton.vue';
import VIcon from '@/components/common/icon/VIcon.vue';

import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

const attrs = useAttrs();
const route = useRoute();
const userStore = useUserStore();
const { t } = useI18n();

const firstName = userStore.name.split(' ')[0] ?? userStore.name;

const settingsButton = ref(null);

const isMobileMenuVisible = ref(false);
const isSettingsMenuVisible = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuVisible.value = !isMobileMenuVisible.value;
};

const toggleSettingsMenu = () => {
    isSettingsMenuVisible.value = !isSettingsMenuVisible.value;
};
</script>

<template>
    <div
        :class="styles.header"
        v-bind="attrs"
    >
        <AppContainer>
            <div :class="styles.wrap">
                <div :class="styles.title">
                    {{ route.meta.title ?? t('hello', { name: firstName }) }}
                </div>

                <div :class="styles.side">
                    <div :class="[styles.button, styles.buttonBuy]">
                        <!-- TODO: real url -->
                        <VButton
                            size="small"
                            to="/"
                        >
                            <template #icon>
                                <VIcon name="usdt" />
                            </template>

                            {{ t('buyItem', { item: 'USDT' }) }}
                        </VButton>
                    </div>

                    <CurrencySwitcher :class="styles.button" />

                    <BalanceButton :class="styles.button" />

                    <div
                        ref="settingsButton"
                        :class="styles.button"
                    >
                        <SettingsButton @click="toggleSettingsMenu" />
                    </div>

                    <div :class="styles.menuButton">
                        <MenuButton @click="toggleMobileMenu" />
                    </div>
                </div>
            </div>
        </AppContainer>
    </div>

    <MobileMenu
        v-model:visible="isMobileMenuVisible"
        @toggle-settings="toggleSettingsMenu"
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
