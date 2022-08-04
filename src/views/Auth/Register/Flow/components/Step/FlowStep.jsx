import { VIcon } from '@/uikit';
import styles from './FlowStep.module.scss';

function FlowStep({ active, completed }, { slots }) {
    return <div class={[
        styles.step,
        {
            [styles.active]: active,
            [styles.completed]: completed
        }
    ]}>
        <div class={styles.checkbox}>
            <div class={styles.checkboxTick}>
                <VIcon name="check" />
            </div>
        </div>

        <div class={styles.text}>
            {slots.default?.()}
        </div>
    </div>;
}

FlowStep.props = {
    active: Boolean,
    completed: Boolean
};

export default FlowStep;