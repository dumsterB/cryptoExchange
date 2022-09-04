<script setup lang="ts">
import {computed, reactive, ref, toRef, watchEffect} from 'vue';
import { VInput, VIcon, VAlert, VButton} from '@/uikit';
import { useI18n } from 'vue-i18n';
import FormInput from '../components/Input/FormInput';
import WithdrawalFooter from '../components/Foter/WithdrawalFooter.vue';
import { TokenSearchPopup } from '../../../components/Token/index';
import { useWithdrawalValidation } from '@/hooks/useWithdrawalValidation';
import {useFetchCurrencies} from '@/states/withdrawal/fetch/useFetchCurrencies';
import { confirmWithdrawalData } from '@/states/payments/confirm/confirmWithdrawalData';
import {calcWithdrawalToken} from '@/states/withdrawal/hooks/calcWithdrawalToken';
import type {Token} from '@/states/types/types';
import { useUserBalance } from '@/states/withdrawal/fetch/useUserBalance';
const { t } = useI18n();

const usdtBalance = useUserBalance();

const { addressToGet, addressToGetError, minSumWithdraw, minSumWithdrawError } = useWithdrawalValidation(usdtBalance);
const { currencies } = useFetchCurrencies();
const isLoading = ref(false);
const popupCurrency = ref(false);

let selectedToken = ref<Token>(currencies[0]);


const selectCurrency = (token:Token) =>{
    selectedToken.value = token;
};

const result = reactive({
    netSum: 0,
    feeAgent: 0,
    feeWhitex: 0
});

watchEffect(async () => {
    const data = await  calcWithdrawalToken(selectedToken.value, minSumWithdraw.value);
    result.netSum = data.netSum;
    result.feeAgent = data.feeAgent;
    result.feeWhitex = data.feeWhitex;
});

const feeAgent = toRef(result,'feeAgent');
const feeWhitex = toRef(result,'feeWhitex');

const fees = reactive([
    {
        label: t('commissionWhitex'),
        value: feeWhitex
    },
    {
        label: t('commissionWithdraw'),
        value: feeAgent
    },
]);

const submit = () =>{
    isLoading.value = true;

    confirmWithdrawalData({
        address: addressToGet.value,
        token: selectedToken.value,
        sumWithdraw: minSumWithdraw.value
    });

    isLoading.value = false;

};

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
                <div :class="styles.feeValue">$ {{ fee.value }} </div>
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
                    {{ result.netSum }}
                </div>
            </template>
            <template #submit>
                <div :class="styles.actionButton">
                    <VButton
                        :class="styles.submitBtn"
                        :loading="isLoading"
                        :disabled="!disableHandler"
                        @click="submit"
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