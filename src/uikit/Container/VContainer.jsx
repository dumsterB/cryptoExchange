import styles from './VContainer.module.scss';

function VContainer(_, { attrs, slots }) {
    return <div class={[
        styles.container,
        attrs.class
    ]}>
        {slots.default?.()}
    </div>;
}

export default VContainer;