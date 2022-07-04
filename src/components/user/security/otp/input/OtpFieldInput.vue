<script setup>
import { watch, ref, computed } from 'vue';

const props = defineProps({
    inputType: {
        type: String,
        default: 'tel',
        validator: (value) => ['number', 'tel', 'letter-numeric', 'password'].includes(value),
    },
    inputmode: {
        type: String,
        default: 'numeric',
    },
    value: {
        type: [String, Number],
        default: ''
    },
    focus: {
        type: Boolean,
    },
})

const emit = defineEmits(["on-change", "on-keydown", "on-paste", "on-focus", "on-blur"]);

const model = ref(props.value || "");
const input = ref(null);

const handleOnChange = () => {
    model.value = model.value.toString();
    if (model.value.length > 1) {
        model.value = model.value.slice(0, 1);
    }
    return emit("on-change", model.value);
};

const isCodeLetter = (charCode) => charCode >= 65 && charCode <= 90;
const isCodeNumeric = (charCode) => (charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105);

// numeric keys and numpad keys
const handleOnKeyDown = (event) => {
    // Only allow characters 0-9, DEL, Backspace, Enter, Right and Left Arrows, and Pasting
    const keyEvent = event || window.event;
    const charCode = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
    if (
        isCodeNumeric(charCode) ||
        (props.inputType === "letter-numeric" && isCodeLetter(charCode)) ||
        [8, 9, 13, 37, 39, 46, 86].includes(charCode)
    ) {
        emit("on-keydown", event);
    } else {
        keyEvent.preventDefault();
    }
};

const handleOnPaste = (event) => emit("on-paste", event);
const handleOnFocus = () => {
    input.value.select();
    return emit("on-focus");
};

const handleOnBlur = () => emit("on-blur");

const inputTypeValue = computed(() => {
    return props.inputType === "letter-numeric" ? "text" : props.inputType
});

watch(
    () => props.value,
    (newValue, oldValue) => {
        if (newValue !== oldValue) {
            model.value = newValue;
        }
    }
);

watch(
    () => props.focus,
    (newFocusValue, oldFocusValue) => {
        // Check if focusedInput changed
        // Prevent calling function if input already in focus
        if (oldFocusValue !== newFocusValue && input.value && props.focus) {
            input.value.focus();
            input.value.select();
        }
    }
);
</script>
<template>
    <input
        ref="input"
        v-model="model"
        :type="inputTypeValue"
        :inputmode="inputmode"
        min="0"
        max="9"
        maxlength="1"
        pattern="[0-9]"
        :class="styles.input"
        @input="handleOnChange"
        @keydown="handleOnKeyDown"
        @paste="handleOnPaste"
        @focus="handleOnFocus"
        @blur="handleOnBlur"
    />
</template>

<style lang="scss" module="styles">
@import './OtpFieldInput.module.scss';
</style>