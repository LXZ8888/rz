import request from '@/utils/request'
// 获取员工列表
export const sysUser = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}
// 新增员工
export const sysUserPost = (data) => {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
// 删除员工
export const sysUserDelete = (id) => {
  return request({
    url: '/sys/user/' + id,
    method: 'delete'
  })
}
