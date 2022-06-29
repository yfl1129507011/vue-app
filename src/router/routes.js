// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

import User from '@/pages/Center/User'
import Group from '@/pages/Center/Group'


export default [
    {
        name: 'center',
        path: "/center",
        component: Center,
        // 加入路由元信息
        meta: {
            show: true
        },
        children: [
            {
                path: 'user',
                component: User
            },
            {
                path: 'group',
                component: Group
            },
            {
                path: '/center',
                redirect: '/center/user'
            }
        ]
    },
    {
        name: 'paysuccess',
        path: "/paysuccess",
        component: PaySuccess,
        // 加入路由元信息
        meta: {
            show: true
        }
    },
    {
        name: 'pay',
        path: "/pay",
        component: Pay,
        // 加入路由元信息
        meta: {
            show: true
        }
    },
    {
        name: 'trade',
        path: "/trade",
        component: Trade,
        // 加入路由元信息
        meta: {
            show: true
        }
    },
    {
        name: 'shopcart',
        path: "/shopcart",
        component: ShopCart,
        // 加入路由元信息
        meta: {
            show: true
        }
    },
    {
        name: 'addcart',
        path: "/addcart",
        component: AddCartSuccess,
        // 加入路由元信息
        meta: {
            show: true
        }
    },
    {
        name: 'detail',
        path: "/detail/:skuid",
        component: Detail,
        // 加入路由元信息
        meta: {
            show: true
        }
    },
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
        path: "/search/:keyword?",
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
        props: ($route) => {
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