import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from "@/router";
import "bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
// tree shaking icons as needed
// see https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowAltCircleRight, faChevronCircleLeft, faCalendar, faExclamationCircle, faHome, faInbox, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
library.add([ faArrowAltCircleRight, faChevronCircleLeft, faCalendar, faExclamationCircle, faHome, faInbox, faSignOutAlt ]);
// see https://github.com/Akryum/v-tooltip
import VTooltipPlugin from 'v-tooltip';
import 'v-tooltip/dist/v-tooltip.css';

import messages from './lang/translations';
const i18n = createI18n({
    locale: 'nl',
    fallbackLocale: 'en',
    messages
});

createApp(App)
    .use(router)
    .use(VTooltipPlugin)
    .use(VueAxios, axios)
    .use(i18n)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
