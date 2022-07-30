import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './app/router';
import locales from './app/locales';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(locales);

app.mount('#app');