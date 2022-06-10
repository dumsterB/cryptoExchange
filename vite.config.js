import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader({
            svgo: false
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url))
        }
    },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly'  
        },
        preprocessorOptions: {
            scss: {
                additionalData: `@import '@/assets/scss/abstracts/abstracts.scss';`
            }
        }
    }
})


// Version with index.html transform
// import { fileURLToPath, URL } from 'url'

// import { defineConfig, loadEnv } from 'vite'
// import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//     const env = loadEnv(mode, fileURLToPath(new URL('./', import.meta.url)));

//     const htmlPlugin = () => {
//         return {
//             name: 'html-transform',
//             transformIndexHtml(html) {
//                 return html.replace(/{{(.*?)}}/g, (_, p1) => env[p1]);
//             },
//         };
//     };

//     return {
//         plugins: [
//             vue(),
//             htmlPlugin()
//         ],
//         resolve: {
//             alias: {
//                 '@': fileURLToPath(new URL('./src', import.meta.url))
//             }
//         },
//         css: {
//             modules: {
//                 localsConvention: 'camelCaseOnly'  
//             },
//             preprocessorOptions: {
//                 scss: {
//                     additionalData: `
//                         @import '@/assets/scss/abstracts/abstracts.scss';
//                         @import '@/assets/scss/core/core.scss';
//                     `
//                 }
//             }
//         }
//     }
// })