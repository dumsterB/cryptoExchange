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

    if (!formatter.formatToParts)
        return [ value ]; // TODO: custom format to parts

    return formatter.formatToParts(value);
}