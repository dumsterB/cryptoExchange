<script setup>
import IconButton from '@/components/general/IconButton.vue';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';
import { useI18n } from 'vue-i18n';
import { AVAILABLE_LOCALES, updateLanguage } from '@/services/language';

const { t, locale } = useI18n();

const emit = defineEmits({
    goBack: null
});

const goBack = () => emit('goBack');

const changeLanguage = lang => {
    updateLanguage(locale, lang);

    goBack();
};
</script>

<template>
    <div :class="styles.head">
        <IconButton
            :class="styles.headButton"
            @click="goBack"
        >
            <VIcon name="arrow-back" />
        </IconButton>
        
        <div :class="styles.headTitle">
            {{ t('language') }}
        </div>
    </div>

    <div :class="styles.list">
        <div
            v-for="({ id, name, image }) in AVAILABLE_LOCALES"
            :key="id"
            :class="styles.lang"
            @click="changeLanguage(id)"
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
@import './GlobalSettingsLang.module.scss';
</style>