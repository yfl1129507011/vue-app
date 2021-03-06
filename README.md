## vue-cli脚手架初始化项目
- vue create vue-app
- cd vue-app
- npm run serve

## 项目文件夹含义
- node_modules文件夹：项目依赖包文件夹
- public文件夹：放置静态资源。需要注意，放在public文件夹中的静态资源，在webpack进行打包的时候，会原封不动打包到dist文件夹中
- src：程序源代码文件夹
    1. assets文件夹：放置静态资源（一般放置多个组件共用的静态资源），需要注意，放置在assets文件夹中的静态资源，在webpack进行打包的时候，会当作一个模块打包到JS文件夹中
    2. components: 放置非路由组件
    3. App.vue：唯一的根组件
    4. main.js：程序入口文件，也是整个程序当中最先执行的文件
    5. babel.config.js：配置文件（babel相关，ES6兼容）
    6. package.json：项目中的依赖包信息

## 项目的其他配置
- 配置别名@提示(在根目录下创建jsconfig.js文件)
    ```json
    {
        "compilerOptions": {
            "baseUrl": "./",
            "paths": {
                "@/*": [
                    "src/*"
                ]
            }
        },
        "exclude": [
            "node_modules",
            "dist"
        ]
    }
    ```

- 关闭eslint语法检查(在根目录下创建vue.config.js文件)
    ```js
    module.exports = {
        // 关闭eslint语法检查
        lintOnSave: false
    }
    ```

- 设置`npm run serve` 执行后自动打开浏览器（在package.json中设置）
    ```json
    "scripts": {
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    },
    ```


## 项目需要安装的模块
- less安装：```npm i less less-loader@5```
- vue路由安装：```npm i vue-router@3```


## 路由传参问题
1. 路由跳转传参的时候，对象写法可以是`name`或`path`形式，但`path`写法不能和`params`参数一起使用
    ```js
    // 正确写法
    this.$router.push({
        name: "search",  // todo
        params: {
            keyword: this.keyword
        },
        query: {
            k: this.keyword.toUpperCase()
        }
    })

    // 错误写法
    this.$router.push({
        path: "/search",  // todo
        params: {
            keyword: this.keyword
        },
        query: {
            k: this.keyword.toUpperCase()
        }
    })
    ```

2. 如何指定`params`参数可传可不传
    ```js
    // 在配置路由的时候在后面添加一个问号
    {
        name: "search",
        path: "/search/:keyword?",  // 添加问号
        component: Search,
        meta: {
            show: true
        }
    }
    ```
3. 如何解决`params`参数传递空串
    ```js
    // 使用undefined方式解决
    this.$router.push({
        name: "search",
        params: {
            keyword: '' || undefined
        },
        query: {
            k: this.keyword.toUpperCase()
        }
    })
    ```

4. 路由组件传递`props`参数的方式
    ```js
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
    }
    ```

## 函数的防抖和节流 `npm i lodash`
> 节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

> 防抖：前面的所有触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次

> 可以使用lodash插件来解决

## mock模拟数据 `npm i mockjs`
1. 在项目src文件夹中创建mock文件夹
2. 准备JSON数据（mock文件夹中创建相应的JSON文件）-- 需要格式化，不能留有空格
3. 把mock数据需要的图片放置到public文件夹中（public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹中）
4. 创建mockServe.js文件通过mockjs插件实现模拟数据
5. 需要在main.js入口文件中进行引入```import '@/mock/mockServe'```

## Swiper 图片轮播
> 安装：npm i swiper@5
```js
watch: {
    bannerList: {
        handler(newVal, oldVal) {
            this.$nextTick(()=>{
                new Swiper('#mySwiper', {
                    loop: true, // 循环模式选项

                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },

                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                })
            })
        }
    }
}
```

## 组件之间的通信方式
1. props: 用于父给子组件进行通信
2. 自定义事件： @on @emit 可以实现子给父组件通信
3. 全局事件总线：$bus  全部组件都能通信
4. pubsub-js：消息订阅  全部组件都能通信
5. 插槽
6. vuex


