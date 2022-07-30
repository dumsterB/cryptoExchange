import styles from './CurrencyIcon.module.scss';

function CurrencyIcon({ image }, { attrs }) {
    return <div
        class={[styles.icon, attrs.class]}
        style={{ backgroundImage: `url(${image})` }}
    ></div>;
}

CurrencyIcon.props = {
    image: {
        type: String,
        required: true
    }
};

export default CurrencyIcon;