import API from '@/api/config/api'
import request from '@/utils/request'
import { makeParam } from '@/utils/strutil'

export function apiPage(page, pageSize) {
  return request({
    url: API.SYS_ROLE.PAGE,
    method: 'get',
    params: { page, pageSize }
  })
}

export function apiSave(formData) {
  var param = makeParam(formData)
  return request({
    url: API.SYS_ROLE.SAVE,
    method: 'post',
    data: param
  })
}

export function apiDelete(id) {
  return request({
    url: API.SYS_ROLE.DELETE,
    method: 'post',
    data: 'id=' + id
  })
}

export function apiGet(id) {
  return request({
    url: API.SYS_ROLE.GET,
    method: 'get',
    params: { id: id }
  })
}

