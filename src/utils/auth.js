import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
/*const UserKey = 'Admin-User'
const MenuKey = 'Admin-Menu'
const RouterKey = 'Admin-router'*/

/**
 * token操作
 * @returns {string | null}
 */
export function getToken() {
  return Cookies.get(TokenKey)
  //return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
  //sessionStorage.setItem(TokenKey,token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
  //sessionStorage.removeItem(TokenKey);
}

/**
 * 登录用户信息操作
 * @returns {*}
 */
/*
export function getUser() {
  let json = Cookies.get(UserKey)
  //let json = sessionStorage.getItem(UserKey)
  if(json) {
    return JSON.parse(json)
  }
  return null
}

export function setUser(user) {
  if(user){
    Cookies.set(UserKey, JSON.stringify(user))
    //sessionStorage.setItem(UserKey,JSON.stringify(user))
  }
}

export function removeUser() {
  Cookies.remove(UserKey)
  //sessionStorage.removeItem(UserKey)
}*/
