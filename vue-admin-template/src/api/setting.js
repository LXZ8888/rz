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
// 定义企业id
export const company = (id) => {
  return request({
    url: '/company/' + id
  })
}
// 获取角色详情
export const sysRoleId = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}
// 给角色分配权限
export const sysRoleAssignPrem = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
