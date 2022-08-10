<script setup>
import { computed } from 'vue';
import { VButton, VInput } from '@/uikit';
import FormInput from '../components/Input/FormInput';
import { useI18n } from 'vue-i18n';
import { useFetch } from '@/hooks/useFetch';
import { useCurrencyStore } from '@/states/currency/store';
import { formatCurrency } from '@/utils/currency';
import { formatTokenQuantity } from '@/utils/token';

// TODO: useFetch for api call
// useFetch
const dataFromApi = {
    usdtBalance: 1000,
    usdtBalanceFiat: 1000
};

const dataFromApiConvert = {
    netSum: 100
};

const { t, locale } = useI18n();
const currencyStore = useCurrencyStore();

const balance = computed(
    () => formatTokenQuantity(dataFromApi.usdtBalance)
);

const fiatBalance = computed(
    () => formatCurrency(dataFromApi.usdtBalanceFiat, locale.value, currencyStore.code)
);

const netSum = computed(
    () => formatCurrency(dataFromApiConvert.netSum, locale.value, currencyStore.code)
);
</script>

<template>
    <!-- TODO: VSpin -->
    <div :class="styles.wrap">
        <div :class="styles.head">
            <div :class="styles.balance">
                {{ balance }} <span>USDT</span>
            </div>

            <div :class="styles.balanceFiat">
                ≈ {{ fiatBalance }}
            </div>
        </div>

        <FormInput :class="styles.formInput">
            <template #label>
                {{ t('sum') }}
            </template>

            <template #addon>
                <button :class="styles.limits">
                    {{ t('limit') }}
                </button>
            </template>

            <template #input>
                <VInput :placeholder="t('enterSum')">
                    <template #addon-right>
                        USDT 
                        <!-- TODO: styles -->
                    </template>
                </VInput>
            </template>
        </FormInput>

        <FormInput :class="styles.formInput">
            <template #label>
                {{ t('numberCard') }}
            </template>

            <template #input>
                <VInput placeholder="000 000 000 000">
                    <template #addon-right>
                        <!-- TODO: card payment system logo -->
                    </template>
                </VInput>
            </template>
        </FormInput>

        <div :class="styles.fees">
            <div :class="styles.fee">
                <div :class="styles.feeLabel">{{ t('commission') }}</div>
                <div :class="styles.feeValue">$ 1.0</div>
            </div>
            <div :class="styles.fee">
                <div :class="styles.feeLabel">{{ t('commission2') }}</div>
                <div :class="styles.feeValue">2 %</div>
            </div>
        </div>

        <div :class="styles.action">
            <div :class="styles.actionLabel">
                <!-- TODO: translate -->
                сумма к получению 
            </div>

            <div :class="styles.actionValue">
                {{ netSum }}
            </div>

            <div :class="styles.actionButton">
                <VButton>
                    {{ t('confirm') }}
                </VButton>
            </div>
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './WithdrawalFiatView.module.scss';
</style>