import { formatCurrency } from '@/utils/currency';
import { LEVEL_COLORS } from '@/config/constants/affiliate';
import styles from './FriendsTableRow.module.scss';

function FriendsTableRow({
    name,
    email,
    income,
    level,
    locale,
    currencyCode
}) {
    const levelStyles = {
        color: LEVEL_COLORS[level].typo,
        backgroundColor: LEVEL_COLORS[level].fill,
        borderColor: LEVEL_COLORS[level].stroke,
        boxShadow: `${LEVEL_COLORS[level].stroke} 0px 2px 0px 0`
    };

    return <div class={styles.friend}>
        <div class={styles.col}>
            <div class={styles.name}>
                {name}
            </div>
            <div class={styles.email}>
                {email}
            </div>
        </div>

        <div class={styles.col}>
            <div class={styles.email}>
                {email}
            </div>
        </div>

        <div class={styles.col}>
            <div class={[
                styles.income,
                { [styles.green]: income > 0 }
            ]}>
                {formatCurrency(income, locale, currencyCode)}
            </div>
        </div>

        <div class={styles.col}>
            <div
                class={styles.level}
                style={levelStyles}
            >
                {level}
            </div>
        </div>
    </div>;
}

FriendsTableRow.props = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    level: {
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
    }
};

export default FriendsTableRow;