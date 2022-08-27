<script setup>
import { VBox, VToggleButton, VToggleButtonGroup } from '@/uikit';
import { useBalance } from "@/states/withdraw/store";
import { RouterView } from 'vue-router';
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
                    <VToggleButton to="/withdrawal/fiat">
                        {{ t('toCard') }}
                    </VToggleButton>

                    <VToggleButton to="/withdrawal/token">
                        {{ t('toWallet') }}
                    </VToggleButton>
                </VToggleButtonGroup>

                <RouterView />
            </div>
        </VBox>
    </div>
</template>

<style lang="scss" module="styles">
@import './WithdrawalView.module.scss';
</style>