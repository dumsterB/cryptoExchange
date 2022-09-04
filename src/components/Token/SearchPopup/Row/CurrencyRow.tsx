import styles from './CurrencyRow.module.scss';
import { TokenIcon } from '@/components/Token';
import { formatTokenQuantity } from '@/utils/token';

function CurrencyRow({
    type,
    name,
    symbol,
    standard,
    chain,
    decimals,
    value,
    iconUrl,
    disabled
}) {
    const description = type === 'fiat'
        ? name
        : standard ? standard : chain;

    return <div class={[
        styles.row,
        { [styles.disabled]: disabled }
    ]}>
        <TokenIcon image={iconUrl} />

        <div class={styles.col}>
            <div class={styles.title}>
                {symbol}
            </div>

            <div class={styles.description}>
                {description}
            </div>
        </div>

        <div class={styles.balance}>
            {value ? <div class={styles.value}>
                {formatTokenQuantity(value, decimals)}
            </div> : null}
        </div>
    </div>;
}

CurrencyRow.props = {
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    standard: {
        type: [String, null],
        default: null
    },
    chain: {
        type: [String, null],
        default: null
    },
    decimals: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        default: 0
    },
    iconUrl: {
        type: String,
        default: ''
    },
    disabled: Boolean
};

export default CurrencyRow;