// 1、下载axios2、导入axios 3、创建axios副本（配置基地址）4、创建请求拦截器和响应拦截器5暴露出去6、导入使用
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://119.91.150.211:3000/api'
  // baseURL: process.env.VUE_APP_URL
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
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request
