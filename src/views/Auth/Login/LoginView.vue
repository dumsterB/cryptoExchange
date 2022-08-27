<script setup>
import { VButton, VInput, VPasswordInput } from '@/uikit';
import AuthPage from '../components/AuthPage/AuthPage.vue';
import { useI18n } from 'vue-i18n';
import { useLoginForm } from './hooks/useLoginForm';

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
    <AuthPage action="login">
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

                <VPasswordInput
                    v-model="password"
                    :label="t('password')"
                    :error="passwordError"
                    :class="styles.fieldsInput"
                />

                <div :class="styles.forgotPassword">
                    <RouterLink
                        to="/reset-password"
                        :class="styles.forgotPasswordLink"
                    >
                        {{ t('dontRememberPassword') }}
                    </RouterLink>
                </div>
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

    </AuthPage>
</template>

<style lang="scss" module="styles">
@import './LoginView.module.scss';
</style>