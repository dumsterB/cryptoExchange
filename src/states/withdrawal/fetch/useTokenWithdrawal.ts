import type { Token } from '@/states/types/types';
import { ref, type Ref } from 'vue';
import parseError from '@/utils/parseError';
import { useToast } from '@/components/Toast';
import { useI18n } from 'vue-i18n';
import { confirmWithdrawalData } from '@/states/payments/confirm/confirmWithdrawalData';

export function useTokenWithdrawal(
    recipient: Ref<string>,
    typedAmount: Ref<number>,
    inputCurrency: Ref<Token>,
) {
    const { t } = useI18n();
    const toast = useToast();
    const isLoading = ref(false);

    const confirmTokenWithdrawal = async () => {
        try {
            isLoading.value = true;
    
            const { status } = await confirmWithdrawalData(recipient, typedAmount, inputCurrency);

            isLoading.value = false;

            if (!status)
                throw new Error('no result from withdrawal');

            toast.open({
                text: t('YourWithdrawalConfirmed'),
                view: 'success'
            });

            
        } catch (e) {
            const error = parseError(e);

            toast.openDanger(t(error));
        } finally {
            isLoading.value = false;
        }
    };

    return {
        isLoading,
        confirmTokenWithdrawal
    };
}