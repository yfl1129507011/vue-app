import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---注册为全局组件
import TypeNav from '@/pages/Home/TypeNav'

Vue.component(TypeNav.name, TypeNav)

// 引入路由
import router from '@/router'

// 引入vuex
import store from '@/store'

/* import { reqCategoryList } from '@/api'

reqCategoryList() */

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由
  router,
  store
}).$mount('#app')
