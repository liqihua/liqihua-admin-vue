import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUser, setUser, removeUser, setMenu, removeMenu } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    user: null
  },

  mutations: {
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          setToken(response.data.token)
          setUser(response.data.user)
          setMenu(response.data.menuList)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        let user = getUser()
        if(!user) {
          getInfo(state.token).then(response => {
            setUser(response.data)
            user = getUser()
          }).catch(error => {
            reject(error)
          })
        }
        resolve()
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          removeToken()
          removeUser()
          removeMenu()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        removeUser()
        removeMenu()
        resolve()
      })
    }
  }
}

export default user
