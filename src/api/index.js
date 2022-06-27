// 对API接口进行统一管理
import requests from './request'
import mockRequests from './mockRequest'

// 三级联动接口
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})

// 获取banner轮播图模拟数据
export const reqGetBannerList = () => mockRequests.get('/banner')

// 
export const reqFloorList = () => mockRequests.get('/floor')

// 商品查询接口
export const reqGetSearchList = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})

// 商品详情信息接口
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get'
})

// 添加商品接口
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

// 购物车数据接口
export const reqCartList = () => requests({
    url: '/cart/cartList',
    method: 'get'
})

// 删除购物车接口
export const reqDelCart = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 修改商品状态接口
export const reqUpdateChecked = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})