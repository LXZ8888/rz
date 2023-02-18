// import { setToken, getToken } from '@/utils/auth'
import { sysProfile, sysUser } from '@/api/user'

export default {
  namespaced: true,
  state: {
    // token: '' || getToken(),
    token: '',
    userInfo: ''
  },
  mutations: {
    // 大写代表在mutation里面，小写在action里面。
    SETTOKEN(state, value) {
      state.token = value
      // setToken(value)
    },
    SETUSERINFO(state, value) {
      state.userInfo = value
    },
    // 退出处理
    LOGOUT(state) {
      state.token = ''
      // setToken('')
      state.userInfo = ''
    }
  },
  actions: {
    setToken(ctx, value) {
      ctx.commit('SETTOKEN', value)
    },
    // 获取用户信息
    async getUserInfo(ctx) {
      const res = await sysProfile()
      const res2 = await sysUser(res.data.userId)
      const res3 = Object.assign({}, res.data, res2.data)
      ctx.commit('SETUSERINFO', res3)
    }
  }
}
