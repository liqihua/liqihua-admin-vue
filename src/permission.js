import router from './router'
import { dynamicRouterMap } from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken, getMenu, getFilterRouter } from '@/utils/auth' // 验权

/**
 * 不用拦截/login
 */
const whiteList = ['/login']
var myRouterNameArr = []


/**
 * 根据角色过滤路由
 */
function filterAsyncRouter(routes) {
  let filterRouterMap = []
  routes.forEach(r => {
    let tmp = r
    if(myRouterNameArr.includes(tmp.name) || tmp.hidden){
      if(tmp.children){
        tmp.children = filterAsyncRouter(tmp.children)
      }
      filterRouterMap.push(tmp)
    }
  })
  return filterRouterMap
}



function makeFilterRouter(){
  console.log('makeFilterRouter -- start')
  /**
   * 获取拥有的菜单的路由名称routerName
   */
  if(getMenu()){
    myRouterNameArr = getMenu().map(menu => {return menu.routerName})
    console.log('myRouterNameArr',myRouterNameArr)
    /**
     * 如果myRouterNameArr不为空，添加动态路由
     */
    if(myRouterNameArr) {
      let filterRouterMap = filterAsyncRouter(dynamicRouterMap)
      console.log('filterRouterMap')
      console.log(filterRouterMap)
      router.addRoutes(filterRouterMap)
      console.log('router.addRoutes')
    }
  }
  console.log('makeFilterRouter -- end')
}


/**
 * 路由跳转前处理
 */
makeFilterRouter()
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
