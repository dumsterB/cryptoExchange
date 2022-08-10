import styles from './VBox.module.scss';

function VBox(_, { slots }) {
    return <div class={styles.box}>
        {slots.default?.()}
    </div>;
}

export default VBox;