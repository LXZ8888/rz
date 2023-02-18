import request from '@/utils/request'

export const sysProfile = () => {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 获取员工信息等头像
export const sysUser = (id) => {
  return request({
    url: '/sys/user/' + id
  })
}
