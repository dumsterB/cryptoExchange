import { CurrencyIcon } from '../../Currency';
import styles from './TokenIcon.module.scss';

function TokenIcon({ image, size }) {
    return <CurrencyIcon
        image={image}
        class={ styles[size]}
    />;
}

TokenIcon.props = {
    image: {
        type: String,
        required: true
    },
    // s - 18px
    // m - 24px
    // l - 44px
    size: {
        type: String,
        default: 'l',
        validator(size) {
            return ['s', 'm', 'l'].includes(size);
        }
    }
};

export default TokenIcon;