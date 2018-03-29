import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'swiper/dist/css/swiper.css'
import "./assets/css/iconfont.css"
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import VueSocketio from 'vue-socket.io'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(VueSocketio, 'http://localhost:3000');
Vue.use(VueLazyLoad,{
	loading:'./static/lazy.jpg'
})
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
