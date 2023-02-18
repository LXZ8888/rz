import Vue from 'vue'
// 全局自定义指令
const dirs = {
  hmxxx: {},
  hmooo: {},
  errorimg: {
    inserted(dom, obj, vnode) {
      dom.src = dom.src || obj.value || require('@/assets/common/head.jpg')
      dom.onerror = () => {
        dom.src = obj.value || require('@/assets/common/head.jpg')
      }
    },
    componentUpdated(dom, obj, vnode) {
      dom.src = dom.src || obj.value || require('@/assets/common/head.jpg')
    }
  }
}

// 循环对象 for in
for (const key in dirs) {
  Vue.directive(key, dirs[key])
}
// // 数值循环

// Vue.directive('errorimg', {
//   inserted(dom, obj, vnode) {
//     dom.src = dom.src || obj.value || require('@/assets/common/head.jpg')
//     dom.onerror = () => {
//       dom.src = obj.value || require('@/assets/common/head.jpg')
//     }
//   },
//   componentUpdated(dom, obj, vnode) {
//     dom.src = dom.src || obj.value || require('@/assets/common/head.jpg')
//   }
// })

// // 其他的自定义指令。重复操作会冗余，所以又优化了一下。
