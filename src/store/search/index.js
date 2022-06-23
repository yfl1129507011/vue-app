import { reqGetSearchList } from '@/api'

// vuex模块式编程，search模块数据仓库

const state = { // 仓库存取数据的地方
    searchList: {}
}

const mutations = { // 修改state的唯一手段
    SEARCH_LIST(state, searchList) {
        state.searchList = searchList
    }
}

const actions = { // 可以写自己的业务逻辑，也可以处理异步
    async getSearchList({commit}, params = {}) {
        let result = await reqGetSearchList(params)
        if (result.code == 200) {
            commit('SEARCH_LIST', result.data)
        }
    }
}

const getters = { // 可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    goodsList(state) {
        return state.searchList.goodsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}