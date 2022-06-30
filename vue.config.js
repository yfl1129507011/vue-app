module.exports = {
    // 关闭eslint语法检查
    lintOnSave: false,

    // 配置代理跨域
    devServer: {
        proxy: {
            "/api": {
                target: "http://gmall-h5-api.atguigu.cn",
                /* pathRewrite: {
                    '^/api': ''
                } */
            }
        }
    },

    // 打包项目时取消map文件输出
    productionSourceMap: false
}