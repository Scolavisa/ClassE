import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from "@/router";
import "bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
// tree shaking icons as needed
// see https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faAngleRight, faTimes, faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
library.add([faBars, faAngleRight, faTimes, faHome, faInfoCircle]);
// see https://github.com/Akryum/v-tooltip
import VTooltipPlugin from 'v-tooltip';
import 'v-tooltip/dist/v-tooltip.css';

import useAuth from "./composables/UseAuth";
const { setUser } = useAuth();
await setUser();

axios.defaults.withCredentials = true;

createApp(App)
    .use(router)
    .use(VTooltipPlugin)
    .use(VueAxios, axios)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
