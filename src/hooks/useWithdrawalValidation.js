import { useField } from 'vee-validate';
import { useI18n } from 'vue-i18n';
export async function useWithdrawalValidation(inputValue,usdtBalance) {
    // t('requiredField')
    // t('sumChecker')
    if (!inputValue) {
        return 'requiredField';
    }

    if (inputValue >= usdtBalance) {
        return 'sumChecker';
    }


    const {
        value: usdtInputValue,
        errorMessage: sumError
    } = useField('usdtInputValue');

    return {
        usdtInputValue,
        sumError,
    };
}