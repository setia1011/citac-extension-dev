// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios';
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import PageHeader from "./components/PageHeader.vue";
import {Tabs, Tab} from 'vue3-tabs-component';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)

const toastificationOptions = {};
app.use(Toast, toastificationOptions);
app.use(VueAxios, axios)
app.use(VueCookies, { expires: '1d'})
app.use(LoadingPlugin)
app.component('page-header', PageHeader)
app.component('tabs', Tabs)
app.component('tab', Tab)

app.mount('#app')
