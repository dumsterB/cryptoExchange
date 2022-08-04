import { Transition } from 'vue';
import { VButton, VIcon } from '@/uikit';
import styles from './OtpSuccess.module.scss';

function OtpSuccess({ t }, { attrs, slots, emit }) {
    return <div class={[styles.content, attrs.class]}>
        <Transition
            appear
            enterFromClass={styles.iconAppearEnterFrom}
            enterToClass={styles.iconAppearEnterTo}
            enterActiveClass={styles.iconAppearEnterActive}
        >
            <div class={styles.icon}>
                <VIcon name="check-email" />
            </div>
        </Transition>

        <div class={styles.title}>
            {slots.title?.()}
        </div>

        <div class={styles.description}>
            {slots.description?.()}
        </div>

        <VButton
            size="s"
            onClick={() => emit('skip')}
        >
            {t('button.next')}
        </VButton>
    </div>;
}

OtpSuccess.props = {
    t: {
        type: Function,
        required: true
    }
};

OtpSuccess.emits = {
    skip: null
};

export default OtpSuccess;