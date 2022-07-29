import { h } from 'vue';
import { formatCurrencyToParts } from '@/utils/currency';

function CurrencyNumber(
    {
        value,
        locale,
        currencyCode,
        color,
        fractionColor,
        fractionClass
    },
    { attrs }
) {
    return h(
        'div',
        {
            ...attrs
        },
        formatCurrencyToParts(value, locale, currencyCode).map(({ type, value }) => {
            const isFraction = type === 'decimal' || type === 'fraction';

            return h('span', {
                style: {
                    color: isFraction
                        ? fractionColor
                        : color
                },
                class: isFraction && fractionClass
                    ? fractionClass
                    : null
            }, value);
        })
    );
}

CurrencyNumber.props = {
    value: {
        type: Number,
        required: true
    },
    locale: {
        type: String,
        required: true
    },
    currencyCode: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'var(--color-typo-base)'
    },
    fractionColor: {
        type: String,
        default: 'var(--color-typo-ghost)'
    },
    fractionClass: {
        type: [String, null],
        default: null
    }
};

export default CurrencyNumber;