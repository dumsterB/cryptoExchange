<script setup lang="ts">
import {computed, ref} from 'vue';
import { VInput, VIcon, VAlert, VButton} from '@/uikit';
import { useI18n } from 'vue-i18n';
import FormInput from '../components/Input/FormInput';
import WithdrawalFooter from '../components/Foter/WithdrawalFooter.vue';
import { TokenSearchPopup } from '../../../components/Token/index';
import { useWithdrawalValidation } from '@/hooks/useWithdrawalValidation';
import {useFetchCurrencies} from '@/states/withdrawal/fetch/useFetchCurrencies';
import type {Token} from '@/states/types/types';
import { useUserBalance } from '@/states/withdrawal/fetch/useUserBalance';
import {useTokenWithdrawal} from '@/states/withdrawal/fetch/useTokenWithdrawal';
import {useWithdrawalOutput} from '@/states/withdrawal/fetch/useWithdrawalOutput';
const { t } = useI18n();

const usdtBalance = useUserBalance();

const { addressToGet, addressToGetError, minSumWithdraw, minSumWithdrawError } = useWithdrawalValidation(usdtBalance);
const { currencies } = useFetchCurrencies();
const popupCurrency = ref(false);

let selectedToken = ref<Token>(currencies[0]);

const selectCurrency = (token:Token) =>{
    selectedToken.value = token;
};

const result = {
    netSum: 0,
    feeNetwork: 5,
    feeWhitex: '$ 10',
};

const { outputAmount, fees } = useWithdrawalOutput(selectedToken, minSumWithdraw, result);

const {confirmTokenWithdrawal,isLoading: isConfirmLoading} = useTokenWithdrawal(addressToGet, minSumWithdraw, selectedToken);

const popupHandler = ()=>{
    popupCurrency.value = !popupCurrency.value;
};

const disableHandler = computed(
    () =>  minSumWithdraw.value && addressToGet.value && minSumWithdraw.value < usdtBalance.balance
);

</script>

<template>
    <div :class="styles.wrap">
        <FormInput :class="styles.formInput">
            <template #label>
                {{ t('coin') }}
            </template>

            <template #addon>
                {{ $t('balance') }}: $ {{ usdtBalance.balance }}
            </template>

            <template #input>
                <div>
                    <VInput
                        v-model="selectedToken.name"
                        type="text"
                        :placeholder="t('enterSum')"
                        @click="popupHandler"
                    >
                        <template #addon-left>
                            <div :class="styles.tokenIcon">
                                <VIcon :name="selectedToken.icon" />
                            </div>
                        </template>
                        <template #addon-right>
                            <div :class="styles.arrowDownIcon">
                                <VIcon name="arrow-down" />
                            </div>
                        </template>
                    </VInput>
                </div>
            </template>
        </FormInput>
        <TokenSearchPopup
            v-model:opened="popupCurrency"
            :title="t('selectToken')"
            :selected-currency="selectedToken"
            :currencies="currencies"
            @select-currency="selectCurrency"
        />
        <FormInput :class="styles.formInput">
            <template #label>
                {{ t('addressWallet') }}
            </template>

            <template #input>
                <div>
                    <VInput
                        v-model="addressToGet"
                        type="text"
                        :placeholder="t('addressGetter')"
                        :error="addressToGetError"
                    />
                </div>
            </template>
        </FormInput>

        <VAlert>
            <template #icon>
                <VIcon name="info" />
            </template>

            <div :class="styles.warning">
                1. {{ t('addressSupport') }}
            </div>
        </VAlert>

        <FormInput :class="styles.formInputWithdraw">
            <template #label>
                {{ t('withdrawSum') }}
            </template>

            <template #input>
                <VInput
                    v-model="minSumWithdraw"
                    :placeholder="t('minWithdrawSum')"
                    :error="minSumWithdrawError"
                    type="number"
                />
            </template>
        </FormInput>
        <div :class="styles.fees">
            <div
                v-for="fee of fees"
                :key="fee.label"
                :class="styles.fee"
            >
                <div :class="styles.feeLabel">{{ fee.label }}</div>
                <div :class="styles.feeValue">{{ fee.value }} </div>
            </div>
        </div>

        <WithdrawalFooter
            @submit="submit"
        >
            <template #fees>
                <div :class="styles.actionLabel">
                    {{ t('getSum') }}
                </div>

                <div :class="styles.actionValue">
                    {{ outputAmount }}
                </div>
            </template>
            <template #submit>
                <div :class="styles.actionButton">
                    <VButton
                        :class="styles.submitBtn"
                        :loading="isConfirmLoading"
                        :disabled="!disableHandler"
                        @click="confirmTokenWithdrawal"
                    >
                        <span>{{ t('confirm') }}</span>
                    </VButton>
                </div>
            </template>
        </WithdrawalFooter>
    </div>
</template>

<style lang="scss" scoped module="styles">
@import './WithdrawalTokenView.scss';
</style>