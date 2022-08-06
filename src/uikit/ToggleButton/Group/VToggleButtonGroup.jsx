import styles from './VToggleButtonGroup.module.scss';

function VToggleButtonGroup({ cols }, { slots }) {
    return <div
        class={styles.group}
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
        {slots.default?.()}
    </div>;
}

VToggleButtonGroup.props = {
    cols: {
        type: [String, Number],
        default: 1
    }
};

export default VToggleButtonGroup;