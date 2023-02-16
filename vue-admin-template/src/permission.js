// 用户信息获取 1、定义接口api 2、在Vuex中导入api 3、在action中定义方法获取用户信息存储到state 4、在导航收尾中调用触发
import router from './router'
import store from '@/store' // store===this.$store
const whitePage = ['/login', '/404']
router.beforeEach((to, from, next) => {
  if (store.state.user.token) {
    if (to.path.toLowerCase() === '/login') {
      next('/')
    } else {
      console.log('调用接口获取用户信息')
      store.dispatch('user/getUserInfo')
      next()
    }
  } else {
    if (whitePage.includes(to.path.toLowerCase())) {
      next()
    } else {
      next('/login')
    }
  }
})
router.afterEach((to, from) => {})
