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
