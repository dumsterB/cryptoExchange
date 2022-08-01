export const navLinks = (t, { buyButton = false } = {}) => {
    const links = [
        {
            url: '/',
            icon: 'house',
            text: t('house')
        },
        {
            url: '/swap',
            icon: 'swap',
            text: t('swap')
        },
        {
            url: '/deposit',
            icon: 'deposit',
            text: t('deposit')
        },
        {
            url: '/withdrawal',
            icon: 'withdrawal',
            text: t('withdrawal')
        }
    ];

    // TODO: real url
    if (buyButton) {
        links.push({
            url: '/buy-usdt',
            icon: 'usdt',
            text: t('buyItem', { item: 'usdt' })
        });
    }

    return links;
};

// TODO: real urls
export const userLinks = (t, isUserVerified, closeMenu) => {
    const links = [
        // {
        //     url: '/settings',
        //     icon: 'edit',
        //     text: t('editName'),
        //     onClick: () => closeMenu()
        // },
        {
            url: '/affiliate',
            icon: 'affiliate',
            text: t('affiliateProgram'),
            onClick: () => closeMenu()
        }
    ];

    if (isUserVerified) {
        links.unshift( {
            url: '/kyc',
            icon: 'verification',
            text: t('verification'),
            onClick: () => closeMenu()
        });
    }

    return links;
};