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