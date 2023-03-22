import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'notiwind'
import Popper from "vue3-popper";

// fontawesome
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
// main css file
import"./assets/tailwind.css";

createApp(App).use(Notifications).use(store).use(router).mount('#app')
// eslint-disable-next-line vue/multi-word-component-names
App.component("Popper", Popper);