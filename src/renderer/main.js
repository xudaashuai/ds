import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import VCardRoomInfo from './components/cards/VCardRoomInfo'
import VCardDanmuSetting from './components/cards/VCardDanmuSetting'
import VCardDanmuSend from './components/cards/VCardDanmuSend'
import './style/core.css'
import ColorPicker from './plugins/color-picker'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(ColorPicker);
Vue.component(VCardRoomInfo.name, VCardRoomInfo)
Vue.component(VCardDanmuSetting.name, VCardDanmuSetting)
Vue.component(VCardDanmuSend.name, VCardDanmuSend)
Vue.component('v-card', {
  render: function (createElement) {
    return createElement(
        this.n,   // tag name 标签名称
        this.$slots.default // 子组件中的阵列
    )
  },
  props: {
    n: {
      type: String,
      required: true
    }
  }
})
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
const instance = axios.create({
  baseURL: 'https://fast-oasis-63770.herokuapp.com/',
  timeout: 5000,
});
Vue.http = Vue.prototype.$http = instance
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
