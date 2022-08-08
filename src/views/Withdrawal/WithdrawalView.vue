<script setup>
import { VButton } from '@/uikit';
import { VIcon } from '@/uikit';
import { VSpin } from '@/uikit';
import { VInput } from '@/uikit';
import { VToggleButton, VToggleButtonGroup } from '@/uikit';
</script>

<template>
  <div class="withdraw">
    <VToggleButtonGroup cols="2">
      <VToggleButton>
        1
      </VToggleButton>
      <VToggleButton>
        2
      </VToggleButton>
    </VToggleButtonGroup>
  </div>
</template>

<style lang="scss" module="styles">
@import './WithdrawalView.module.scss';
</style>