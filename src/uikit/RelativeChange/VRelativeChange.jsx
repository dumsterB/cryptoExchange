import { formatPercent } from './utils';
import styles from './VRelativeChange.module.scss';

function RelativeChange({ value }) {
    return <div class={[
        styles.percent,
        {
            [styles.green]: value >= 0,
            [styles.red]: value < 0
        }
    ]}>
        <div class={styles.text}>
            {formatPercent(value)}
        </div>
    </div>;
}

RelativeChange.props = {
    value: {
        type: [String, Number],
        required: true
    }
};

export default RelativeChange;
