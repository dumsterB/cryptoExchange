import styles from './AppPopupBody.module.scss';

function AppPopupBody(_, { slots }) {
    return <div class={styles.body}>
        {slots.default?.()}
    </div>;
}

export default AppPopupBody;