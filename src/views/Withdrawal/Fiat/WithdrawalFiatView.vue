<script setup>
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { VButton, VInput,VSpin} from '@/uikit';
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
import { useRouter } from 'vue-router';

const router = useRouter();
const {usdtInput,usdtError,cardError,cardNumber} = useWithdrawalValidation();

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
    const data = await fetchWithdrawalData(usdtInput.value); // TODO: передать currencyCode из currencyStore ниже
    balances.usdtBalance = data.usdtBalance;
    balances.usdtBalanceFiat = data.usdtBalanceFiat;
});

watchEffect(async () => {
    const data = await  calcWithdrawalResult(usdtInput.value); // TODO: передать currencyCode из currencyStore ниже
    result.netSum = data.netSum;
    result.psFee = data.psFee;
    result.serviceFee = data.serviceFee;
});


const submit = async() =>{

    await fetchWithdrawalData({
        usdt: usdtInput.value,
        cardNumber: cardNumber.value
    });

    usdtInput.value = '';
    cardNumber.value = '';
    router.push('/');
};

// const cardIcon = computed(() => {
//     return 'mir-logo';
// });

const balance = computed(
    () => formatTokenQuantity(dataFromApi.usdtBalance)
);

const disableHandler = computed(
    () =>  cardError.value || usdtError.value
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
                <div>
                    <VInput
                        v-model="usdtInput"
                        type="text"
                        :placeholder="t('enterSum')"
                        :error="usdtError"
                    >
                        <template #addon-right>
                            <span :class="styles.curr"> USDT </span>
                        </template>
                    </VInput>
                </div>
            </template>
        </FormInput>

        <FormInput :class="styles.formInput">
            <template #label>
                {{ t('numberCard') }}
            </template>

            <template #input>
                <VInput
                    v-model="cardNumber"
                    :mask="{mask: '9999 9999 9999 9999', greedy: true}"
                    placeholder="000 000 000 000"
                    :error="cardError"
                >
                    <template
                        #addon-right
                    >
                        <!--                        <VIcon-->
                        <!--                            :key="cardIcon"-->
                        <!--                            :name="cardIcon"-->
                        <!--                        />-->
                    </template>
                </VInput>
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