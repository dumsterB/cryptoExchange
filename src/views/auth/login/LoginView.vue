<script setup>
import AuthWrap from '@/components/auth/wrap/AuthWrap.vue';
import PasswordInput from '@/components/user/security/password/PasswordInput.vue';
import VInput from '@/components/common/input/VInput.vue';
import VButton from '@/components/common/button/VButton.vue';
import { useI18n } from 'vue-i18n';
import { useLoginForm } from '@/hooks/forms/useLoginForm';

const { t } = useI18n();

const {
    isLoading,
    login,
    email,
    emailError,
    password,
    passwordError
} = useLoginForm('email');
</script>

<template>
    <AuthWrap action="login">
        <template #title>
            {{ t('welcomeBack') }}
        </template>

        <template #content>
            <div :class="styles.fields">
                <!-- TODO: switcher for email or phone -->
                <VInput
                    v-model="email"
                    type="email"
                    :label="t('email')"
                    :error="emailError"
                    :class="styles.fieldsInput"
                />

                <PasswordInput
                    v-model="password"
                    :label="t('password')"
                    :error="passwordError"
                    :class="styles.fieldsInput"
                />

                <!-- TODO: password reset -->
                <!-- <div :class="styles.forgotPassword">
                    <RouterLink
                        to="/reset-password"
                        :class="styles.forgotPasswordLink"
                    >
                        {{ t('forgotPassword') }}
                    </RouterLink>
                </div> -->
            </div>

            <VButton
                size="s"
                block
                :loading="isLoading"
                @click="login"
            >
                {{ t('login') }}
            </VButton>
        </template>

    </AuthWrap>
</template>

<style lang="scss" module="styles">
@import './LoginView.module.scss';
</style>