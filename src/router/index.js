import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import { loadLayoutMiddleware } from '@/router/middleware/layout'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/swap',
            name: 'swap',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/SwapView.vue')
        },
        {
            path: '/deposit',
            name: 'deposit',
            component: () => import('../views/DepositView.vue')
        },
        {
            path: '/withdrawal',
            name: 'withdrawal',
            component: () => import('../views/WithdrawalView.vue')
        }
    ]
});

router.beforeEach(loadLayoutMiddleware);

export default router;