import { ASSET_LAYOUT, AUTH_LAYOUT, DEFAULT_LAYOUT, EMPTY_LAYOUT } from '@/layouts';
import { checkAccess } from '@/services/auth/access';
import { ls } from '@/utils/localStorage';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home/HomeView.vue';
// import { loadLayoutMiddleware } from '@/router/middleware/layout'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                layout: DEFAULT_LAYOUT
            }
        },
        {
            path: '/swap',
            name: 'swap',
            meta: {
                layout: DEFAULT_LAYOUT
            },
            component: () => import('../views/SwapView.vue'),
        },
        {
            path: '/deposit',
            redirect: () => ({ path: '/deposit/fiat' })
        },
        {
            path: '/deposit/:type',
            meta: {
                layout: DEFAULT_LAYOUT
            },
            component: () => import('../2v/views/deposit/DepositView.vue')
        },
        {
            path: '/withdrawal',
            redirect: () => ({ path: '/withdrawal/bitcoin' })
        },
        {
            path: '/withdrawal/:asset',
            name: 'withdrawal',
            meta: {
                layout: DEFAULT_LAYOUT
            },
            component: () => import('../views/WithdrawalView.vue')
        },
        {
            path: '/explore/:asset',
            name: 'exploreAsset',
            meta: {
                layout: ASSET_LAYOUT
            },
            component: () => import('../views/explore/asset/AssetView.vue')
        },
        {
            path: '/register',
            name: 'register',
            meta: {
                layout: AUTH_LAYOUT
            },
            component: () => import('../views/auth/register/RegisterView.vue')
        },
        {
            path: '/register/flow',
            name: 'registerFlow',
            meta: {
                layout: AUTH_LAYOUT
            },
            component: () => import('../views/auth/register/flow/RegisterFlowView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                layout: AUTH_LAYOUT
            },
            component: () => import('../views/auth/login/LoginView.vue'),
        },
        {
            path: '/kyc',
            name: 'kyc',
            meta: {
                layout: EMPTY_LAYOUT
            },
            component: () => import('../2v/views/kyc/KycView.vue')
        },
        {
            path: '/affiliate',
            name: 'affiliate',
            meta: {
                layout: DEFAULT_LAYOUT
            },
            component: () => import('../2v/views/affiliate/AffiliateView.vue')
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
    if (to.query.ref) {
        ls.set(
            'ref-code',
            to.query.ref
        );
    }

    if (!allowed && redirectUrl) {
        return redirectUrl;
    }
});

export default router;