// 对axios进行二次封装
import axios from "axios"

// 引入进度条和进度条样式
import nProgress from "nprogress"
import "nprogress/nprogress.css"

// 引入存储模块
import store from "@/store"

// 利用axios对象的方法create，创建一个axios实例
const requests = axios.create({
    baseURL: "/api", // 基础路径，发送请求时地址后自动添加/api
    timeout: 5000,  // 请求超时5s
})

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    if (store.state.detail.uuid) {  // 在请求头添加游客id信息
        config.headers.userTempId = store.state.detail.uuid
    }
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    nProgress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器响应数据后，可以检测到
    nProgress.done()
    return res.data
}, (err)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))
})

export default requests