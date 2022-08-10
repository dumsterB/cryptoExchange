import styles from './FormInput.module.scss';

function FormInput(_, { slots }) {
    return <div class={styles.field}>
        <div class={styles.label}>
            {slots.label?.()}
        </div>

        {slots.addon ? <div class={styles.addon}>
            {slots.addon?.()}
        </div> : null}

        <div class={styles.input}>
            {slots.input?.()}
        </div>
    </div>;
}

export default FormInput;