import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'swiper/dist/css/swiper.css'
import "./assets/css/iconfont.css"
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import VueSocketio from 'vue-socket.io'
import 'mint-ui/lib/style.css'
import { Badge } from 'mint-ui';
import { Navbar, TabItem } from 'mint-ui';
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    loading:'./static/images/jiazai.png'
})
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Badge.name, Badge);
Vue.use(VueSocketio, 'http://127.0.0.1:3000');
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
