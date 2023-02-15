// 1、下载axios2、导入axios 3、创建axios副本（配置基地址）4、创建请求拦截器和响应拦截器5暴露出去6、导入使用
import axios from 'axios'

import { Message } from 'element-ui'
const request = axios.create({
  // baseURL: 'http://119.91.150.211:3000/api'
  baseURL: process.env.VUE_APP_URL
  // baseURL: '/xxx'
})
request.interceptors.request.use(
  (config) => {
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
    // 失败：非2开头就是错误。
    return Promise.reject(error)
    // 等价于
    // return new Promise((resolve,reject)=>{
    //   reject(error)
    // })
  }
)
export default request
