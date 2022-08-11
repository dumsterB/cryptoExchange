<script setup>
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { AppPopup } from '@/components/Popup';
import { VButton, VInput,VSpin } from '@/uikit';
import FormInput from '../components/Input/FormInput';
import { useI18n } from 'vue-i18n';
// import { useFetch } from '@/hooks/useFetch';
import { usePopup } from '@/hooks/usePopup';
import { useCurrencyStore } from '@/states/currency/store';
import { formatCurrency } from '@/utils/currency';
import { formatTokenQuantity } from '@/utils/token';
import { fetchWithdrawalData } from '@/states/payments/fetch/fetchWithdrawalData';
import { calcWithdrawalResult } from '@/states/payments/fetch/calcWithdrawalResult';
import { useField } from 'vee-validate';
import { useWithdrawalValidation } from "@/hooks/useWithdrawalValidation";

// пример
const usdtInputValue = ref('');
const cardNumberInputValue = ref('');
const cardType = ref({src:'',value:''});
const isLoading = ref(false)

const balances = reactive({
    usdtBalance: 0,
    usdtBalanceFiat: 0
});

const result = reactive({
    netSum: 0,
    psFee: 0,
    serviceFee: 0
});
onMounted(async () => {
    const data = await fetchWithdrawalData(); // TODO: передать currencyCode из currencyStore ниже
    balances.usdtBalance = data.usdtBalance;
    balances.usdtBalanceFiat = data.usdtBalanceFiat;
});

// теперь при изменении usdtInputValue или currencyCode вызовется запрос на бек, для 
// только нужен debaunce, чтобы каждую секунду бек не дергать
watchEffect(async () => {
    if (usdtInputValue.value) {
        const data = await calcWithdrawalResult(usdtInputValue.value); // TODO: передать currencyCode из currencyStore ниже
        const res = await useWithdrawalValidation(usdtInputValue.value)
        console.log(res)
        result.netSum = data.netSum;
        result.psFee = data.psFee;
        result.serviceFee = data.serviceFee;
    }

});

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
async function submit(){
  isLoading.value = true
  const data = {
    usdt: usdtInputValue.value,
    cardNumber: cardNumberInputValue.value
  }
 const res = await fetchWithdrawalData(data,isLoading)
  cardNumberInputValue.value = ''
  usdtInputValue.value = ''
  isLoading.value = res.isLoading
}
const balance = computed(
    () => formatTokenQuantity(dataFromApi.usdtBalance)
);
const cardNumberHandler = computed(()=>{
    const card = [{value:'4'},{value:'2'},{value:'5'}]
    return  cardType.value  =  card.find(ell=> ell.value  === cardNumberInputValue.value[0])
})

const disableHandler = computed(
    () =>  usdtInputValue.value && cardNumberInputValue.value.length === 12
)

const fiatBalance = computed(
    () => formatCurrency(dataFromApi.usdtBalanceFiat, locale.value, currencyStore.code)
);

const netSum = computed(
    () => formatCurrency(dataFromApiConvert.netSum, locale.value, currencyStore.code)
);
function validateField(value) {
  if (!value) {
    return  'requiredField';
  }

  if (value >= dataFromApi.usdtBalance) {
    return 'sumChecker';
  }

  return true;
}

const { errorMessage, value, handleChange } = useField(
    'fieldName',
    validateField,
    {
      validateOnValueUpdate: false,
    }
);
const validationListeners = computed(() => {
  if (!errorMessage.value) {
    return {
      blur: handleChange,
      change: handleChange,
      input: (e) => handleChange(e, false),
    };
  }

  return {
    blur: handleChange,
    change: handleChange,
    input: handleChange,
  };
});
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

            <template #input >
                <VInput v-on="validationListeners" :value="value" v-model="usdtInputValue" :placeholder="t('enterSum')">
                    <template  #addon-right>
                     <span :class="styles.curr"> USDT </span>
                    </template>
                </VInput>
              <div v-if="errorMessage">
                <p :class="styles.errorMessage">{{t(`${errorMessage}`)}}</p>
              </div>

            </template>
        </FormInput>

        <FormInput :class="styles.formInput">
            <template #label>
                {{ t('numberCard') }}
            </template>

            <template #input>
                <VInput v-model="cardNumberInputValue" @change="cardNumberHandler"  placeholder="000 000 000 000">
                    <template #addon-right v-if="cardType">
                      <img height="50"  v-if="cardType.value == 4" src="../../../app/assets/icons/visa-logo-svgrepo-com.svg" alt="">
                      <img height="40"  :class="styles.iconMasterCard" v-if="cardType.value == 2" src="../../../app/assets/icons/mastercard.svg" alt="">
                      <img height="20" :class="styles.iconMir" v-if="cardType.value == 5" src="../../../app/assets/icons/mir-logo.svg" alt="">
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
                {{ t('getSum') }}
            </div>

            <div :class="styles.actionValue">
                {{ netSum }}
            </div>

            <div :class="styles.actionButton">
                <VButton :class="styles.submitBtn" @click="submit" :disabled="!disableHandler">
                  <span v-if="!isLoading">{{ t('confirm') }}</span>
                  <span v-if="isLoading"><VSpin ratio="1.5"></VSpin></span>
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