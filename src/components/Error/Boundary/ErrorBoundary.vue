<script setup>
import { onErrorCaptured, ref } from 'vue';
import { VButton } from '@/uikit';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const error = ref(false);

onErrorCaptured(err => {
    console.error(err);
    error.value = err;

    return false;
});

const reloadPage = () => window.location.reload();
</script>

<template>
    <div
        v-if="error"
        :class="styles.container"
    >

        <div :class="styles.wrap">
            <div :class="styles.image" />

            <div :class="styles.title">
                {{ t('errors.somethingFailed') }}
            </div>

            <div :class="styles.description">
                {{ t('somethingFailedInstruction') }}
            </div>

            <VButton
                size="m"
                view="filled"
                @click="reloadPage"
            >
                {{ t('button.reload') }}
            </VButton>
        </div>
    </div>
    <slot v-else />
</template>

<style lang="scss" module="styles">
@import './ErrorBoundary.module.scss';
</style>