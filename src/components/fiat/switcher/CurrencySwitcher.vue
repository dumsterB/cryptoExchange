<script setup>
import { computed, onBeforeUnmount, ref, useAttrs, useCssModule, watchEffect } from 'vue'

import AppPopup from '@/components/popup/AppPopup.vue'
import CurrencyIcon from '@/components/fiat/icon/CurrencyIcon.vue'
import CurrencySwitcherItem from './item/CurrencySwitcherItem.vue'
import VIcon from '@/components/common/icon/VIcon.vue'

import { useMainStore } from '@/stores/main'
import { useClickOutside } from '@/composables/useClickOutside'
import { ALL_CURRENCIES } from '@/utils/currency'

const props = defineProps({
    popupOpen: Boolean
});

const styles = useCssModule('styles');
const attrs = useAttrs();
const mainStore = useMainStore();

const wrap = ref(null);
const isPopupOpen = ref(false);
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    if (props.popupOpen) {
        isPopupOpen.value = !isPopupOpen.value;
    } else {
        isDropdownOpen.value = !isDropdownOpen.value;
    }
}

const { initClickOutside, destroyClickOutside } = useClickOutside(
    wrap,
    toggleDropdown,
    { triggerOnMount: false }
);

watchEffect(
    () => isDropdownOpen.value
        ? initClickOutside()
        : destroyClickOutside()
);

onBeforeUnmount(destroyClickOutside);

const activeCurrency = computed(() => {
    return ALL_CURRENCIES.find(({ id }) => id === mainStore.currency);
});

const changeCurrency = id => {
    mainStore.changeCurrency(id);

    toggleDropdown();
};

const buttonClass = computed(() => {
    return [styles.button, {
        [styles.active]: isDropdownOpen.value
    }];
});
</script>

<template>
    <div
        ref="wrap"
        :class="styles.wrap"
    >

        <button
            :class="buttonClass"
            v-bind="attrs"
            @click="toggleDropdown"
        >
            <CurrencyIcon :image="activeCurrency.image" />

            <span :class="styles.buttonText">
                {{ activeCurrency.symbol }}
            </span>

            <span
                v-if="!popupOpen"
                :class="styles.buttonArrow"
            >
                <VIcon name="arrow-down-xs" />
            </span>
        </button>

        <Transition name="currency-switcher">
            <div
                v-if="isDropdownOpen"
                :class="styles.dropdownWrap"
            >
                <div :class="styles.dropdown">

                    <CurrencySwitcherItem
                        v-for="({ id, name, symbol, image }) in ALL_CURRENCIES"
                        :id="id"
                        :key="id"
                        :name="name"
                        :symbol="symbol"
                        :image="image"
                        @click="changeCurrency"
                    />

                </div>
            </div>
        </Transition>

        <AppPopup
            v-if="popupOpen"
            v-model="isPopupOpen"
        >
            <CurrencySwitcherItem
                v-for="({ id, name, symbol, image }) in ALL_CURRENCIES"
                :id="id"
                :key="id"
                :name="name"
                :symbol="symbol"
                :image="image"
                @click="changeCurrency"
            />
        </AppPopup>

    </div>
</template>

<style lang="scss" module="styles">
@import './CurrencySwitcher.module.scss';
</style>

<style lang="scss">
.currency-switcher-enter {
    &-from {
        opacity: 0;
        transform: translate(0, -15px);
    }

    &-to {
        opacity: 1;
        transform: translate(0, 0);
    }

    &-active {
        transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
    }
}
</style>