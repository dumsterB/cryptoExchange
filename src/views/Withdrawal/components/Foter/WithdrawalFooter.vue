<template>
    <div :class="styles.action">
        <slot name="fees"></slot>
        <slot name="submit"></slot>
    </div>
</template>

<style lang="scss" module="styles">
@import './WithdrawalFooter.scss';
</style>