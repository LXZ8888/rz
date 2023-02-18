<template>
  <div />
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    // 树形数据转换

    const list = [
      {
        name: '广东',
        id: 1,
        pid: ''
      },
      {
        name: '广州',
        id: 2,
        pid: 1
      },
      {
        name: '深圳',
        id: 3,
        pid: 1
      },
      {
        name: '宝安',
        id: 4,
        pid: 3
      },
      {
        name: '石岩',
        id: 5,
        pid: 4
      }
    ]
    // 1、找出第一层数据
    console.log(this.changeData(list, ''))
    // 2、找出广东的子集
    console.log(this.changeData(list, 1))
    // 3、找出来的数据都要有children=[]
    // 4、children的值应该是当前项的子集，当前项的id是子集的pid
  },
  methods: {
    changeData(arr, pid) {
      return arr.filter((item) => {
        if (item.pid === pid) {
          item.children = this.changeData(arr, item.id)
          return true
        }
      })
    }
  }
}
</script>

<style></style>
