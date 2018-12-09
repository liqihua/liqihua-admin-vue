import API from '@/api/config/api'
import request from '@/utils/request'
import { makeParam } from '@/utils/strutil'

export function apiPage(page, pageSize) {
  return request({
    url: API.SYS_USER.PAGE,
    method: 'get',
    params: { page, pageSize }
  })
}

export function apiDelete(id) {
  return request({
    url: API.SYS_USER.DELETE,
    method: 'post',
    data: 'id=' + id
  })
}

export function apiGet(id) {
  return request({
    url: API.SYS_USER.GET,
    method: 'get',
    params: { id: id }
  })
}

export function apiSave(formData) {
  var param = makeParam(formData)
  return request({
    url: API.SYS_USER.SAVE,
    method: 'post',
    data: param
  })
}

export function apiSetRoles(userId,roleIds) {
  return request({
    url: API.SYS_USER.SET_ROLES,
    method: 'post',
    data: 'userId=' + userId + '&roleIds=' + roleIds
  })
}
