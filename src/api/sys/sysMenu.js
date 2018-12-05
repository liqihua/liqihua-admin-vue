import API from '@/api/config/api'
import request from '@/utils/request'
import { makeParam } from '@/utils/strutil'

export function getTree() {
  return request({
    url: API.SYS_MENU.GET_TREE,
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: API.SYS_MENU.GET,
    method: 'get',
    params: { id: id }
  })
}

export function save(formData) {
  var param = makeParam(formData)
  return request({
    url: '/sys/sysMenuWebController/save',
    method: 'post',
    data: param
  })
}

export function toDelete(id) {
  return request({
    url: API.SYS_MENU.DELETE,
    method: 'post',
    data: 'id=' + id
  })
}

