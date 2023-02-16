import request from '@/utils/request'
import store from '@/store'

export const sysProfile = (data) => {
  return request({
    url: '/sys/profile',
    method: 'post',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    },
    data
  })
}
