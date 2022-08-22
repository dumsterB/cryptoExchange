import { VButton, VIcon } from '@/uikit';
import styles from './SuccessResult.module.scss';

function SuccessResult({ t }) {
    return <div class={styles.result}>
        <div class={styles.content}>
            <div class={styles.icon}>
                <VIcon name="check-l" />
            </div>

            <div class={styles.title}>
                {t('passwordUpdated')}
            </div>

            <div class={styles.description}>
                {t('passwordUpdatedText')}
            </div>

            <VButton
                to="/login"
                size="s"
            >
                {t('login')}
            </VButton>
        </div>
    </div>;
}

SuccessResult.props = {
    t: {
        type: Function,
        required: true
    }
};

export default SuccessResult;