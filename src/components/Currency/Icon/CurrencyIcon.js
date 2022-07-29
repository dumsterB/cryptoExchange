import { h } from 'vue';
import styles from './CurrencyIcon.module.scss';

function CurrencyIcon({ image, size }, { attrs }) {
    return h('div', {
        class: [
            styles.icon,
            styles[size],
            attrs.class
        ],
        style: { backgroundImage: `url(${ image })`}
    });
}

CurrencyIcon.props = {
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

export default CurrencyIcon;