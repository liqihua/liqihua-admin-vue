import API from '@/api/config/api'
import request from '@/utils/request'
import { makeParam } from '@/utils/strutil'

export function page(page, pageSize) {
  return request({
    url: API.SYS_USER.PAGE,
    method: 'get',
    params: { page, pageSize }
  })
}

export function toDelete(id) {
  return request({
    url: API.SYS_USER.DELETE,
    method: 'post',
    data: 'id=' + id
  })
}

export function get(id) {
  return request({
    url: API.SYS_USER.GET,
    method: 'get',
    params: { id: id }
  })
}

export function save(formData) {
  var param = makeParam(formData)
  return request({
    url: '/sys/sysUserWebController/save',
    method: 'post',
    data: param
  })
}
