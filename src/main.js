import App from './App.vue'
import axios from 'axios'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'



const app = createApp(App);
app.config.globalProperties.$http = axios;
registerPlugins(app)
app.mount("#app");
