<script setup>
import { VIcon, VIconButton } from '@/uikit';
import { useI18n } from 'vue-i18n';
import { setLanguage } from '@/app/localization';
import { languagesList } from '@/config/localization/languages.js';

const emit = defineEmits({
    back: null
});

const { t } = useI18n();

const goBack = () => {
    emit('back');
};

const changeLanguage = code => {
    setLanguage(code);
    goBack();
};
</script>

<template>
    <div :class="styles.head">
        <VIconButton
            :class="styles.headButton"
            @click="goBack"
        >
            <VIcon name="arrow-back" />
        </VIconButton>
        
        <div :class="styles.headTitle">
            {{ t('language') }}
        </div>
    </div>

    <div :class="styles.list">
        <div
            v-for="({ code, name, image }) in languagesList"
            :key="code"
            :class="styles.lang"
            @click="changeLanguage(code)"
        >

            <div :class="styles.icon">
                <img
                    :src="image"
                    :alt="name"
                />
            </div>

            <div :class="styles.text">
                {{ name }}
            </div>

        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './LanguageSettings.module.scss';
</style>