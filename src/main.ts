import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from "vue-cookies";  // Import VueCookies correctly

const app = createApp(App)
app.use(router)

// Use VueCookies plugin
app.use(VueCookies)

app.mount('#app')
