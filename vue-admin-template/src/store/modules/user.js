import { setToken, getToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '' || getToken()
  },
  mutations: {
    // 大写代表在mutation里面，小写在action里面。
    SETTOKEN(state, value) {
      state.token = value
      setToken(value)
    }
  },
  actions: {
    setToken(ctx, value) {
      ctx.commit('SETTOKEN', value)
    }
  }
}
