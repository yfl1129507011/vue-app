// 对API接口进行统一管理
import requests from './request'
import mockRequests from './mockRequest'

// 三级联动接口
export const reqCategoryList = ()=>requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })

// 获取banner轮播图模拟数据
export const reqGetBannerList = ()=>mockRequests.get('/banner')
export const reqFloorList = ()=>mockRequests.get('/floor')