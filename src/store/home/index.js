import { reqCategoryList } from "@/api"

// vuex模块式编程，home模块数据仓库

const state = { // 仓库存取数据的地方
    categoryList: []
}

const mutations = { // 修改state的唯一手段
    CATGORY_LIST(state, categoryList) {
        state.categoryList = categoryList
    }
}

const actions = { // 可以写自己的业务逻辑，也可以处理异步
    async categoryList({commit}) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit("CATGORY_LIST", result.data)
        }
    }
}

const getters = { // 可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
}


export default {
    state,
    mutations,
    actions,
    getters
}