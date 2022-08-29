<script setup>
import { VBox, VToggleButton, VToggleButtonGroup } from '@/uikit';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div :class="styles.wrap">
        <VBox>
            <div :class="styles.content">
                <VToggleButtonGroup
                    cols="2"
                    :class="styles.toggleButtons"
                >
                    <VToggleButton to="/deposit/fiat">
                        {{ t('depositByCard') }}
                    </VToggleButton>

                    <VToggleButton to="/deposit/token">
                        {{ t('depositByCrypto') }}
                    </VToggleButton>
                </VToggleButtonGroup>

                <RouterView />
            </div>
        </VBox>
    </div>
</template>

<style lang="scss" module="styles">
@import 'DepositView.module';
</style>