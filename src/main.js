import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import VButton from './components/common/VButton.vue'
// import VIcon from './components/common/VIcon.vue'
import router from './router'
import locales from './locales'
// import { loadChains } from './services/api/repositories/chains'
// import { useChainsStore } from './stores/chains'



// app.component('VButton', VButton);
// app.component('VIcon', VIcon);

const app = createApp(App);

app.use(createPinia())
app.use(router)
app.use(locales)

// const chainsStore = useChainsStore();

// chainsStore.chains = loadChains();

app.mount('#app');


// prod version
// const app = createApp(App)

// app.use(createPinia())
// app.use(router)
// app.use(translation)

// app.mount('#app')
