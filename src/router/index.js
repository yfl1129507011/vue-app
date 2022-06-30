// 配置路由信息
import Vue from "vue"
import VueRouter from "vue-router"

import { getToken } from '@/utils/token'

// 使用插件
Vue.use(VueRouter)

// 引入路由信息
import routes from './routes'

// 重写路由原型对象方法 push | replace
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    routes,

    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    if (getToken() && to.path == '/login') {
        next('/home')
    } else {
        if (getToken()) {
            next()
        } else {
            let mustLoginUrl = ['/trade', '/pay', '/center/user']
            if (mustLoginUrl.indexOf(to.path) != -1) {
                next('/login?redirect=' + to.path)
            } else {
                next()
            }
        }
    }
})

export default router