import { asyncRouterMap, constantRouterMap } from '@/router'
import { getMenu } from '@/api/login'



function hasPermission(route, routerNameArr) {
  if(routerNameArr && routerNameArr.includes(route.name)){
    return true
  }
  return false
}


function filterAsyncRouter(routes, routerNameArr) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(tmp, routerNameArr)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, routerNameArr)
      }
      res.push(tmp)
    }
  })

  return res
}




const permission = {
  state: {
    addRouters: [],
    permissionRouters: constantRouterMap
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.permissionRouters = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise((resolve,reject) => {
        getMenu().then(response => {
          if(response && response.data && response.data.length > 0 ){
            const routerNameArr = response.data.map(menu => { return menu.routerName })
            let accessedRouters = filterAsyncRouter(asyncRouterMap, routerNameArr)
            if(accessedRouters && accessedRouters.length > 0){
              commit('SET_ROUTERS', accessedRouters)
              resolve()
            }
          }
          reject()
        }).catch(error => {
          reject(error)
        })
      })

    }
  }
}

export default permission
