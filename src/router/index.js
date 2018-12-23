import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'


export const asyncRouterMap = [
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/sysMenu/list',
    name: 'sys',
    meta: {title: '系统设置', icon: 'sys'},
    children: [
      {
        path: 'sysMenu/list',
        name: 'sysMenu/list',
        component: () => import('@/views/sys/sysMenu/list'),
        meta: { title: '系统菜单', icon: 'menu' }
      },
      {
        path: 'sysMenu/add',
        name: 'sysMenu/add',
        component: () => import('@/views/sys/sysMenu/form'),
        hidden: true
      },
      {
        path: 'sysMenu/edit/:id',
        name: 'sysMenu/edit',
        component: () => import('@/views/sys/sysMenu/form'),
        hidden: true
      },
      {
        path: 'sysPerm/list',
        name: 'sysPerm/list',
        component: () => import('@/views/sys/sysPerm/list'),
        meta: { title: '系统权限', icon: 'perm' }
      },
      {
        path: 'sysPerm/add',
        name: 'sysPerm/add',
        component: () => import('@/views/sys/sysPerm/form'),
        hidden: true
      },
      {
        path: 'sysPerm/edit/:id',
        name: 'sysPerm/edit',
        component: () => import('@/views/sys/sysPerm/form'),
        hidden: true
      },
      {
        path: 'sysRole/list',
        name: 'sysRole/list',
        component: () => import('@/views/sys/sysRole/list'),
        meta: { title: '系统角色', icon: 'role' }
      },
      {
        path: 'sysRole/add',
        name: 'sysRole/add',
        component: () => import('@/views/sys/sysRole/form'),
        hidden: true
      },
      {
        path: 'sysRole/edit/:id',
        name: 'sysRole/edit',
        component: () => import('@/views/sys/sysRole/form'),
        hidden: true
      },
      {
        path: 'sysRole/setPerm/:id',
        name: 'sysRole/setPerm',
        component: () => import('@/views/sys/sysRole/setPerm'),
        hidden: true
      },
      {
        path: 'sysUser/list',
        name: 'sysUser/list',
        component: () => import('@/views/sys/sysUser/list'),
        meta: { title: '系统用户', icon: 'user' },
      },
      {
        path: 'sysUser/add',
        name: 'sysUser/add',
        component: () => import('@/views/sys/sysUser/form'),
        hidden: true
      },
      {
        path: 'sysUser/edit/:id',
        name: 'sysUser/edit',
        component: () => import('@/views/sys/sysUser/form'),
        hidden: true
      },
      {
        path: 'sysUser/setRole/:id',
        name: 'sysUser/setRole',
        component: () => import('@/views/sys/sysUser/setRole'),
        hidden: true
      }
    ]
  },
  {
    path: '/test',
    name: '/test',
    component: Layout,
    redirect: '/test/testa',
    meta: {title: '测试', icon: 'sys'},
    children: [
      {
        path: 'testa',
        name: 'testa',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '测试a', icon: 'menu' },
        children: [
          {
            path: 'testa1',
            name: 'testa1',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '测试a1', icon: 'menu' }
          },
          {
            path: 'testa2',
            name: 'testa2',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '测试a2', icon: 'menu' }
          }
        ]
      },
      {
        path: 'testb',
        name: 'testb',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '测试b', icon: 'perm' }
      },
      {
        path: 'testc',
        name: 'testc',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '测试c', icon: 'perm' }
      },
      {
        path: 'testd',
        name: 'testd',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '测试d', icon: 'perm' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]


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
  }
]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
