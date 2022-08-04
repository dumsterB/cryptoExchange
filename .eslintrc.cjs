/* eslint-env node */
module.exports = {
    'root': true,
    'extends': [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    'env': {
        'vue/setup-compiler-macros': true
    },
    'globals': {
        'defineProps': 'readonly',
        'defineEmits': 'readonly',
        'defineExpose': 'readonly',
        'withDefaults': 'readonly',
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'rules': {
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'prettier/prettier': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4],
        'vue/html-indent': ['error', 4],
        'vue/html-self-closing': ['error', {
            'html': {
                'void': 'any',
                'normal': 'any',
                'component': 'always'
            }
        }],
        'vue/script-indent': ['error', 4],
        'vue/order-in-components': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off'
    }
};
