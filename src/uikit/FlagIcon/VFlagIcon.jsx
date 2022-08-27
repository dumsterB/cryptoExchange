import styles from './VFlagIcon.module.scss';

function FlagIcon({ code }) {
    const style = { backgroundImage: `url(/images/flags/${code}.svg)` };

    return <div
        class={styles.flag}
        style={style}
    >
    </div>;
}

FlagIcon.props = {
    code: {
        type: String,
        required: true
    }
};

export default FlagIcon;