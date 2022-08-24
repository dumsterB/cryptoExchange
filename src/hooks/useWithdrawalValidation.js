import { object, string, ref as yupRef } from 'yup';
import { fields } from '@/utils/auth';
import { useI18n } from 'vue-i18n';
import { useField, useForm } from 'vee-validate';

export function useWithdrawalValidation() {
    const { t } = useI18n();

    const CARD_NUMBER_MIN_LENGTH = 16;
    const validationSchema = object({
        [fields.USDT_INPUT]: string()
            .required(t('requiredField')),
        [fields.CARD_NUMBER]: string()
            .required(t('requiredField'))
            .min(CARD_NUMBER_MIN_LENGTH, t('errors.minLength', { count: CARD_NUMBER_MIN_LENGTH }))
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


    return {
        usdtInput,
        usdtError,
        cardNumber,
        cardError
    };
}