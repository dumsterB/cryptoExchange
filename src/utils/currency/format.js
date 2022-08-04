import { currencies } from '@/states/currency/store';
import { getFormatter } from './formatter';

export function formatCurrency(value, locale, currencyCode) {
    const formatter = getFormatter(
        locale,
        currencyCode
    );

    return formatter.format(value);
}

export function formatCurrencyToParts(value, locale, currencyCode) {
    const formatter = getFormatter(
        locale,
        currencyCode
    );

    const currency = currencies[currencyCode];

    if (!formatter.formatToParts)
        return [ value ]; // TODO: custom format to parts

    const parts = formatter.formatToParts(value);

    return currency.modifyParts
        ? currency.modifyParts(parts)
        : parts;
}