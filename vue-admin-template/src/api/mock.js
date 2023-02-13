// // 拦截ajax请求产生随机数据
// // mockjs  src/api/mock.js
// // 1:下载安装
// // 2:导入
// import Mockjs from 'mockjs'
// // 3:拦截ajax产生随机数据
// Mockjs.mock('http://geek.itheima.net/v1_0/channels', {
//   data: {
//     'channels|10': [
//       {
//         'id|+1': 0,
//         name: '@word(5)',
//         img: Mockjs.Random.image('200x100', '#4A7BF7', 'Hello')
//       }
//     ]
//   },
//   message: 'OK'
// })
// // 4:使用该代码  在main.js导入使用  import '@/api/mock'
