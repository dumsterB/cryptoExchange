<script setup>
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { VInput, VIcon, VAlert, VButton} from '@/uikit';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
import { AppPopup } from '@/components/Popup';
import FormInput from '../components/Input/FormInput';
import WithdrawalFooter from '../components/Foter/WithdrawalFooter.vue';
import { TokenSearchPopup } from '../../../components/Token/index';
import { usePopup } from '@/hooks/usePopup';
import { useWithdrawalValidation } from '@/hooks/useWithdrawalValidation';
import {useFetchCurrencies} from '@/hooks/useFetchCurrencies';
import { formatCurrency } from '@/utils/currency';
import { formatTokenQuantity } from '@/utils/token';
import { useCurrencyStore } from '@/states/currency/store';
import { fetchWithdrawalData } from '@/states/payments/fetch/fetchWithdrawalData';
import { useRouter } from 'vue-router';
import {calcWithdrawalResult} from '@/states/payments/fetch/calcWithdrawalResult';

const router = useRouter();
const { addressToGet, addressToGetError, minSumWithdraw, minSumWithdrawError } = useWithdrawalValidation();
const { arr } = useFetchCurrencies();

const isLoading = ref(false);
const popupCurrency = ref(false);

const selectedToken = ref({
    id: '',
    name: 'Solana',
    description: '',
    icon: 'solana',
    value: '',
});

const balances = reactive({
    usdtBalance: 0,
    usdtBalanceFiat: 0
});

const result = reactive({
    netSum: 0,
    psFee: 0,
    serviceFee: 0
});

const dataFromApi = {
    usdtBalance: 1000,
    usdtBalanceFiat: 1000
};

const dataFromApiConvert = {
    netSum: 100
};

const selectToken = (token)=>{
    selectedToken.value.name = token.name;
    selectedToken.value.id = token.id;
    selectedToken.value.icon = token.icon;
    selectedToken.value.value = token.value;
    popupCurrency.value = false;
};
const currencyStore = useCurrencyStore();

onMounted(async () => {

});

watchEffect(async () => {
    const data = await  calcWithdrawalResult(selectedToken.value); // TODO: передать currencyCode из currencyStore ниже
    result.netSum = data.netSum;
    result.psFee = data.psFee;
    result.serviceFee = data.serviceFee;

});


const submit = async() =>{
    console.log('get emit');
    await fetchWithdrawalData({
        address: addressToGet.value,
        token: selectedToken.value,
        sumWithdraw: minSumWithdraw.value
    });

    router.push('/');
};

const popupHandler = ()=>{
    popupCurrency.value = !popupCurrency.value;
};


const balance = computed(
    () => formatTokenQuantity(dataFromApi.usdtBalance)
);

const disableHandler = computed(
    () =>  minSumWithdrawError.value || addressToGetError.value
);

const fiatBalance = computed(
    () => formatCurrency(dataFromApi.usdtBalanceFiat, locale.value, currencyStore.code)
);

const netSum = computed(
    () => formatCurrency(dataFromApiConvert.netSum, locale.value, currencyStore.code)
);


const {
    isPopupOpen: isLimitsOpened,
    openPopup: openLimits
} = usePopup();

</script>

<template>
    <!-- TODO: VSpin -->
    <div :class="styles.wrap">
        <FormInput :class="styles.formInput">
            <template #label>
                {{ t('coin') }}
            </template>

            <template #addon>
                {{ $t('balance') }}: {{ balances.usdtBalance }}
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
            :all-tokens="arr"
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
                />
            </template>
        </FormInput>

        <div :class="styles.fees">
            <div :class="styles.fee">
                <div :class="styles.feeLabel">{{ t('commission') }}</div>
                <div :class="styles.feeValue">$ {{ result.serviceFee }} </div>
            </div>
            <div :class="styles.fee">
                <div :class="styles.feeLabel">{{ t('commission2') }}</div>
                <div :class="styles.feeValue">{{ result.psFee }} %</div>
            </div>
        </div>

        <WithdrawalFooter
            :data="{netSum:netSum}"
            @submit="submit"
        >
            <template #submit>
                <div :class="styles.actionButton">
                    <VButton
                        :class="styles.submitBtn"
                        :loading="isLoading"
                        :disabled="disableHandler"
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