// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserKey = 'Admin-User'

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  //  return Cookies.set(TokenKey, token)
  localStorage.setItem(TokenKey,token)
  return localStorage.getItem(TokenKey)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  localStorage.removeItem(TokenKey);
}

export function getUser() {
  let json = localStorage.getItem(UserKey)
  if(json) {
    return JSON.parse(json)
  }
  return null
}

export function setUser(user) {
  localStorage.setItem(UserKey,JSON.stringify(user))
}

export function removeUser() {
  localStorage.removeItem(UserKey)
}
