import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/sys/sysLoginWebController/login',
    method: 'post',
    data: 'username=' + username + '&password=' + password
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/sysLoginWebController/getInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/sys/sysLoginWebController/logout',
    method: 'get'
  })
}
