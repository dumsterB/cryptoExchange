import { createRouter, createWebHistory } from 'vue-router';
import { defaultLayout, authLayout, emptyLayout } from '@/components/Layouts';
import HomeView from '@/views/Home/HomeView.vue';
import checkAccess from '@/states/user/services/checkAccess';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                layout: defaultLayout
            }
        },
        // {
        //     path: '/swap',
        //     name: 'swap',
        //     meta: {
        //         layout: DEFAULT_LAYOUT
        //     },
        //     component: () => import('../views/SwapView.vue'),
        // },
        // {
        //     path: '/deposit',
        //     redirect: () => ({ path: '/deposit/fiat' })
        // },
        // {
        //     path: '/deposit/:type',
        //     meta: {
        //         layout: DEFAULT_LAYOUT
        //     },
        //     component: () => import('../2v/views/deposit/DepositView.vue')
        // },
        // {
        //     path: '/withdrawal',
        //     redirect: () => ({ path: '/withdrawal/bitcoin' })
        // },
        // {
        //     path: '/withdrawal/:asset',
        //     name: 'withdrawal',
        //     meta: {
        //         layout: DEFAULT_LAYOUT
        //     },
        //     component: () => import('../views/WithdrawalView.vue')
        // },
        {
            path: '/login',
            name: 'login',
            meta: {
                layout: authLayout
            },
            component: () => import('../../views/Auth/Login/LoginView.vue'),
        },
        {
            path: '/register',
            name: 'register',
            meta: {
                layout: authLayout
            },
            component: () => import('../../views/Auth/Register/RegisterView.vue'),
        },
        {
            path: '/register/flow',
            name: 'registerFlow',
            meta: {
                layout: authLayout
            },
            component: () => import('../../views/Auth/Register/Flow/RegisterFlowView.vue'),
        },
        {
            path: '/reset-password',
            name: 'resetPassword',
            meta: {
                layout: authLayout
            },
            component: () => import('../../views/Auth/ResetPassword/ResetPasswordView.vue')
        },
        {
            path: '/explore/:token',
            name: 'exploreToken',
            meta: {
                layout: defaultLayout,
                headerMobileAddon: () => import('../../views/Explore/Token/components/ChartButton/ChartButton')
            },
            component: () => import('../../views/Explore/Token/TokenView.vue')
        },
        {
            path: '/deposit',
            name: 'deposit',
            meta: {
                layout: defaultLayout
            },
            redirect: () => '/deposit/fiat',
            component: () => import('../../views/Deposit/DepositView.vue'),
            children: [
                {
                    path: '/deposit/token',
                    component: () => import('../../views/Deposit/Token/DepositTokenView.vue')
                },
                {
                    path: '/deposit/fiat',
                    component: () => import('../../views/Deposit/Fiat/DepositFiatView.vue')
                }
            ]
        },
        {
            path: '/kyc',
            name: 'kyc',
            meta: {
                layout: emptyLayout
            },
            component: () => import('../../views/Kyc/KycView.vue')
        },
        {
            path: '/affiliate',
            name: 'affiliate',
            meta: {
                layout: defaultLayout
            },
            component: () => import('../../views/Affiliate/AffiliateView.vue')
        },
    ]
});

const AUTH_PAGES = [
    '/login',
    '/register',
    '/register/flow',
    '/reset-password'
];

router.beforeEach(async to => {
    const { allowed, redirectUrl = '' } = await checkAccess(
        to.path,
        AUTH_PAGES
    );

    // TODO: fix ref code saving
    // if (to.query.ref) {
    //     ls.set(
    //         'ref-code',
    //         to.query.ref
    //     );
    // }

    if (!allowed && redirectUrl) {
        return redirectUrl;
    }
});

export default router;