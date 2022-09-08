import type {Token} from '@/states/types/types';
import type { Ref } from 'vue';


export async function confirmWithdrawalData(
    recipient: Ref<string>,
    typedAmount: Ref<number>,
    inputCurrency: Ref<Token>
) {
    await new Promise(function(resolve, reject) {
        console.log(recipient,typedAmount,inputCurrency);
    });
    return {
        status: true,
        usdtBalance: 1000,
        usdtBalanceToken: 1000,
    };

}