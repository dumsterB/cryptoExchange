import { h } from 'vue';
import styles from './FlagIcon.module.scss';

function FlagIcon({ code }, { attrs }) {
    const style = { backgroundImage: `url(/images/flags/${ code }.svg)` };

    return h(
        'div',
        {
            ...attrs,
            style,
            class: styles.flag
        }
    );
}

FlagIcon.props = {
    code: {
        type: String,
        required: true
    }
};

export default FlagIcon;