import request from '@/utils/request'
// 获取员工列表
export const sysUser = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}
