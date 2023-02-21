import request from '@/utils/request'
export const sysRole = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
// 定义新增角色
export const sysRolePost = (data) => {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// 定义新增角色
export const sysRoleDelete = (id) => {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}
// 定义编辑角色
export const sysRolePut = (data) => {
  return request({
    url: '/sys/role/' + data.id,
    method: 'put',
    data
  })
}
