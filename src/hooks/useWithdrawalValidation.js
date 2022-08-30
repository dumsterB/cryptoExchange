import { object, string, number, ref as yupRef } from 'yup';
import { fields } from '@/utils/auth';
import { useI18n } from 'vue-i18n';
import { useField, useForm } from 'vee-validate';

export function useWithdrawalValidation(usdtBalance) {
    const { t } = useI18n();

    const CARD_NUMBER_MIN_LENGTH = 16;
    const validationSchema = object({
        [fields.USDT_INPUT]: string()
            .required(t('requiredField')),
        [fields.CARD_NUMBER]: string()
            .required(t('requiredField'))
            .min(CARD_NUMBER_MIN_LENGTH, t('errors.minLength', { count: CARD_NUMBER_MIN_LENGTH })),
        [fields.ADDRESS_TO_GET]: string()
            .required(t('requiredField')),
        [fields.MIN_SUM_WITHDRAW]: number()
            .typeError(t('requiredField'))
            .lessThan(usdtBalance,t('minWithdrawSumValidation')),
        [fields.TOKEN]: string()
            .required(t('requiredField'))
    });

    useForm({ validationSchema });

    const {
        value: usdtInput,
        errorMessage: usdtError
    } = useField(fields.USDT_INPUT);

    const {
        value: cardNumber,
        errorMessage: cardError
    } = useField(fields.CARD_NUMBER);

    const {
        value: addressToGet,
        errorMessage: addressToGetError
    } = useField(fields.ADDRESS_TO_GET);

    const {
        value: token,
        errorMessage: tokentError
    } = useField(fields.TOKEN);

    const {
        value: minSumWithdraw,
        errorMessage: minSumWithdrawError
    } = useField(fields.MIN_SUM_WITHDRAW);

    return {
        usdtInput,
        usdtError,
        cardNumber,
        cardError,
        addressToGet,
        addressToGetError,
        token,
        tokentError,
        minSumWithdraw,
        minSumWithdrawError
    };
}