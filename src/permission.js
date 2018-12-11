import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 有token
  if (getToken()) {
    // 已经登录过还访问 /login 的话，自动重定向到首页 /
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      // 如果全局状态里面用户角色获取不到，就拉取用户信息，再跳转
      /*if (store.getters.roles.length === 0) {
        console.log('aaa')
        store.dispatch('GetInfo').then(res => {
          next()
        }).catch((err) => {
          // 如果获取不到用户信息，证明前端的token对于服务端是过期的，调用FedLogOut()清空前端缓存的token，并重定向到首页/（跳到首页的时候会再次判断token是否存在，因为token已清空，所以会被拦截，跳转到登录页）
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '获取用户信息失败，请重新登录')
            next({ path: '/' })
          })
        })
      } else {
        console.log('bbb')
        // 否则，有角色信息，直接跳转
        next()
      }*/
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
