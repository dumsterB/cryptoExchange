<script setup>
import { computed, ref } from 'vue';
import { VButton, VCheckbox, VInput, VPasswordInput } from '@/uikit';
import { PhoneInput } from '@/components/User';
import AuthPage from '../components/AuthPage/AuthPage.vue';
import { useI18n } from 'vue-i18n';
import { useRegisterForm } from './hooks/useRegisterForm';

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

const isButtonDisabled = computed(
    () => !termsAgree.value || !policyAgree.value
);

const buttonText = computed(() => isButtonDisabled.value
    ? t('confirmAgree')
    : t('button.continue'));
</script>

<template>
    <AuthPage action="register">
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

                <VPasswordInput
                    v-model="password"
                    :label="t('password')"
                    :error="passwordError"
                    :class="styles.fieldsInput"
                />

                <VPasswordInput
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
                    >
                        {{ t('termsOfUse') }}
                    </a>
                </VCheckbox>

                <VCheckbox v-model="policyAgree">
                    {{ t('alreadyKnow') }} <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {{ t('privacyPolicy') }}
                    </a>
                </VCheckbox>
            </div>
        </template>
    </AuthPage>
</template>

<style lang="scss" module="styles">
@import './RegisterView.module.scss';
</style>