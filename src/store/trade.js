import { reqUserAddr, reqUserOrderInfo } from "@/api"

const state = {
    addrInfo: [],
    orderInfo: {},
}
const mutations = {
    ADDR_INFO(state, addrInfo) {
        state.addrInfo = addrInfo
    },

    ORDER_INFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    async getAddressInfo({ commit }) {
        let res = await reqUserAddr()
        if (res.code == 200) {
            commit('ADDR_INFO', res.data)
        }
    },

    async getOrderInfo({ commit }) {
        let res = await reqUserOrderInfo()
        if (res.code == 200) {
            commit('ORDER_INFO', res.data)
        }
    },
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}