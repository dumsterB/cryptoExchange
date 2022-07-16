<script setup>
import { computed, ref } from 'vue';
import AppPopup from '@/components/popup/AppPopup.vue';
import OtpField from '@/components/user/security/otp/OtpField.vue';
import VButton from '@/components/common/button/VButton.vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import { useI18n } from 'vue-i18n';
import { usePopup } from '@/hooks/helpers/usePopup';
import { useTimer } from '@/hooks/helpers/useTimer';
import { OTP_CODE_SEND_INTERVAL_SECONDS } from '@/config';

defineProps({
    error: Boolean,
    loading: Boolean
});

const emit = defineEmits({
    'send': null,
    'submit': null
});

const { t } = useI18n();

const {
    isPopupOpen,
    openPopup,
    closePopup
} = usePopup();

const {
    timer,
    startTimer
} = useTimer(OTP_CODE_SEND_INTERVAL_SECONDS);

const canSend = ref(true);

const sendCode = () => {
    if (canSend.value) {
        emit('send', () => {
            startTimer(
                () => canSend.value = false,
                () => canSend.value = true
            );
        });
    }
};

const submitCode = code => {
    emit('submit', code);
};

const isButtonDisabled = computed(() => {
    return !canSend.value;
});

const buttonText = computed(() => {
    return canSend.value
        ? t('sendOtp')
        : t('sendAvailableOn', { count: timer.value });
});
</script>

<template>
    <div :class="styles.wrap">
        <div :class="styles.field">
            <OtpField
                :error="error"
                @on-complete="submitCode"
            />

            <div
                v-if="error"
                :class="styles.error"
            >
                {{ t('errors.invalidOtpCode') }}
            </div>
        </div>

        <VButton
            size="s"
            block
            :loading="loading"
            :disabled="isButtonDisabled"
            @click="sendCode"
        >
            {{ buttonText }}
        </VButton>

        <div
            :class="styles.instruction"
            @click="openPopup"
        >
            {{ t('haveYouGotOtp') }}
        </div>

        <AppPopup v-model="isPopupOpen">
            <div :class="styles.popup">
                <div :class="styles.popupHead">
                    <div :class="styles.popupIcon">
                        <VIcon name="delete-email" />
                    </div>

                    <div :class="styles.popupTitle">
                        {{ t('haveYouGotOtp') }}
                    </div>
                </div>

                <div :class="styles.popupBody">
                    <slot name="instruction" />
                </div>

                <div :class="styles.popupFooter">
                    <VButton
                        size="s"
                        :class="styles.popupButton"
                        @click="closePopup"
                    >
                        {{ t('button.ok') }}
                    </VButton>
                </div>
            </div>
        </AppPopup>
    </div>
</template>

<style lang="scss" module="styles">
@import './OptConfirm.module.scss';
</style>