import {createApp} from 'vue'
import './style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.vue'
import store from './vuex'
import router from "./router/index";
import useCustomeDirective from "./direvctives";
const app = createApp(App)
app.use(store)
app.use(router)
useCustomeDirective(app)
app.mount('#app')
