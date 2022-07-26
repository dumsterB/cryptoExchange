import { currencies } from '../store/currency';

export function getFormatter(
    locale,
    currencyCode,
    type = 'fraction'
) {
    const currency = currencies[currencyCode];

    return currency?.getFormatterConfig?.() ?? numberFormats[type](locale, currencyCode);
}

const numberFormats = {
    int: (locale, currencyCode) => new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }),
    fraction: (locale, currencyCode) => new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode
    })
};