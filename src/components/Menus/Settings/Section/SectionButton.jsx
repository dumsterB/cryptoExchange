import { VIcon } from '@/uikit';
import styles from './SectionButton.module.scss';

function SectionButton(_, { slots, emit }) {
    return <div
        class={styles.button}
        onClick={() => emit('click')}
    >
        <div class={styles.top}>
            <div class={styles.icon}>
                {slots.icon?.()}
            </div>

            <div class={styles.arrow}>
                <VIcon name="settings-menu-arrow" />
            </div>
        </div>

        <div class={styles.text}>
            {slots.text?.()}
        </div>
    </div>;
}

SectionButton.emits = {
    click: null
};

export default SectionButton;