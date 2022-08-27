import styles from './VContainer.module.scss';

function VContainer(_, { slots }) {
    return <div class={styles.container}>
        {slots.default?.()}
    </div>;
}

export default VContainer;