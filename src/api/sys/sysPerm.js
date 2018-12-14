import API from '@/api/config/api'
import request from '@/utils/request'
import { makeParam } from '@/utils/strutil'

export function apiPage(page, pageSize) {
  return request({
    url: API.SYS_PERM.PAGE,
    method: 'get',
    params: { page, pageSize }
  })
}

export function apiSave(formData) {
  var param = makeParam(formData)
  return request({
    url: API.SYS_PERM.SAVE,
    method: 'post',
    data: param
  })
}

export function apiDelete(id) {
  return request({
    url: API.SYS_PERM.DELETE,
    method: 'post',
    data: 'id=' + id
  })
}

export function apiGet(id) {
  return request({
    url: API.SYS_PERM.GET,
    method: 'get',
    params: { id: id }
  })
}

export function apiGetByMenuIds(menuIds) {
  return request({
    url: API.SYS_PERM.GET_BY_MENU_IDS,
    method: 'get',
    params: { menuIds: menuIds }
  })
}

export function apiListGroupByMenuId() {
  return request({
    url: API.SYS_PERM.LIST_GROUP_BY_ID,
    method: 'get'
  })
}

