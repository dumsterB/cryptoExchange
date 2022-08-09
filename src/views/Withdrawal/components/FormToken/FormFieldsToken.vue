<script setup>
import { computed, ref, } from 'vue';
import { VInput, VSpin, VIcon, VButton } from '@/uikit';
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router/dist/vue-router";
const router = useRouter();
const { t } = useI18n();

</script>
<template>
  <div :class="styles.formFiat">
    <div :class="styles.sumContent">
      <p>{{t('sum')}}</p>
      <button :class="styles.limit">{{t('limit')}}</button>
    </div>
    <VInput :class="styles.field" :placeholder="t('enterSum')"></VInput>
    <br>
    <p>{{t('numberCard')}}</p>
    <VInput :class="styles.field" placeholder="000 000 000 000"></VInput>
    <br>
    <div :class="styles.content">
     <p class="text-grey">{{ t('commission') }}</p>
     <span>$ 1.0</span>
    </div>
    <div :class="styles.content">
      <p class="text-grey">{{ t('commission2') }}</p>
      <span>2 %</span>
    </div>
    <br>
    <div :class="styles.content">
      <span>
        <p class="text-grey">{{ t('commission2') }}</p>
        <p :class="styles.commission">0.0</p>
      </span>
      <VButton>{{t('confirm')}}</VButton>
    </div>
  </div>
</template>


<style lang="scss" module="styles">
@import './FormFieldsToken.module.scss';
</style>