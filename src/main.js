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

// 引入懒加载插件
// import VueLazyload from 'vue-lazyload'
import Vant from 'vant'
import { Lazyload } from 'vant'
import 'vant/lib/index.css'
// 注册插件
Vue.use(Vant)
Vue.use(Lazyload)

// 引入表单验证插件
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

// 表单验证
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`
  },
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    isCheck: '协议',
  }
})

// 自定义规则
VeeValidate.Validator.extend('agree', {
  validate: value => {
    return value
  },
  getMessage: field => field + '必须同意'
})

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
