// 1、下载axios2、导入axios 3、创建axios副本（配置基地址）4、创建请求拦截器和响应拦截器5暴露出去6、导入使用
import axios from 'axios'
import store from '@/store'

import { Message } from 'element-ui'
import router from '@/router'
const request = axios.create({
  // baseURL: 'http://119.91.150.211:3000/api'
  baseURL: process.env.VUE_APP_URL
  // baseURL: '/xxx'
})
request.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
request.interceptors.response.use(
  (res) => {
    // 成功：状态码2开头都是成功，但是本项目错误状态码也是200.
    if (res.data.success) {
      return res.data
    } else {
      // 错误提示
      Message.error(res.data.message)
      // return Promise.reject(res.data.message)
      return Promise.reject(new Error(res.data.message))
    }
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Message.error(error.response.data.message)
      store.commit('user/LOGOUT')
      router.push('/login')
    }
    console.dir(error)
    // log打印出来的是字符串，无法点击打开查看里面的错误信息。dir打印的是对象，可以查看里面的报错信息
    // 失败：非2开头就是错误。
    return Promise.reject(error)
    // 等价于
    // return new Promise((resolve,reject)=>{
    //   reject(error)
    // })

    // token失效
    // 1、判断状态码401时进入处理2、提示一下3、清空token,清空用户信息4、跳转到登录页.清空token这项目需要到vuex里面写。
  }
)
export default request
