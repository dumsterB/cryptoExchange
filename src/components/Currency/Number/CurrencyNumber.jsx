import { formatCurrencyToParts } from '@/utils/currency';

function CurrencyNumber(
    {
        value,
        locale,
        currencyCode,
        color,
        fractionColor,
        fractionClass
    }
) {
    return <div>
        {formatCurrencyToParts(value, locale, currencyCode).map(({ type, value }) => {
            const isFraction = type === 'decimal' || type === 'fraction';

            return <span
                class={isFraction && fractionClass ? fractionClass : null}
                style={{ color: isFraction ? fractionColor : color }}
            >
                {value}
            </span>;
        })}
    </div>;
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