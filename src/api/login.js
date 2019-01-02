import request from '@/utils/request'
import API from '@/api/config/api.js'
import { makeParam } from '@/utils/strutil'

export function login(username, password) {
  return request({
    url: API.LOGIN.LOGIN,
    method: 'post',
    data: 'username=' + username + '&password=' + password
  })
}

export function getInfo() {
  return request({
    url: API.LOGIN.GET_INFO,
    method: 'get'
  })
}

export function getMenu() {
  return request({
    url: API.LOGIN.GET_MENU,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: API.LOGIN.LOGOUT,
    method: 'get'
  })
}

export function apiUpdateUser(formData) {
  var param = makeParam(formData)
  return request({
    url: API.LOGIN.UPDATE_USER,
    method: 'post',
    data: param
  })
}
