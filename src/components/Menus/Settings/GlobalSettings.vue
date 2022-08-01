<script setup>
import { computed, ref } from 'vue';
import { VIcon } from '@/uikit';
import { AppPopupHead } from '@/components/Popup';
import SectionButton from './Section/SectionButton';
import LanguageSettings from './Language/LanguageSettings.vue';
import { useI18n } from 'vue-i18n';
import { languages } from '@/config/localization/languages';

const { t, locale } = useI18n();

const tabs = {
    menu: 'menu',
    language: 'language'
};

const activeTab = ref(tabs.menu);
const changeTab = tab => activeTab.value = tab;

const isMenuVisible = computed(() => activeTab.value === tabs.menu);
const isLanguagesVisible = computed(() => activeTab.value === tabs.language);

const activeLanguage = computed(() => languages[locale.value]);
</script>

<template>
    <div :class="styles.settings">
    
        <div v-if="isMenuVisible">
            <AppPopupHead :class="styles.head">
                {{ t('settings') }}
            </AppPopupHead>

            <div :class="styles.list">
                <SectionButton @click="changeTab(tabs.language)">
                    <template #icon>
                        <img
                            :src="activeLanguage.image"
                            :alt="activeLanguage.name"
                        />
                    </template>
                    <template #text>
                        {{ activeLanguage.name }}
                    </template>
                </SectionButton>

                <!-- TODO: click -->
                <SectionButton @click="null">
                    <template #icon>
                        <VIcon name="lock" />
                    </template>
                    <template #text>
                        {{ t('security') }}
                    </template>
                </SectionButton>

                <!-- TODO: click -->
                <SectionButton @click="null">
                    <template #icon>
                        <VIcon name="question" />
                    </template>
                    <template #text>
                        {{ t('support') }}
                    </template>
                </SectionButton>
            </div>
        </div>

        <LanguageSettings
            v-else-if="isLanguagesVisible"
            @back="changeTab(tabs.menu)"
        />

    </div>
</template>

<style lang="scss" module="styles">
@import './GlobalSettings.module.scss';
</style>