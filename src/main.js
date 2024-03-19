import { createApp } from 'vue';
import { createPinia } from 'pinia';

import CKEditor from '@ckeditor/ckeditor5-vue';
import {
  Field, Form, ErrorMessage, configure, defineRule,
} from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { loadLocaleFromURL, localize } from '@vee-validate/i18n';
import { date, currency, dateUS } from '@/methods/filters';

import App from './App.vue';
import router from './router';

const app = createApp(App);

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

loadLocaleFromURL('./zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
  validateOnInput: true,
});

app.config.globalProperties.$filters = {
  date,
  currency,
  dateUS,
};

app.use(createPinia());
app.use(router);
app.use(CKEditor);

app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
