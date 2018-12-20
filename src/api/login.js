import request from '@/utils/request'
import API from '@/api/config/api.js'
import { getMenu, setFilterRouter } from '@/utils/auth'

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

export function logout() {
  return request({
    url: API.LOGIN.LOGOUT,
    method: 'get'
  })
}
