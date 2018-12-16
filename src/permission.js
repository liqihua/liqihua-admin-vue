import router from './router'
import { dynamicRouterMap } from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log('dynamicRouterMap',dynamicRouterMap)
  router.addRoutes(dynamicRouterMap)
  NProgress.start()
  // 有token
  if (getToken()) {
    // 已经登录过还访问 /login 的话，自动重定向到首页 /
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
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
