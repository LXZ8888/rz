import request from '@/utils/request'

export const sysProfile = (data) => {
  return request({
    url: '/sys/profile',
    method: 'post',

    data
  })
}
