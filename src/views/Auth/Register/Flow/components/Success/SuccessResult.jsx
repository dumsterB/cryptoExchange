import { Transition } from 'vue';
import { VButton, VIcon } from '@/uikit';
import styles from './SuccessResult.module.scss';

function SuccessResult({ t }) {
    return <Transition
        appear
        appearFromClass={styles.animEnterFrom}
        appearToClass={styles.animEnterTo}
        appearActiveClass={styles.animEnterActive}
        duration={{ enter: 800, leave: 0 }}
    >
        <div class={styles.container}>
            <div class={styles.content}>

                <div class={styles.visual}>
                    <div class={[styles.visualStar, styles.visualStarXs]}>
                        <VIcon name="star-xs" />
                    </div>
                    <div class={[styles.visualStar, styles.visualStarS]}>
                        <VIcon name="star-s" />
                    </div>
                    <div class={[styles.visualStar, styles.visualStarM]}>
                        <VIcon name="star-m" />
                    </div>
                    <div class={styles.visualCheck}>
                        <VIcon name="check-l" />
                    </div>
                </div>

                <div class={styles.title}>
                    {t('registerCompleted')}
                </div>

                <div class={styles.description}>
                    {t('registerCompletedInfo')}
                </div>

                <VButton
                    size="s"
                    to="/"
                >
                    {t('button.start')}
                </VButton>

            </div>
        </div>
    </Transition>;
}

SuccessResult.props = {
    t: {
        type: Function,
        required: true
    }
};

export default SuccessResult;