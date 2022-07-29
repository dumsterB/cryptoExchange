<script setup>
import { computed, ref } from 'vue';
import AuthWrap from '@/components/auth/wrap/AuthWrap.vue';
import PasswordInput from '@/components/user/security/password/PasswordInput.vue';
import PhoneInput from '@/components/user/security/phone/PhoneInput.vue';
import VButton from '@/2v/shared/components/common/button/VButton.vue';
import VInput from '@/2v/shared/components/common/input/VInput.vue';
import VCheckbox from '@/2v/shared/components/common/checkbox/VCheckbox.vue';
import { useI18n } from 'vue-i18n';
import { useRegisterForm } from '@/hooks/forms/useRegisterForm';

const { t } = useI18n(); 

const {
    register,
    isLoading,
    email,
    emailError,
    phone,
    phoneError,
    phoneCountry,
    password,
    passwordError,
    passwordConfirm,
    passwordConfirmError
} = useRegisterForm();

const termsAgree = ref(true);
const policyAgree = ref(true);

const isButtonDisabled = computed(() => {
    return !termsAgree.value || !policyAgree.value;
});

const buttonText = computed(() => {
    return isButtonDisabled.value
        ? t('confirmAgree')
        : t('button.continue');
});
</script>

<template>
    <AuthWrap action="register">
        <template #title>
            {{ t('register') }}
        </template>

        <template #content>
            <div :class="styles.fields">
                <VInput
                    v-model="email"
                    type="email"
                    :label="t('email')"
                    :error="emailError"
                    :class="styles.fieldsInput"
                />
                    
                <PhoneInput
                    v-model="phone"
                    :country="phoneCountry"
                    :placeholder="t('phone')"
                    :error="phoneError"
                    :class="styles.fieldsInput"
                />

                <PasswordInput
                    v-model="password"
                    :label="t('password')"
                    :error="passwordError"
                    :class="styles.fieldsInput"
                />

                <PasswordInput
                    v-model="passwordConfirm"
                    :label="t('passwordConfirm')"
                    :error="passwordConfirmError"
                    :class="styles.fieldsInput"
                />
            </div>

            <VButton
                size="s"
                block
                :loading="isLoading"
                :disabled="isButtonDisabled"
                :class="styles.button"
                @click="register"
            >
                {{ buttonText }}
            </VButton>

            <div :class="styles.checkboxes">
                <!-- TODO: real urls -->
                <VCheckbox v-model="termsAgree">
                    {{ t('alreadyKnow') }} <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >{{ t('termsOfUse') }}</a>
                </VCheckbox>

                <VCheckbox v-model="policyAgree">
                    {{ t('alreadyKnow') }} <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >{{ t('privacyPolicy') }}</a>
                </VCheckbox>
            </div>
        </template>
    </AuthWrap>
</template>

<style lang="scss" module="styles">
@import './RegisterView.module.scss';
</style>