## 按需引入element-ui组件
> 安装：npm i element-ui babel-plugin-component

1. babel.config.js文件内容如下：
    ```js
    module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        ["@babel/preset-env", { "modules": false }],
    ],
    plugins: [
        [
        "component",
        {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
        }
        ]
    ]
    }

    ```
2. main.js入口文件中进行引入
    ```js
    // element-ui组件
    import { Button, MessageBox } from 'element-ui'

    // 注册element组件
    Vue.component(Button.name, Button)
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    ```


## 图片懒加载
> npm i vue-lazyload vant

1. main.js入口文件中进行引入
    ```js
    // 引入懒加载插件
    // import VueLazyload from 'vue-lazyload'
    import Vant from 'vant'
    import { Lazyload } from 'vant'
    import 'vant/lib/index.css'
    // 注册插件
    Vue.use(Vant)
    Vue.use(Lazyload)
    ```

2. 在组件中应用
    ```vue
    <ul>
        <li v-for="img in list">
            <img v-lazy="img.src" >
        </li>
    </ul>
    ```

## vee-validate表单验证
> npm i vee-validate

1. main.js入口文件中进行引入
    ```js
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
    ```

2. 在组件中应用
    ```vue
    <div class="content">
        <label>手机号:</label>
        <input v-model="userInfo.phone" name="phone" v-validate="{ required: true, regex: /^1\d{10}$/ }"
            :class="{ invalid: errors.has('phone') }" type="text" placeholder="请输入你的手机号">
        <span class="error-msg">{{ errors.first('phone') }}</span>
    </div>
    <div class="content">
        <label>验证码:</label>
        <input v-model="userInfo.code" name="code" v-validate="{ required: true, regex: /^\d{6}$/ }"
            :class="{ invalid: errors.has('code') }" type="text" placeholder="请输入验证码">
        <button @click="getCode" style="height:38px;width:100px">获取验证码</button>
        <span class="error-msg">{{ errors.first('code') }}</span>
    </div>
    <div class="content">
        <label>登录密码:</label>
        <input v-model="userInfo.password" name="password"
            v-validate="{ required: true, regex: /^[0-9A-Za-z]{6,20}$/ }" :class="{ invalid: errors.has('password') }"
            type="password" placeholder="请输入你的登录密码">
        <span class="error-msg">{{ errors.first('password') }}</span>
    </div>
    <div class="content">
        <label>确认密码:</label>
        <input v-model="userInfo.rePassword" name="password1" v-validate="{ required: true, is: userInfo.password}"
            :class="{ invalid: errors.has('password1') }" type="password" placeholder="请输入确认密码">
        <span class="error-msg">{{ errors.first('password1') }}</span>
    </div>
    <div class="controls">
        <input name="isCheck" v-validate="{ required: true, 'agree': true }" :class="{ invalid: errors.has('isCheck') }"
            type="checkbox" :checked="userInfo.agree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('isCheck') }}</span>
    </div>
    <div class="btn">
        <button @click="register">完成注册</button>
    </div>

    <script>
        async register() {
            const success = await this.$validator.validateAll()  // 验证全部规则
            if (success) {
                try {
                await this.$store.dispatch('userRegister', this.userInfo)
                this.$router.push('/login')
                } catch (error) {
                console.log(error.message)
                }
            }
        }
    </script>
    ```

## 项目上线打包

- npm run build

- 项目打包后，代码都是经过压缩加密的，但map文件不是
- 配置map文件是否输出
    ```js
    // vue.config.js 文件中配置
    productionSourceMap: false
    ```

- 打包后将生成的dist文件夹上传到服务器指定位置

- nginx配置如下：
    ```config
    listen 80;
    server_name Vue.app.com ;
    index index.html index.htm index.php;
    root  /home/wwwroot/dist;

    location /api {
        proxy_pass http://gmall-h5-api.atguigu.cn;
    }

    ```