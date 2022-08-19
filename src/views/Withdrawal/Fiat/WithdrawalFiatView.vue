<script setup>
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { VButton, VInput,VSpin } from '@/uikit';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
import { AppPopup } from '@/components/Popup';
import FormInput from '../components/Input/FormInput';
import { usePopup } from '@/hooks/usePopup';
import { useWithdrawalValidation } from '@/hooks/useWithdrawalValidation';
import { formatCurrency } from '@/utils/currency';
import { formatTokenQuantity } from '@/utils/token';
import { useCurrencyStore } from '@/states/currency/store';
import { fetchWithdrawalData } from '@/states/payments/fetch/fetchWithdrawalData';
import { calcWithdrawalResult } from '@/states/payments/fetch/calcWithdrawalResult';



const usdtInputValue = ref('');
const errorMessage = ref('');
const cardNumberInputValue = ref('');
const cardType = ref({src:'',value:''});
const isLoading = ref(false);

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

const currencyStore = useCurrencyStore();

onMounted(async () => {
    const data = await fetchWithdrawalData(); // TODO: передать currencyCode из currencyStore ниже
    balances.usdtBalance = data.usdtBalance;
    balances.usdtBalanceFiat = data.usdtBalanceFiat;
});

// теперь при изменении usdtInputValue или currencyCode вызовется запрос на бек, для 
// только нужен debaunce, чтобы каждую секунду бек не дергать
watchEffect(async () => {
    const data = await  calcWithdrawalResult(usdtInputValue.value); // TODO: передать currencyCode из currencyStore ниже
    const res = await useWithdrawalValidation(usdtInputValue.value,dataFromApi.usdtBalance);
    errorMessage.value = res;
    result.netSum = data.netSum;
    result.psFee = data.psFee;
    result.serviceFee = data.serviceFee;
});


// TODO: useFetch for api call
// useFetch

const cardNumberHandler = () => {
    const card = [{value:'4'},{value:'2'},{value:'5'}];
    cardType.value  =  card.find(ell=> ell.value  === cardNumberInputValue.value[0]);
};

const  submit = async() =>{
    isLoading.value = true;
    const data = {
        usdt: usdtInputValue.value,
        cardNumber: cardNumberInputValue.value
    };
    const res = await fetchWithdrawalData(data,isLoading);
    console.log(res);
    cardNumberInputValue.value = '';
    usdtInputValue.value = '';
    isLoading.value = res.isLoading;
};

// eslint-disable-next-line vue/return-in-computed-property
const cardIcon = computed(() => {
    switch(cardType.value) {
    case 4:
        return '../../../app/assets/icons/visa-logo-svgrepo-com.svg';
    case 2:
        return '../../../app/assets/icons/mastercard.svg';
    case 5:
        return '../../../app/assets/icons/mir-logo.svg';
    }

});


const balance = computed(
    () => formatTokenQuantity(dataFromApi.usdtBalance)
);

const disableHandler = computed(
    () =>  errorMessage.value
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
                <button
                    :class="styles.limits"
                    @click="openLimits"
                >
                    {{ t('limit') }}
                </button>
            </template>

            <template #input>
                <VInput
                    v-model="usdtInputValue"
                    :value="value"
                    :placeholder="t('enterSum')"
                    v-on="validationListeners"
                >
                    <template #addon-right>
                        <span :class="styles.curr"> USDT </span>
                    </template>
                </VInput>
                <div v-if="errorMessage">
                    <p :class="styles.errorMessage">{{ t(`${errorMessage}`) }}</p>
                </div>

            </template>
        </FormInput>

        <FormInput :class="styles.formInput">
            <template #label>
                {{ t('numberCard') }}
            </template>

            <template #input>
                <VInput
                    v-model="cardNumberInputValue"
                    :mask="{mask: '9999 9999 9999 9999', greedy: true}"
                    placeholder="000 000 000 000"
                    @change="cardNumberHandler"
                >
                    <template
                        v-if="cardType"
                        #addon-right
                    >
                        <VIcon
                            :key="cardIcon"
                            :value="cardIcon"
                        />
                    </template>
                </VInput>
            </template>
        </FormInput>
        <h1>{{ cardIcon }} : {{ cardType.value }}</h1>
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
                {{ t('getSum') }}
            </div>

            <div :class="styles.actionValue">
                {{ netSum }}
            </div>

            <div :class="styles.actionButton">
                <VButton
                    :class="styles.submitBtn"
                    :loading="isLoading"
                    :disabled="disableHandler"
                    @click="submit"
                >
                    <span v-if="!isLoading">{{ t('confirm') }}</span>
                    <span v-if="isLoading"><VSpin ratio="1.5" /></span>
                </VButton>

            </div>
        </div>

        <AppPopup v-model="isLimitsOpened">
            limits
        </AppPopup>

    </div>
</template>

<style lang="scss" module="styles">
@import './WithdrawalFiatView.module.scss';


</style>