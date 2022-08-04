import { createRouter, createWebHistory } from 'vue-router';
import { defaultLayout, authLayout } from '@/components/Layouts';
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
        // {
        //     path: '/kyc',
        //     name: 'kyc',
        //     meta: {
        //         layout: EMPTY_LAYOUT
        //     },
        //     component: () => import('../2v/views/kyc/KycView.vue')
        // },
        {
            path: '/explore/:token',
            name: 'exploreToken',
            meta: {
                layout: defaultLayout
            },
            component: () => import('../../views/Explore/Token/TokenView.vue')
        },
        // {
        //     path: '/affiliate',
        //     name: 'affiliate',
        //     meta: {
        //         layout: DEFAULT_LAYOUT
        //     },
        //     component: () => import('../2v/views/affiliate/AffiliateView.vue')
        // },
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