import axios from 'axios'
import { Message/* , MessageBox*/ } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    console.log(config.method + ' ' + config.url)
    if(config.params) {
      console.log('params:',config.params)
    }
    if(config.data) {
      console.log('data:',config.data)
    }
    if (getToken()) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非10000是抛错 可结合自己业务进行修改
     * 42003：未登录
     * 41201：shiro-未认证
     */
    console.log('response',response.data)
    const res = response.data
    if (res.code !== 10000) {
      if(res.code == 42003 || res.code == 41201) {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }else{
        Message({
          message: res.message,
          type: 'error',
          duration: 10 * 1000
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err:',error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
