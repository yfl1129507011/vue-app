import { reqGetCode, reqUserInfo, reqUserLogin, reqUserLogout, reqUserRegister } from "@/api"
import { getToken, getUserInfo, removeToken, removeUserInfo, setToken, setUserInfo } from "@/utils/token"

const state = {
    code: '',
    token: getToken(),
    userInfo: getUserInfo() || {}
}
const mutations = {
    GET_CODE(state, code) {
        state.code = code
    },

    USER_LOGIN(state, token) {
        setToken(token)
        state.token = token
    },

    USER_INFO(state, userInfo) {
        setUserInfo(userInfo)
        state.userInfo = userInfo
    },

    USER_LOGOUT(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
        removeUserInfo()
    }
}
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GET_CODE', result.data)
            return 'ok'
        } else {
            return new Promise(new Error('faile'))
        }
    },

    async userRegister({ state }, userInfo) {
        let result = await reqUserRegister(userInfo)
        if (result.code == 200 && state.code == userInfo.code) {
            return 'ok'
        } else {
            return new Promise(new Error('faile'))
        }
    },

    async userLogin({ commit }, userInfo) {
        let result = await reqUserLogin(userInfo)
        if (result.code == 200) {
            commit('USER_LOGIN', result.data.token)
            return 'ok'
        } else {
            return new Promise(new Error('faile'))
        }
    },

    async userInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('USER_INFO', result.data)
        } else {
            commit('USER_LOGOUT')
        }
    },

    async userLogout({ commit }) {
        let result = await reqUserLogout()
        if (result.code == 200) {
            commit('USER_LOGOUT')
            return 'ok'
        } else {
            return new Promise(new Error('faile'))
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