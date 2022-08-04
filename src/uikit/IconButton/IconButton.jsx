import styles from './IconButton.module.scss';

IconButton.props = {
    active: Boolean
};

IconButton.emits = {
    click: null
};

function IconButton({ active }, { emit, slots }) {
    return <button
        type="button"
        class={[
            styles.button,
            { [styles.active]: active }
        ]}
        onClick={() => emit('click')}
    >
        {slots.default?.()}
    </button>;
}

export default IconButton;

