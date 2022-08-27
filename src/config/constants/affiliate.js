export const REFERRAL_CODE_KEY = 'ref';

export const LEVEL_COLORS = {
    [1]: {
        fill: 'var(--affiliate-level-first-fill-color)',
        typo: 'var(--affiliate-level-first-typo-color)',
        stroke: 'var(--affiliate-level-first-stroke-color)'
    },
    [2]: {
        fill: 'var(--affiliate-level-second-fill-color)',
        typo: 'var(--affiliate-level-second-typo-color)',
        stroke: 'var(--affiliate-level-second-stroke-color)'
    },
    [3]: {
        fill: 'var(--affiliate-level-third-fill-color)',
        typo: 'var(--affiliate-level-third-typo-color)',
        stroke: 'var(--affiliate-level-third-stroke-color)'
    }
};

export const SHARE_BUTTONS = {
    twitter: 'twitter',
    facebook: 'facebook',
    reddit: 'reddit',
    whatsapp: 'whatsapp',
    telegram: 'telegram'
};

export const SHARE_BUTTONS_LIST = Object.values(SHARE_BUTTONS);