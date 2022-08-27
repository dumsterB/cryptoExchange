import styles from './CurrencyIcon.module.scss';

function CurrencyIcon({ image }) {
    return <div
        class={styles.icon}
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