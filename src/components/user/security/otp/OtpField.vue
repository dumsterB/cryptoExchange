<script setup>
// https://github.com/ejirocodes/vue3-otp-input

import { ref } from 'vue';
import OtpFieldInput from './input/OtpFieldInput.vue';

const props = defineProps({
    numInputs: {
        type: Number,
        default: 6
    },
    inputType: {
        type: String,
        default: 'number',
        validator: (value) => ['number', 'tel', 'letter-numeric', 'password'].includes(value),
    },
    inputmode: {
        type: String,
        default: 'numeric',
        validator: (value) => ['numeric', 'text', 'tel', 'none'].includes(value),
    },
})

const emit = defineEmits({
    'on-change': null,
    'on-complete': null
})

const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;

const activeInput = ref(0);
const otp = ref([]);
const oldOtp = ref([]);

const handleOnFocus = (index) => {
    activeInput.value = index;
};

const handleOnBlur = () => {
    activeInput.value = -1;
};

// Helper to return OTP from input
const checkFilledAllInputs = () => {
    if (otp.value.join('').length === props.numInputs) {
        return emit("on-complete", otp.value.join(''));
    }

    return 'Wait until the user enters the required number of characters';
};

// Focus on input by index
const focusInput = (input) => {
    activeInput.value = Math.max(Math.min(props.numInputs - 1, input), 0);
};

// Focus on next input
const focusNextInput = () => {
    focusInput(activeInput.value + 1);
};

// Focus on previous input
const focusPrevInput = () => {
    focusInput(activeInput.value - 1);
};

// Change OTP value at focused input
const changeCodeAtFocus = (value) => {
    oldOtp.value = Object.assign([], otp.value);
    otp.value[activeInput.value] = value;

    if (oldOtp.value.join('') !== otp.value.join('')) {
        emit('on-change', otp.value.join(''));
        checkFilledAllInputs();
    }
};

// Handle pasted OTP
const handleOnPaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData
        .getData('text/plain')
        .slice(0, props.numInputs - activeInput.value)
        .split('');
    if (props.inputType === 'number' && !pastedData.join('').match(/^\d+$/)) {
        return 'Invalid pasted data';
    }
    if (props.inputType === 'letter-numeric' && !pastedData.join('').match(/^\w+$/)) {
        return 'Invalid pasted data';
    }
    // Paste data from focused input onwards
    const currentCharsInOtp = otp.value.slice(0, activeInput.value);
    const combinedWithPastedData = currentCharsInOtp.concat(pastedData);
    combinedWithPastedData
        .slice(0, props.numInputs)
        .forEach(function (value, i) {
            otp.value[i] = value;
        });
    focusInput(combinedWithPastedData.slice(0, props.numInputs).length);
    return checkFilledAllInputs();
};

const handleOnChange = (value) => {
    changeCodeAtFocus(value);
    focusNextInput();
};

const clearInput = () => {
    if (otp.value.length > 0) {
        emit("on-change", "");
    }
    otp.value = [];
    activeInput.value = 0;
};

// Handle cases of backspace, delete, left arrow, right arrow
const handleOnKeyDown = (event) => {
    switch (event.keyCode) {
    case BACKSPACE:
        event.preventDefault();
        changeCodeAtFocus('');
        focusPrevInput();
        break;
    case DELETE:
        event.preventDefault();
        changeCodeAtFocus('');
        break;
    case LEFT_ARROW:
        event.preventDefault();
        focusPrevInput();
        break;
    case RIGHT_ARROW:
        event.preventDefault();
        focusNextInput();
        break;
    default:
        break;
    }
}

defineExpose({ reset: clearInput })
</script>

<template>
    <div :class="styles.field">

        <OtpFieldInput
            v-for="(_, i) in numInputs"
            :key="i"
            :focus="activeInput === i"
            :value="otp[i]"
            :input-type="inputType"
            :inputmode="inputmode"
            @on-change="handleOnChange"
            @on-keydown="handleOnKeyDown"
            @on-paste="handleOnPaste"
            @on-focus="handleOnFocus(i)"
            @on-blur="handleOnBlur"
        />
        
    </div>
</template>

<style lang="scss" module="styles">
@import './OtpField.module.scss';
</style>