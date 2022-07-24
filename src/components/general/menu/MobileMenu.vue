<script setup>
import { nextTick, onUnmounted, ref, watch, watchEffect } from 'vue';

import CurrencySwitcher from '@/components/fiat/switcher/CurrencySwitcher.vue';
import IconButton from '@/components/general/IconButton.vue';
import MenuLink from '@/components/general/MenuLink.vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import VImage from '@/components/common/image/VImage.vue';
import UserPreview from '@/components/user/preview/UserPreview.vue';
import SettingsButton from '@/components/general/button/SettingsButton';
import VerificationStatus from '@/components/user/verification/status/VerificationStatus.vue';

import { useScrollLock } from '@/hooks/helpers/useScrollLock';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { hide as hidePromo, visible as isPromoVisible } from '@/services/cryptoCardPromo';

const props = defineProps({
    visible: Boolean
});

const emit = defineEmits({
    'update:visible': null,
    'toggle-settings': null
});

const route = useRoute();
const { t } = useI18n();

const menu = ref(null);

const close = () => emit('update:visible', false);
const toggleSettings = () => emit('toggle-settings');

const { disableBodyScroll, enableBodyScroll } = useScrollLock();

watch(route, () => close());

watchEffect(() => {
    if (props.visible) {
        nextTick(() => disableBodyScroll(menu));
    } else {
        enableBodyScroll(menu);
    }
});

onUnmounted(() => enableBodyScroll(menu));
</script>

<template>
    <Teleport to="body">
        <Transition
            name="menu-appear"
            duration="150"
        >
            <div
                v-if="visible"
                ref="menu"
                :class="styles.menu"
            >

                <div
                    :class="styles.overlay"
                    @click="close"
                />

                <div :class="styles.box">
                    <div :class="styles.content">
                        <div>
                            <div :class="styles.head">
                                <RouterLink
                                    to="/"
                                    :class="styles.logo"
                                >
                                    <VIcon name="logo" />
                                </RouterLink>

                                <IconButton @click="close">
                                    <VIcon name="close" />
                                </IconButton>
                            </div>

                            <UserPreview :class="styles.user">
                                <template #detail>
                                    <VerificationStatus />
                                </template>
                                
                                <template #button="{ dotsClass }">
                                    <div :class="dotsClass">
                                        <VIcon name="dots" />
                                    </div>
                                </template>
                            </UserPreview>

                            <div :class="styles.links">
                                <MenuLink
                                    to="/"
                                    icon="house"
                                >
                                    {{ t('house') }}
                                </MenuLink>

                                <MenuLink
                                    to="/swap"
                                    icon="swap"
                                >
                                    {{ t('swap') }}
                                </MenuLink>

                                <MenuLink
                                    to="/deposit"
                                    icon="deposit"
                                >
                                    {{ t('deposit') }}
                                </MenuLink>

                                <MenuLink
                                    to="/withdrawal"
                                    icon="withdrawal"
                                >
                                    {{ t('withdrawal') }}
                                </MenuLink>

                                <!-- TODO: real url -->
                                <MenuLink
                                    to="/buy-usdt"
                                    icon="usdt"
                                >
                                    {{ t('buyItem', { item: 'usdt' }) }}
                                </MenuLink>
                            </div>
                        </div>

                        <!-- TODO: real url -->
                        <div>
                            <RouterLink
                                v-if="isPromoVisible"
                                to="/"
                                :class="styles.promo"
                            >
                                <div
                                    :class="styles.promoClose"
                                    @click="hidePromo"
                                >
                                    <VIcon name="close-xs" />
                                </div>

                                <div :class="styles.promoTitle">
                                    {{ t('cryptoCardPromo.title') }}
                                </div>

                                <div :class="styles.promoText">
                                    {{ t('cryptoCardPromo.textMobile') }}
                                </div>

                                <VImage
                                    src="/images/cryptocard-menu.png"
                                    :class="styles.promoImage"
                                />
                            </RouterLink>

                            <div :class="styles.bottom">
                                <CurrencySwitcher popup-open />

                                <SettingsButton @click="toggleSettings" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss" module="styles">
@import './MobileMenu.module.scss';
</style>
