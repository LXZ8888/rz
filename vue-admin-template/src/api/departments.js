import request from '@/utils/request'
// 组织架构列表
export const companyDepartment = () => {
  return request({
    url: '/company/department'
  })
}
