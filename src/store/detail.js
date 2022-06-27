import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
import { getUUID } from "@/utils/uuid"

const state = {
    goodList: {},
    uuid: getUUID(),  // 存储游客身份id
}
const mutations = {
    GOODS_LIST(state, goodList) {
        state.goodList = goodList
    }
}
const actions = {
    async getGoodsList({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GOODS_LIST', result.data)
        }
    },

    // 商品添加购物车
    async addOrUpdateShopCart({commit}, {skuId, skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    catView(state) {
        return state.goodList.categoryView || {}
    },
    skuInfo(state) {
        return state.goodList.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodList.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}