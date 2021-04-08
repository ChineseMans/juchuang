import Vue from 'vue';
import axios from 'axios';
import {getRequest,postRequest} from '@/router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router/router';
import './permission'; // 权限
import './error'; // 日志
import './cache';//页面缓冲
import store from './store';
import { loadStyle } from './util/util'
import * as urls from '@/config/env';
import Element from 'element-ui';
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env';
import i18n from './lang' // Internationalization
import './styles/common.scss';
import basicBlock from './components/basic-block/main'
import basicContainer from './components/basic-container/main'
import AvueUeditor from 'avue-plugin-ueditor'
// import 'vue-beauty/package/style/vue-beauty.min.css'
// import {tree} from 'vue-beauty'





Vue.use(AvueUeditor);
Vue.use(router)
Vue.use(VueAxios, axios)
// Vue.use(tree)

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(window.AVUE, {
  i18n: (key, value) => i18n.t(key, value)
})
//注册全局容器
Vue.component('basicContainer', basicContainer)
Vue.component('basicBlock', basicBlock)
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele));
})

Vue.config.productionTip = false;

// 请求资源
Vue.prototype.$getRequest = getRequest;
Vue.prototype.$postRequest = postRequest;


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')