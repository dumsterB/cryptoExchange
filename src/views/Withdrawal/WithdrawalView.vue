<script setup>
import { computed, ref, } from 'vue';
import { VInput, VSpin, VIcon, VButton } from '@/uikit';
import {RouterView} from "vue-router";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router/dist/vue-router";
const router = useRouter();
const { t } = useI18n();
const isActive = ref(false)

const toggleHandler = value => {
  isActive.value = value;
  router.push(value ? '/withdraw/fiat' : '/withdraw/token');
};
</script>

<template>
  <div :class="styles.withdraw">
     <div :class="styles.toggle">
       <button @click="toggleHandler(false)" :class=" isActive ? styles.toggleButtonActive: styles.toggleButton">{{ t('to_card') }}</button>
       <button @click="toggleHandler(true)" :class=" isActive ? styles.toggleButton: styles.toggleButtonActive">{{ t('to_wallet') }}</button>
     </div>
     <div :class="styles.sumContent">
        <p :class="styles.totalSum">12 456.12 <span :class="styles.usdt">USDT</span></p>
        <p :class="styles.totalSum2">≈ $ 12 455.43</p>
     </div>
     <hr :class="styles.divider">
     <RouterView></RouterView>
  </div>
</template>

<style lang="scss" module="styles">
@import './WithdrawalView.module.scss';
</style>