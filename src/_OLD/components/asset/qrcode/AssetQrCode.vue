<script setup>
import { ref } from 'vue';
import { createQRCode } from '@/services/qrcode/create';

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

const create = () => createQRCode(canvas.value, {
    text: props.address,
    imageSrc: props.logo
});

defineExpose({
    create
});
</script>

<template>
    <div :class="styles.qrCode">

        <canvas ref="canvas" />

    </div>
</template>

<style lang="scss" module="styles">
@import './AssetQrCode.module.scss';
</style>