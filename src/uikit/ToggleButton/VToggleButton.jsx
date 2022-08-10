import { RouterLink } from 'vue-router';
import styles from './VToggleButton.module.scss';

function VToggleButton({ to }, { emit, slots }) {
    if (to) {
        return <RouterLink
            to={to}
            class={styles.button}
            activeClass={styles.active}
        >
            {slots.default?.()}
        </RouterLink>;
    } else {
        return <button
            class={styles.button}
            onClick={() => emit('click')}
        >
            {slots.default?.()}
        </button>;
    }
}

VToggleButton.props = {
    to: {
        type: String,
        default: ''
    },
    active: Boolean
};

VToggleButton.emits = {
    click: null
};

export default VToggleButton;