import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---注册为全局组件
import TypeNav from '@/components/TypeNav'

// 轮播图组件--注册为全局组件
import Carousel from '@/components/Carousel'

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)

// 引入路由
import router from '@/router'

// 引入vuex
import store from '@/store'

// 引入mock模块进行数据模拟
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {  // 配置全局事件总线
    Vue.prototype.$bus = this
  },
  // 注册路由
  router,
  store
}).$mount('#app')
