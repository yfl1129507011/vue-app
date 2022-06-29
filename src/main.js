import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---注册为全局组件
import TypeNav from '@/components/TypeNav'

// 轮播图组件--注册为全局组件
import Carousel from '@/components/Carousel'

// 分页组件--注册为全局组件
import Pagination from '@/components/Pagination'

// element-ui组件
import { Button, MessageBox } from 'element-ui'

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 注册element组件
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入路由
import router from '@/router'

// 引入vuex
import store from '@/store'

// 引入mock模块进行数据模拟
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 引入api接口
import * as API from '@/api'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this  // 配置全局事件总线
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  store
}).$mount('#app')
