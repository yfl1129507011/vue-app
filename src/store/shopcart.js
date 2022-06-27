import { reqCartList, reqDelCart, reqUpdateChecked } from "@/api"

const state = {
    cartList: [],
}
const mutations = {
    CART_LIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('CART_LIST', result.data)
        }
    },

    async delCart({ commit }, skuId) {
        let result = await reqDelCart(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return new Promise(new Error('faile'))
        }
    },

    async updateChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return new Promise(new Error('faile'))
        }
    },

    delAllChecked(context) {
        let PromiseAll = []
        context.getters.cartList.cartInfoList.forEach(item => {
            if (item.isChecked) {
                PromiseAll.push(context.dispatch('delCart', item.skuId))
            }
        })

        // 有一个失败，即返回失败
        return Promise.all(PromiseAll)
    },

    updateAllChecked(context, checked) {
        let PromiseAll = []
        context.getters.cartList.cartInfoList.forEach(item => {
            PromiseAll.push(context.dispatch('updateChecked', { skuId: item.skuId, isChecked: checked }))
        })

        // 有一个失败，即返回失败
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}