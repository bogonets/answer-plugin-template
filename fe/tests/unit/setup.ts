import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import {config} from '@vue/test-utils';

config.mocks['$i18n'] = i18n;
config.mocks['$t'] = i18n.t;
