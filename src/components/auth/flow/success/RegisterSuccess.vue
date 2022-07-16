<script setup>
import VIcon from '@/components/common/icon/VIcon.vue';
import { useI18n } from 'vue-i18n';
import VButton from '@/components/common/button/VButton.vue';

const { t } = useI18n();
</script>

<template>
    <Transition
        appear
        :enter-to-class="styles.animEnterTo"
        :enter-from-class="styles.animEnterFrom"
        :enter-active-class="styles.animEnterActive"
        :duration="{ enter: 800, leave: 0 }"
    >
        <div :class="styles.container">
            <div :class="styles.content">
            
                <div :class="styles.visual">
                    <div :class="[styles.visualStar, styles.visualStarXs]">
                        <VIcon name="star-xs" />
                    </div>

                    <div :class="[styles.visualStar, styles.visualStarS]">
                        <VIcon name="star-s" />
                    </div>

                    <div :class="[styles.visualStar, styles.visualStarM]">
                        <VIcon name="star-m" />
                    </div>
                
                    <div :class="styles.visualCheck">
                        <VIcon name="check-l" />
                    </div>
                </div>

                <div :class="styles.title">
                    {{ t('registerCompleted') }}
                </div>

                <div :class="styles.description">
                    {{ t('registerCompletedInfo') }}
                </div>

                <VButton
                    size="s"
                    to="/"
                >
                    {{ t('button.start') }}
                </VButton>
            
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" module="styles">
@import './RegisterSuccess.module.scss';
</style>