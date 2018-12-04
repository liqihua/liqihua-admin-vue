import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'home',
    meta: { title: '首页'},
    hidden: true,
    children: [{
      path: 'home',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/sysUser',
    component: Layout,
    redirect: '/sysUser/list',
    name: 'sysUser',
    meta: { title: '系统用户', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'sysUser-list',
        component: () => import('@/views/sys/sysUser/list'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'sysUser-add',
        component: () => import('@/views/sys/sysUser/form'),
        meta: { title: '用户添加', icon: 'table' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'sysUser-edit',
        component: () => import('@/views/sys/sysUser/form'),
        meta: { title: '用户编辑', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/sysMenu',
    component: Layout,
    redirect: '/sysMenu/list',
    name: 'sysMenu',
    meta: { title: '系统菜单', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'sysMenu-list',
        component: () => import('@/views/sys/sysMenu/list'),
        meta: { title: '菜单列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'sysMenu-add',
        component: () => import('@/views/sys/sysMenu/form'),
        meta: { title: '菜单添加', icon: 'table' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'sysMenu-edit',
        component: () => import('@/views/sys/sysMenu/form'),
        meta: { title: '菜单编辑', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/sysPerm',
    component: Layout,
    redirect: '/sysPerm/list',
    name: 'sysPerm',
    meta: { title: '系统权限', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'sysPerm-list',
        component: () => import('@/views/sys/sysPerm/list'),
        meta: { title: '权限列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'sysPerm-add',
        component: () => import('@/views/sys/sysPerm/form'),
        meta: { title: '权限添加', icon: 'table' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'sysPerm-edit',
        component: () => import('@/views/sys/sysPerm/form'),
        meta: { title: '权限编辑', icon: 'table' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
