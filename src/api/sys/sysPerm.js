import request from '@/utils/request'

export function page(page, pageSize) {
  return request({
    url: '/sys/sysPermWebController/page',
    method: 'get',
    params: { page, pageSize }
  })
}
