import { setToken, getToken } from '@/utils/auth'
import { sysProfile } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: '' || getToken(),
    userInfo: ''
  },
  mutations: {
    // 大写代表在mutation里面，小写在action里面。
    SETTOKEN(state, value) {
      state.token = value
      setToken(value)
    },
    SETUSERINFO(state, value) {
      state.userInfo = value
    }
  },
  actions: {
    setToken(ctx, value) {
      ctx.commit('SETTOKEN', value)
    },
    // 获取用户信息
    async getUserInfo(ctx) {
      const res = await sysProfile()
      ctx.commit('SETUSERINFO', res.data)
      console.log('用户信息', res)
    }
  }
}
