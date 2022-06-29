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

// 获取验证码接口
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 用户注册接口
export const reqUserRegister = (userInfo) => requests({
    url: '/user/passport/register',
    data: userInfo,
    method: 'post'
})

// 用户登录接口
export const reqUserLogin = (userInfo) => requests({
    url: '/user/passport/login',
    data: userInfo,
    method: 'post'
})

// 获取用户登录信息接口
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

// 用户退出接口
export const reqUserLogout = () => requests({
    url: '/user/passport/logout',
    method: 'get'
})

// 地址信息接口
export const reqUserAddr = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})

// 商品清单接口
export const reqUserOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get'
})

// 提交订单接口
export const reqTradeInfo = (tradeNo, tradeInfo) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data: tradeInfo,
    method: 'post'
})

// 订单支付信息接口
export const reqOrderInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})

// 订单支付状态接口
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})