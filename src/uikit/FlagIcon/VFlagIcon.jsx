import styles from './VFlagIcon.module.scss';

function FlagIcon({ code }, { attrs }) {
    const style = { backgroundImage: `url(/images/flags/${code}.svg)` };

    return <div
        class={[styles.flag, attrs.class]}
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