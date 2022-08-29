import { defineAsyncComponent } from 'vue';

export const defaultLayout = 'DefaultLayout';
// export const assetLayout = 'AssetLayout';
export const authLayout = 'AuthLayout';
// export const emptyLayout = 'EmptyLayout';

export const layouts = {
    [defaultLayout]: defineAsyncComponent(() => import('./Default/DefaultLayout.vue')),
    [authLayout]: defineAsyncComponent(() => import('./Auth/AuthLayout.vue')),
    // [assetLayout]: defineAsyncComponent(() => import('./Asset/AssetLayout.vue')),
   //  [emptyLayout]: defineAsyncComponent(() => import('./Empty/EmptyLayout.vue'))
};