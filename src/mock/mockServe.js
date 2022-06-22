// 引入mockjs模块
import Mock from "mockjs"

// 引入json文件[webpack默认对外暴露（图片、json数据文件）]
import banner from './banner.json'

Mock.mock("/mock/banner", {code: 200, data: banner})