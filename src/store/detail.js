import { reqGoodsInfo } from "@/api"

const state = {
    goodList: {}
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