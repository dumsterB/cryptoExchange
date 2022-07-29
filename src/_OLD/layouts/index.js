import { defineAsyncComponent } from 'vue';

export const DEFAULT_LAYOUT = 'DefaultLayout';

export const AUTH_LAYOUT = 'AuthLayout';

export const ASSET_LAYOUT = 'AssetLayout';

export const EMPTY_LAYOUT = 'EmptyLayout';

export const LAYOUTS = {
    [DEFAULT_LAYOUT]: defineAsyncComponent(() => import('./default/DefaultLayout.vue')),
    [AUTH_LAYOUT]: defineAsyncComponent(() => import('./auth/AuthLayout.vue')),
    [ASSET_LAYOUT]: defineAsyncComponent(() => import('./asset/AssetLayout.vue')),
    [EMPTY_LAYOUT]: defineAsyncComponent(() => import('./empty/EmptyLayout.vue'))
};