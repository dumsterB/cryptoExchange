<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div :class="styles.placeholder">

        <img
            src="/images/not-found.png"
            alt=""
            :class="styles.image"
        />

        <div :class="styles.text">
            {{ t('noResults') }}
        </div>
        
    </div>
</template>

<style lang="scss" module="styles">
@import './EmptyPlaceholder.module.scss';
</style>