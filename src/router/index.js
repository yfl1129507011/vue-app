// 配置路由信息
import Vue from "vue"
import VueRouter from "vue-router"

// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

// 配置路由
export default new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home,
            // 加入路由元信息
            meta: {
                show: true
            }
        },
        {
            name: "search",
            path: "/search/:keyword",
            component: Search,
            meta: {
                show: true
            },
            // 1. 布尔值写法-params   props: ['keyword']
            // props: true
            // 对象写法：额外传递参数
            /* props: {
                a: 1,
                b: 2
            } */
            // 函数写法
            props: ($route)=>{
                return {
                    keyword: $route.params.keyword,
                    k: $route.query.k
                }
            }
        },
        {
            path: "/login",
            component: Login,
            meta: {
                show: false
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {
                show: false
            }
        },
        // 重定向，在项目跑起来的时候，访问定向到首页
        {
            path: "*",
            redirect: "/home"
        }
    ]
})