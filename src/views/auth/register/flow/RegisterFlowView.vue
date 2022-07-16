<script setup>
import { computed, reactive, ref, watchEffect } from 'vue';
import AuthStep from '@/components/auth/step/AuthStep.vue';
import RegisterSuccess from '@/components/auth/flow/success/RegisterSuccess.vue';
import OtpConfirm from '@/components/auth/flow/otp/confirm/OtpConfirm.vue';
import OtpSuccess from '@/components/auth/flow/otp/success/OtpSuccess.vue';
import PersonalInfo from '@/components/auth/flow/personal/PersonalInfo.vue';
import VButton from '@/components/common/button/VButton.vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import { useI18n } from 'vue-i18n';
import { useEmailOtpConfirm, usePhoneOtpConfirm } from '@/services/auth/register/waitList';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();

// steps
const EMAIL_CONFIRM_STEP = 1;
const EMAIL_CONFIRM_SUCCESS_STEP = 2;
const PHONE_CONFIRM_STEP = 3;
const PHONE_CONFIRM_SUCCESS_STEP = 4;
const PERSONAL_INFO_STEP = 5;

const TITLES = {
    [EMAIL_CONFIRM_STEP]: t('emailConfirmation'),
    [EMAIL_CONFIRM_SUCCESS_STEP]: t('emailConfirmed'),
    [PHONE_CONFIRM_STEP]: t('phoneConfirmation'),
    [PHONE_CONFIRM_SUCCESS_STEP]: t('phoneConfirmed'),
    [PERSONAL_INFO_STEP]: t('personInfo')
};

// TODO: real recipient & validity
const DESCRIPTIONS = {
    [EMAIL_CONFIRM_STEP]: t('otpConfirmationNote', { recipient: 'email', validity: 60 }),
    [EMAIL_CONFIRM_SUCCESS_STEP]: t('registerContinueAvailable'),
    [PHONE_CONFIRM_STEP]: t('otpConfirmationNote', { recipient: 'телефон', validity: 60 }),
    [PHONE_CONFIRM_SUCCESS_STEP]: t('registerContinueAvailable'),
};

const route = useRoute();
const router = useRouter();

const state = reactive({
    step: parseInt(route.query.step) || EMAIL_CONFIRM_STEP,
    registerCompleted: false
});

// TODO: maybe save in local storage
watchEffect(() => {
    if (state.step > EMAIL_CONFIRM_STEP) {
        router.push({
            query: {
                step: state.step
            }
        });
    }
});

const visibleBlocks = computed(() => {
    const { step } = state;

    const email = step === EMAIL_CONFIRM_STEP;
    const phone = step === PHONE_CONFIRM_STEP;
    const personal = step === PERSONAL_INFO_STEP;
    const otpSuccess = [EMAIL_CONFIRM_SUCCESS_STEP, PHONE_CONFIRM_SUCCESS_STEP].includes(step);

    return {
        personal,
        email,
        phone,
        otpSuccess,
        form: email || phone || personal,
        footer: personal
    };
});

const navButtonState = ([ first, second ]) => {
    const { step } = state;

    return {
        active: first === step,
        completed: second <= step
    };
};

const skipOtpSuccess = () => state.step++;
const finishRegister = () => state.registerCompleted = true;

const emailOtp = useEmailOtpConfirm();
const phoneOtp = usePhoneOtpConfirm();

const personalInfoForm = ref(null);
const isPersonalInfoSaving = ref(false);

const savePersonalInfo = () => personalInfoForm.value.save();
</script>

<template>
    <div
        v-if="!state.registerCompleted"
        :class="styles.wrap"
    >

        <div :class="styles.head">
            <AuthStep v-bind="navButtonState([EMAIL_CONFIRM_STEP, EMAIL_CONFIRM_SUCCESS_STEP])">
                {{ t('emailConfirmation') }}
            </AuthStep>
            
            <AuthStep v-bind="navButtonState([PHONE_CONFIRM_STEP, PHONE_CONFIRM_SUCCESS_STEP])">
                {{ t('phoneConfirmation') }}
            </AuthStep>

            <AuthStep v-bind="navButtonState([PERSONAL_INFO_STEP])">
                {{ t('personInfo') }}
            </AuthStep>
        </div>

        <div :class="styles.body">
            <OtpSuccess
                v-if="visibleBlocks.otpSuccess"
                @skip="skipOtpSuccess"
            >
                <template #icon>
                    <VIcon name="check-email" />
                </template>

                <template #title>
                    {{ TITLES[state.step] }}
                </template>

                <template #description>
                    {{ DESCRIPTIONS[state.step] }}
                </template>
            </OtpSuccess>

            <div
                v-if="visibleBlocks.form"
                :class="styles.form"
            >
                <div :class="styles.formHead">
                    <div :class="styles.formTitle">
                        {{ TITLES[state.step] }}
                    </div>

                    <div
                        v-if="DESCRIPTIONS[state.step]"
                        :class="styles.formDescription"
                    >
                        {{ DESCRIPTIONS[state.step] }}
                    </div>
                </div>

                <OtpConfirm
                    v-if="visibleBlocks.email"
                    :error="emailOtp.state.error"
                    :loading="emailOtp.state.loading"
                    @send="emailOtp.send"
                    @submit="code => emailOtp.submit(code, () => state.step++)"
                >
                    <template #instruction>
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <p v-html="t('emailConfirmationInstruction')" />
                    </template>
                </OtpConfirm>

                <OtpConfirm
                    v-if="visibleBlocks.phone"
                    :error="phoneOtp.state.error"
                    :loading="phoneOtp.state.loading"
                    @send="phoneOtp.send"
                    @submit="code => phoneOtp.submit(code, () => state.step++)"
                >
                    <template #instruction>
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <p v-html="t('phoneConfirmationInstruction')" />
                    </template>
                </OtpConfirm>

                <PersonalInfo
                    v-if="visibleBlocks.personal"
                    ref="personalInfoForm"
                    v-model:loading="isPersonalInfoSaving"
                    @completed="finishRegister"
                />
            </div>

        </div>

        <div
            v-if="visibleBlocks.footer"
            :class="styles.footer"
        >
            <VButton
                size="m"
                block
                :class="styles.button"
                :loading="isPersonalInfoSaving"
                @click="savePersonalInfo"
            >
                {{ t('button.continue') }}
            </VButton>
        </div>
    </div>

    <RegisterSuccess v-else />
</template>

<style lang="scss" module="styles">
@import './RegisterFlowView.module.scss';
</style>