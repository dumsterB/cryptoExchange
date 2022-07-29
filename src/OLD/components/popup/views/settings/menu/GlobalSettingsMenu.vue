<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';
import { getActiveLanguage } from '@/services/language';

const { t, locale } = useI18n();

const emit = defineEmits({
    changeLang: null
});

const language = computed(() => {
    return getActiveLanguage(locale.value);
});
</script>

<template>
    <div :class="styles.wrap">

        <div
            :class="styles.button"
            @click="emit('changeLang')"
        >
            <div :class="styles.buttonTop">
                <div :class="styles.buttonIcon">
                    <img
                        :src="language.image"
                        :alt="language.name"
                    />
                </div>

                <div :class="styles.buttonArrow">
                    <VIcon name="settings-menu-arrow" />
                </div>
            </div>

            <div :class="styles.buttonText">
                {{ language.name }}
            </div>
        </div>

        <!-- TODO: real button -->
        <div
            :class="styles.button"
            @click="null"
        >

            <div :class="styles.buttonTop">
                <div :class="styles.buttonIcon">
                    <VIcon name="lock" />
                </div>

                <div :class="styles.buttonArrow">
                    <VIcon name="settings-menu-arrow" />
                </div>
            </div>

            <div :class="styles.buttonText">
                {{ t('security') }}
            </div>
        </div>

        <!-- TODO: real button -->
        <div
            :class="styles.button"
            @click="null"
        >
            <div :class="styles.buttonTop">
                <div :class="styles.buttonIcon">
                    <VIcon name="question" />
                </div>

                <div :class="styles.buttonArrow">
                    <VIcon name="settings-menu-arrow" />
                </div>
            </div>

            <div :class="styles.buttonText">
                {{ t('support') }}
            </div>
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './GlobalSettingsMenu.module.scss';
</style>