import styles from './ChartTooltip.module.scss';

function ChartTooltip({ text, x, y, caretY, caretX, opacity }) {
    const style = opacity
        ? {
            opacity: 1,
            top: `${y + caretY - 36}px`,
            left: `${x + caretX}px`
        }
        : { opacity: 0 };

    return <div
        class={styles.tooltip}
        style={style}
    >
        {text}
    </div>;
}

ChartTooltip.props = {
    text: {
        type: [String, Number],
        default: ''
    },
    x: {
        type: Number,
        default: 0
    },
    y: {
        type: Number,
        default: 0
    },
    caretX: {
        type: Number,
        default: 0
    },
    caretY: {
        type: Number,
        default: 0
    },
    opacity: {
        type: Number,
        default: 0
    }
};

export default ChartTooltip;