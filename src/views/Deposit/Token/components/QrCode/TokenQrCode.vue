<script setup>
import { ref, watchEffect } from 'vue';
import { drawQrCode } from './utils';

const props = defineProps({
    logo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const canvas = ref(null);
const isQrCodeVisible = ref(false);

// draw qr code
watchEffect(() => {
    if (canvas.value && !isQrCodeVisible.value) {
        drawQrCode(canvas.value, {
            text: props.address,
            imageSrc: props.logo
        });

        isQrCodeVisible.value = true;
    }
});
</script>

<template>
    <div :class="styles.qrCode">

        <canvas ref="canvas" />

    </div>
</template>

<style lang="scss" module="styles">
@import './TokenQrCode.module.scss';
</style>