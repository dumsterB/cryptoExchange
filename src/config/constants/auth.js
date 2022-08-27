export const PHONE_MAX_LENGTH = 13;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 32;

export const OPT_CODE_SEND_INTERVAl = 60; // 60 seconds
export const OTP_CODE_TTL = 300; // 300 seconds || 5 mins

export const registerFlowSteps = t => ({
    emailConfirm: {
        key: 1,
        title: t('emailConfirmation'),
        description: t('otpConfirmationNote', { recipient: 'email', validity: OTP_CODE_TTL / 60 }) // 60 seconds
    },
    emailConfirmSuccess: {
        key: 2,
        title: t('emailConfirmed'),
        description: t('registerContinueAvailable')
    },
    phoneConfirm: {
        key: 3,
        title: t('phoneConfirmation'),
        // TODO: fix russian word ->
        description: t('otpConfirmationNote', { recipient: t('phone').toLowerCase(), validity: OTP_CODE_TTL / 60 }) // 60 seconds
    },
    phoneConfirmSuccess: {
        key: 4,
        title: t('phoneConfirmed'),
        description: t('registerContinueAvailable'),
    },
    personalInfo: {
        key: 5,
        title: t('personInfo'),
        description: null
    }
});

export const resetPasswordSteps = t => ({
    emailEnter: {
        key: 1,
        icon: 'password',
        title: t('forgotPassword'),
        description: t('enterEmailForResetPassword')
    },
    otpConfirm: {
        key: 2,
        icon: 'email',
        title: t('enterCodeFromEmail'),
        description: t('resetPasswordCodeSent')
    },
    newPassword: {
        key: 3,
        icon: 'password',
        title: t('enterNewPassword'),
        description: null
    }
});