import request from '@/utils/request'
import API from '@/api/config/api.js'

export function login(username, password) {
  return request({
    url: API.LOGIN.LOGIN,
    method: 'post',
    data: 'username=' + username + '&password=' + password
  })
}

export function getInfo(token) {
  return request({
    url: API.LOGIN.GET_INFO,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: API.LOGIN.LOGOUT,
    method: 'get'
  })
}
