const API = {
  LOGIN: {
    LOGIN: '/sys/sysLoginWebController/login',
    LOGOUT: '/sys/sysLoginWebController/logout',
    GET_INFO: '/sys/sysLoginWebController/getUserInfo',
    GET_MENU: '/sys/sysLoginWebController/getUserMenu'
  },
  SYS_USER: {
    PAGE: '/sys/sysUserWebController/page',
    GET: '/sys/sysUserWebController/get',
    DELETE: '/sys/sysUserWebController/delete',
    SAVE: '/sys/sysUserWebController/save',
    SET_ROLES: '/sys/sysUserWebController/setRoles',
    UPLOAD_AVATAR: process.env.BASE_API + '/sys/sysUserWebController/uploadAvatar'
  },
  SYS_MENU: {
    GET_TREE: '/sys/sysMenuWebController/getTree',
    DELETE: '/sys/sysMenuWebController/delete',
    GET: '/sys/sysMenuWebController/get',
    SAVE: '/sys/sysMenuWebController/save'
  },
  SYS_PERM: {
    PAGE: '/sys/sysPermWebController/page',
    SAVE: '/sys/sysPermWebController/save',
    DELETE: '/sys/sysPermWebController/delete',
    GET: '/sys/sysPermWebController/get',
    GET_BY_MENU_IDS: '/sys/sysPermWebController/getByMenuIds',
    LIST_GROUP_BY_ID: '/sys/sysPermWebController/listGroupByMenuId'
  },
  SYS_ROLE: {
    PAGE: '/sys/sysRoleWebController/page',
    SAVE: '/sys/sysRoleWebController/save',
    DELETE: '/sys/sysRoleWebController/delete',
    GET: '/sys/sysRoleWebController/get',
    SET_PERMS: '/sys/sysRoleWebController/setPerms'
  }
}

export default API
