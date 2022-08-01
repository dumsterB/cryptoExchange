import styles from './VerificationStatus.module.scss';
import i18n from '@/app/localization';

function VerificationStatus({ completed }) {
    const text = completed
        ? 'verified'
        : 'notVerified';

    return <div class={[
        styles.status,
        {
            [styles.green]: completed,
            [styles.orange]: !completed
        }
    ]}>
        {i18n.global.t(text)}
    </div>;
}

VerificationStatus.props = {
    completed: Boolean
};

export default VerificationStatus;