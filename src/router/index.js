import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'


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
      },
      {
        path: 'setRole/:id',
        name: 'sysUser-setRole',
        component: () => import('@/views/sys/sysUser/setRole'),
        meta: { title: '分配角色', icon: 'table' },
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
  {
    path: '/sysRole',
    component: Layout,
    redirect: '/sysRole/list',
    name: 'sysRole',
    meta: { title: '系统角色', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'sysRole-list',
        component: () => import('@/views/sys/sysRole/list'),
        meta: { title: '角色列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'sysRole-add',
        component: () => import('@/views/sys/sysRole/form'),
        meta: { title: '角色添加', icon: 'table' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'sysRole-edit',
        component: () => import('@/views/sys/sysRole/form'),
        meta: { title: '角色编辑', icon: 'table' },
        hidden: true
      },
      {
        path: 'setPerm/:id',
        name: 'sysRole-setPerm',
        component: () => import('@/views/sys/sysRole/setPerm'),
        meta: { title: '分配权限', icon: 'table' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

/*export const constantRouterMap = [
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
      },
      {
        path: 'setRole/:id',
        name: 'sysUser-setRole',
        component: () => import('@/views/sys/sysUser/setRole'),
        meta: { title: '分配角色', icon: 'table' },
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
  {
    path: '/sysRole',
    component: Layout,
    redirect: '/sysRole/list',
    name: 'sysRole',
    meta: { title: '系统角色', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'sysRole-list',
        component: () => import('@/views/sys/sysRole/list'),
        meta: { title: '角色列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'sysRole-add',
        component: () => import('@/views/sys/sysRole/form'),
        meta: { title: '角色添加', icon: 'table' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'sysRole-edit',
        component: () => import('@/views/sys/sysRole/form'),
        meta: { title: '角色编辑', icon: 'table' },
        hidden: true
      },
      {
        path: 'setPerm/:id',
        name: 'sysRole-setPerm',
        component: () => import('@/views/sys/sysRole/setPerm'),
        meta: { title: '分配权限', icon: 'table' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]*/

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
