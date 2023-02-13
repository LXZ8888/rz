/*
1：安装axios
2:导入axios
3:创建axios副本
4：创建axios的请求拦截与响应拦截
5：暴露axios副本
*/
import axios from 'axios'
const _axios = axios.create({
  // 基地址：如果昨天你们配制好本地接口了且能启动成功了，启动后加入基地址到这里
  // 本地接口基地址: http://localhost:3000/api
  // 如果没有配制好的直接使用线上接口地址
  //   在线接口基地址:http://119.91.150.211:3000/api
  baseURL: 'http://localhost:3000/api'
})
_axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
_axios.interceptors.response.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
export default _axios
