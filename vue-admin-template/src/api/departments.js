import request from '@/utils/request'
// 组织架构列表
export const companyDepartment = () => {
  return request({
    url: '/company/department'
  })
}
// 获取员工简单权限列表
export const sysUserSimple = () => {
  return request({
    url: '/sys/user/simple'
  })
}
// 获取新增部门
export const companyDepartmentPost = (data) => {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 删除部门
export const companyDepartmentDelete = (id) => {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}
