import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './app/router';
import i18n from './app/localization';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');