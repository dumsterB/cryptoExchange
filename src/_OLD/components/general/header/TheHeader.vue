<script setup>
import { computed, ref, useAttrs, useCssModule, useSlots } from 'vue';
import { useI18n } from 'vue-i18n';

import AppContainer from '@/components/AppContainer.vue';
import AppPopup from '@/components/popup/AppPopup.vue';
import BalanceButton from '@/components/general/button/BalanceButton';
import CurrencySwitcher from '@/2v/entities/currency/components/switcher/CurrencySwitcher.vue';
import GlobalSettings from '@/components/popup/views/settings/GlobalSettings.vue';
import MenuButton from '@/components/general/button/MenuButton';
import MobileMenu from '@/components/general/menu/MobileMenu.vue';
import SettingsButton from '@/components/general/button/SettingsButton';
import VButton from '@/2v/shared/components/common/button/VButton.vue';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';

import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

const attrs = useAttrs();
const route = useRoute();
const { t } = useI18n();

const userStore = useUserStore();

const settingsButton = ref(null);
const isMobileMenuVisible = ref(false);
const isSettingsMenuVisible = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuVisible.value = !isMobileMenuVisible.value;
};

const toggleSettingsMenu = () => {
    isSettingsMenuVisible.value = !isSettingsMenuVisible.value;
};

const slots = useSlots();
const styles = useCssModule('styles');

const hasMobileAddon = computed(() => slots.mobileAddon?.());

const headerClasses = computed(() => [styles.header, {
    [styles.withAddon]: hasMobileAddon.value
}]);
</script>

<template>
    <div
        :class="headerClasses"
        v-bind="attrs"
    >
        <AppContainer>
            <div :class="styles.wrap">
                <div
                    v-if="hasMobileAddon"
                    :class="styles.mobileAddon"
                >
                    <slot name="mobileAddon" />
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
