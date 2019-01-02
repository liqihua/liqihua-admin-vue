import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'

import { getToken } from '@/utils/auth' // 验权

/**
 * 不用拦截/login
 */
const whiteList = ['/login']

/**
 * 路由跳转前处理
 */
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 有token
  if (getToken()) {
    // 已经登录过还访问 /login 的话，自动重定向到首页 /
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if(!store.getters.userInfo) {
        store.dispatch('GetInfo').then(() => {
          if (!store.getters.addRouters || store.getters.addRouters.length < 1) {
            store.dispatch('GenerateRoutes').then(() => {
              router.addRoutes(store.getters.addRouters)
              next({ ...to, replace: true })
            }).catch((err) => {
              store.dispatch('FedLogOut').then(() => {
                Message.error(err || '获取菜单失败, 请重新登录')
                next({ path: '/' })
              })
            })
          }else{
            next()
          }
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '用户信息失败, 请重新登录')
            next({ path: '/' })
          })
        })
      }else{
        next()
      }
    }
  } else {
    // 没token：如果访问的url在whiteList里，允许跳转
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则全部重定向到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
