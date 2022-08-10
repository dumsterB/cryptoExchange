<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router/dist/vue-router";
const router = useRouter();
const { t } = useI18n();
const isActive = ref(false);

const toggleHandler = (value) => {
  isActive.value = value;
  router.push(value ? "/withdraw/fiat" : "/withdraw/token");
};
</script>

<template>
  <div :class="styles.withdraw">
    <div :class="styles.toggle">
      <button
        :class="isActive ? styles.toggleButtonActive : styles.toggleButton"
        @click="toggleHandler(false)"
      >
        {{ t("to_card") }}
      </button>
      <button
        :class="isActive ? styles.toggleButton : styles.toggleButtonActive"
        @click="toggleHandler(true)"
      >
        {{ t("to_wallet") }}
      </button>
    </div>
    <div :class="styles.sumContent">
      <p :class="styles.totalSum">
        12 456.12 <span :class="styles.usdt">USDT</span>
      </p>
      <p :class="styles.totalSum2">≈ $ 12 455.43</p>
    </div>
    <hr :class="styles.divider" />
    <RouterView />
  </div>
</template>

<style lang="scss" module="styles">
@import "./WithdrawalView.module.scss";
</style>
