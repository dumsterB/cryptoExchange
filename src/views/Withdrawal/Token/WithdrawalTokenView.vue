<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue';
import { VInput, VIcon, VAlert, VButton} from '@/uikit';
import { useI18n } from 'vue-i18n';
import { AppPopup } from '@/components/Popup';
import FormInput from '../components/Input/FormInput';
import WithdrawalFooter from '../components/Foter/WithdrawalFooter.vue';
import { TokenSearchPopup } from '../../../components/Token/index';
import { usePopup } from '@/hooks/usePopup';
import { useWithdrawalValidation } from '@/hooks/useWithdrawalValidation';
import {useFetchCurrencies} from '@/states/withdrawal/useFetchCurrencies';
import { confirmWithdrawalData } from '@/states/payments/confirm/confirmWithdrawalData';
import { useRouter } from 'vue-router';
import {calcWithdrawalResult} from '@/states/payments/fetch/calcWithdrawalResult';
import type {Token} from '@/states/types/types';
const { t } = useI18n();

// eslint-disable-next-line no-unused-vars
const router = useRouter();

const balances = reactive({
    usdtBalance: 0,
    usdtBalanceFiat: 0
});

const { addressToGet, addressToGetError, minSumWithdraw, minSumWithdrawError } = useWithdrawalValidation(balances.usdtBalance);
const { currencies } = useFetchCurrencies();

const isLoading = ref(false);
const popupCurrency = ref(false);

const selectedToken:Token[] = ref({
    id:'1',
    name: 'Solana',
    symbol: 'Sol',
    type: 'coin',
    chain: null,
    price: 32,
    icon: 'solana',
    standard: null,
    decimals: 16,
    explorer: [],
});


const result = reactive({
    netSum: 0,
    psFee: 0,
    serviceFee: 0
});

const commisions =ref([
    {
        label: t('commissionWhitex'),
        value: result.serviceFee
    },
    {
        label: t('commissionWithdraw'),
        value: result.psFee
    },
]);

const selectToken = (token:Token[])=>{
    selectedToken.value.name = token.name;
    selectedToken.value.id = token.id;
    selectedToken.value.icon = token.icon;
    selectedToken.value.value = token.value;
    popupCurrency.value = false;
};

//const currencyStore = useCurrencyStore();

watchEffect(async () => {
    const data = await  calcWithdrawalResult(selectedToken.value); // TODO: передать currencyCode из currencyStore ниже
    result.netSum = data.netSum;
    result.psFee = data.psFee;
    result.serviceFee = data.serviceFee;
});


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
    () =>  minSumWithdraw.value && addressToGet.value && minSumWithdraw.value < balances.usdtBalance
);

const {
    isPopupOpen: isLimitsOpened,
} = usePopup();

</script>

<template>
    <div :class="styles.wrap">
        <FormInput :class="styles.formInput">
            <template #label>
                {{ t('coin') }}
            </template>

            <template #addon>
                {{ $t('balance') }}: $ {{ balances.usdtBalance }}
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
            v-if="popupCurrency"
            v-model="popupCurrency"
            :title="$t('selectToken')"
            :opened="popupCurrency"
            :selected-token="selectedToken"
            :all-tokens="currencies"
            @selectToken="selectToken"
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
                v-for="commision of commisions"
                :key="commision.label"
                :class="styles.fee"
            >
                <div :class="styles.feeLabel">{{ commision.label }}</div>
                <div :class="styles.feeValue">$ {{ commision.value }} </div>
            </div>
        </div>

        <WithdrawalFooter
            :sum="{netSum:netSum}"
            @submit="submit"
        >
            <template #submit>
                <div :class="styles.actionButton">
                    <VButton
                        :class="styles.submitBtn"
                        :loading="isLoading"
                        :disabled="!disableHandler"
                        @click="submit"
                    >
                        <span v-if="!isLoading">{{ t('confirm') }}</span>
                    </VButton>
                </div>
            </template>
        </WithdrawalFooter>

        <AppPopup v-model="isLimitsOpened">
            limits
        </AppPopup>
    </div>
</template>

<style lang="scss" scoped module="styles">
@import './WithdrawalTokenView.scss';


</style>