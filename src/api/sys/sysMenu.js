import API from '@/api/config/api'
import request from '@/utils/request'
import { makeParam } from '@/utils/strutil'

export function apiGetTree() {
  return request({
    url: API.SYS_MENU.GET_TREE,
    method: 'get'
  })
}

export function apiGet(id) {
  return request({
    url: API.SYS_MENU.GET,
    method: 'get',
    params: { id: id }
  })
}

export function apiSave(formData) {
  var param = makeParam(formData)
  return request({
    url: '/sys/sysMenuWebController/save',
    method: 'post',
    data: param
  })
}

export function apiDelete(id) {
  return request({
    url: API.SYS_MENU.DELETE,
    method: 'post',
    data: 'id=' + id
  })
}

export function makeTreeLabel(menuList) {
  if (menuList) {
    for (var key in menuList) {
      if (menuList[key].title) {
        menuList[key].label = menuList[key].title
      }
      if (menuList[key].children) {
        menuList[key].children = makeTreeLabel(menuList[key].children)
      }
    }
  }
  return menuList
}

