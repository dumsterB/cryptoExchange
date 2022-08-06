import variants from './variants';
import styles from './VAlert.module.scss';

function VAlert({ view }, { slots }) {
    return <div class={[styles.alert, styles[view]]}>
        {slots.icon ? <div class={styles.icon}>
            {slots.icon()}
        </div> : null}

        <div class={styles.content}>
            {slots.default?.()}
        </div>
    </div>;
}

VAlert.props = {
    view: {
        type: String,
        default: variants.primary,
        validator: view => Object.values(variants).includes(view)
    }
};

export default VAlert;