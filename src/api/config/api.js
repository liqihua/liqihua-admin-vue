const API = {
  LOGIN: {
    LOGIN: '/sys/sysLoginWebController/login',
    LOGOUT: '/sys/sysLoginWebController/logout',
    GET_INFO: '/sys/sysLoginWebController/getInfo'
  },
  SYS_USER: {
    PAGE: '/sys/sysUserWebController/page',
    GET: '/sys/sysUserWebController/get',
    DELETE: '/sys/sysUserWebController/delete',
    SAVE: '/sys/sysUserWebController/save',
    UPLOAD_AVATAR: process.env.BASE_API + '/sys/sysUserWebController/uploadAvatar'
  },
  SYS_MENU: {
    GET_TREE: '/sys/sysMenuWebController/getTree',
    DELETE: '/sys/sysMenuWebController/delete',
    GET: '/sys/sysMenuWebController/get',
    SAVE: '/sys/sysMenuWebController/save',
  },
  SYS_PERM: {
    PAGE: '/sys/sysPermWebController/page',
    SAVE: '/sys/sysPermWebController/save',
  }
}

export default API
