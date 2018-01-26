import Vue from 'vue'
import App from './App'

// 链接到 ./router/index.js，在其中配置路由相关信息
import router from './router/router.js'

// 调用loading组件（自定义组件）
import Loading from '@/ui/loading'
Vue.use(Loading);

// 调用loading组件（通过npm安装的外部组件）
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  loading: '../static/loading-svg/loading-bars.svg'
});

Vue.config.productionTip = false


// styles
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
