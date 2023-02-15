import router from './router'
import store from '@/store' // store===this.$store
const whitePage = ['/login', '/404']
router.beforeEach((to, from, next) => {
  if (store.state.user.token) {
    if (to.path.toLowerCase() === '/login') {
      next('/')
    } else {
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
