import type { Token } from '@/states/types/types';
import { formatTokenQuantity } from '@/utils/token';
import { computed, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {calcEstimateFee} from '@/states/withdrawal/fetch/CalcEstimateFee';

export  function useWithdrawalOutput(
    selectedCurrency: Ref<Token>,
    typedAmount: Ref<number>,
    percentsFee: {netSum:number, feeNetwork:number, feeWhitex:string}
) {
    const { t } = useI18n();
    const fee =  calcEstimateFee(selectedCurrency.value.id);

    const outputFee = computed(()=>{
        return `${formatTokenQuantity(fee.fee , selectedCurrency.value.decimals)} ${ selectedCurrency.value.symbol }`;
    });

    const outputAmount = computed(() => {
        const parsedAmount = typedAmount.value;
        let calculate = parsedAmount * 2 / 100;
        return `${ formatTokenQuantity(calculate || 0, selectedCurrency.value.decimals) } ${ selectedCurrency.value.symbol }`;
    });

    const fees = computed(() => {
        return [
            {
                label: t('commissionNetwork'),
                value: outputFee
            },
            {
                label: t('commissionWhitex'),
                value: percentsFee.feeWhitex
            }
        ];
    });

    return {
        outputAmount,
        fees
    };
}