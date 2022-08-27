import { escapeRegExp } from './utils';
import { isMobile } from '@/utils/isMobile';
import styles from './NumericInput.module.scss';

const inputRegex = RegExp('^\\d*(?:\\\\[.])?\\d*$');

const type = isMobile
    ? 'number'
    : 'text';

export function NumericInput({ modelValue, placeholder }, { emit }) {
    const enforcer = (nextUserInput, target) => {
        if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
            emit('update:modelValue', nextUserInput);
        } else {
            // TODO: check
            target.value = modelValue;
        }
    };

    return <input
        type={type}
        value={modelValue}
        onInput={(event) => enforcer(event.target.value.replace(/,/g, '.'), event.target)}
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={placeholder || '0.0'}
        minLength={1}
        maxLength={79}
        spellCheck="false"
        class={styles.input}
    />;
}

NumericInput.props = {
    modelValue: {
        type: [String, Number],
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    }
};

NumericInput.emits = {
    'update:modelValue': null
};

export default NumericInput;