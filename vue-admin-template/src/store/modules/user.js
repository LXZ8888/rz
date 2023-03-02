// import { setToken, getToken } from '@/utils/auth'
import { sysProfile, sysUser } from '@/api/user'
import router, { otherRoutes, constantRoutes, resetRouter } from '@/router'

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
      resetRouter()
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
      // 动态路由
      // res3把用户信息一起拿过来。res.userInfo.roles.menus
      const newArr = otherRoutes.filter((item) => {
        return res3.roles.menus.includes(item.meta.name)
      })
      router.addRoutes(newArr)
      newArr.push({ path: '*', redirect: '/404', hidden: true })
      // 手动把已经匹配好的动态路由+默认静态路由组合好。默认是静态路由
      router.options.routes = [...constantRoutes, ...newArr]
      console.log('newArr', newArr)
    }
  }
}
