import request from '@/utils/request'

export function page() {
  return request({
    url: '/sys/sysMenuWebController/page',
    method: 'get'
  })
}
