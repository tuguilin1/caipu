import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Dialog,
  Input,
  Button,
  ButtonGroup,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Icon,
  Tag,
  Alert,
  Collapse,
  CollapseItem,
  Aside,
  Loading,
  MessageBox,
  Message
} from 'element-ui'
import 'swiper/dist/css/swiper.css'
import "./assets/css/iconfont.css"
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import VueSocketio from 'vue-socket.io'
import 'mint-ui/lib/style.css'
import { Badge } from 'mint-ui';
import { Navbar, TabItem } from 'mint-ui'
import VueLazyLoad from 'vue-lazyload'

Vue.use(Dialog);
Vue.use(Input);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Collapse);
Vue.use(CollapseItem);

Vue.use(VueLazyLoad,{
    loading:'./static/images/jiazai.png'
})
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Badge.name, Badge);
Vue.use(VueSocketio, 'http://120.77.151.33:3000');
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
