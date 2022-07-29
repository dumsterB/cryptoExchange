<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import GlobalSettingsMenu from './menu/GlobalSettingsMenu.vue'
import GlobalSettingsLang from './lang/GlobalSettingsLang.vue'
import AppPopupHead from '@/components/popup/build/head/AppPopupHead.vue'

const { t } = useI18n();

const MENU_TAB = 'menu';
const LANG_TAB = 'lang';

const TABS = [
    MENU_TAB,
    LANG_TAB
];

const activeTab = ref(TABS[0]);

const changeTab = tab => {
    if (TABS.includes(tab)) {
        activeTab.value = tab;
    } else {
        console.warn('unknown tab', tab);
    }
}
</script>

<template>
    <div :class="styles.settings">
    
        <div v-if="activeTab === MENU_TAB">
            <AppPopupHead :class="styles.head">
                {{ t('settings') }}
            </AppPopupHead>

            <GlobalSettingsMenu @change-lang="changeTab(LANG_TAB)" />
        </div>

        <GlobalSettingsLang
            v-else-if="activeTab === LANG_TAB"
            @go-back="changeTab(MENU_TAB)"
        />

    </div>
</template>

<style lang="scss" module="styles">
@import './GlobalSettings.module.scss';
</style>