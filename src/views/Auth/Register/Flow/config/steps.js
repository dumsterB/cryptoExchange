import { OTP_CODE_TTL } from '@/config/constants/auth';

export const steps = t => ({
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
        description: t('otpConfirmationNote', { recipient: 'телефон', validity: OTP_CODE_TTL / 60 }) // 60 seconds
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