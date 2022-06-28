export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}

export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

export const removeToken = () => {
    return localStorage.removeItem('TOKEN')
}

export const setUserInfo = (userInfo) => {
    userInfo = JSON.stringify(userInfo)
    localStorage.setItem('USER_INFO', userInfo)
}

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('USER_INFO'))
}

export const removeUserInfo = () => {
    return localStorage.removeItem('USER_INFO')
}

