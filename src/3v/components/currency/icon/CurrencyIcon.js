import { h } from "vue";
import styles from './CurrencyIcon.module.scss';

function CurrencyIcon({ image }, { attrs }) {
    return h('div', {
        class: [styles.icon, attrs.class],
        style: { backgroundImage: `url(${ image })`}
    });
}

CurrencyIcon.props = {
    image: {
        type: String,
        required: true
    }
};

export default CurrencyIcon;