import { unref } from 'vue';
import { useI18n } from 'vue-i18n';

export function getTransactionTypeName(type) {
    const { t } = useI18n();

    switch (unref(type)) {

    case 'deposit':
        return t('receive');
    case 'withdrawal':
        return t('withdrawal');
    case 'swap':
        return t('swap');
    
    default:
        console.warn('unknown tx type!');

        return '';
        
    }
}