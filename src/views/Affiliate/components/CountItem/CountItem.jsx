import styles from './CountItem.module.scss';

function CountItem({ change, formatChange }, { slots }) {
    const changeValue = formatChange
        ? formatChange(change)
        : change;

    return <div class={styles.count}>
        <div class={styles.label}>
            {slots.label?.()}
        </div>

        <div class={styles.value}>
            {slots.value?.()}
        </div>

        {change ? <div class={[styles.change, {
            [styles.green]: change > 0,
            [styles.red]: change < 0
        }]}>
            {changeValue > 0 ? `+${changeValue}` : changeValue}
        </div> : null}
    </div>;
}

CountItem.props = {
    change: {
        type: Number,
        default: 0
    },
    formatChange: {
        type: [Function, null],
        default: null
    }
};

export default CountItem;