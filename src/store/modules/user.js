import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    user: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER: (state, user) => {
      state.user = user
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          setToken(response.data.token)
          setUser(response.data.user)

          let token = getToken()
          console.log('Login token:',token)
          //commit('SET_TOKEN', response.data.token)
          //commit('SET_USER', response.data.user)
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
        //commit('SET_ROLES', [user.username])
        //commit('SET_NAME', user.username)
        //commit('SET_AVATAR', user.avatar)
        //commit('SET_USER', user)
        resolve()
        /*getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', '12345')
          /!* if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }*!/
          commit('SET_NAME', data.nickname)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })*/
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          //commit('SET_TOKEN', '')
          //commit('SET_ROLES', [])
          removeToken()
          removeUser()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        //commit('SET_TOKEN', '')
        removeToken()
        removeUser()
        resolve()
      })
    }
  }
}

export default user
