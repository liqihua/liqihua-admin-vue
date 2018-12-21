const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  userInfo: state => state.user.userInfo,
  addRouters: state => state.permission.addRouters,
  permissionRouters: state => state.permission.permissionRouters
}
export default getters
