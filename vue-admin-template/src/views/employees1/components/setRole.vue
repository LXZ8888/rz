<template>
  <el-dialog title="分配角色" width="600px" :visible.sync="isShow">
    <el-checkbox
      v-for="item in list"
      :key="item.id"
      v-model="selectVal"
      :label="item.id"
    >{{ item.name }}</el-checkbox>
    <template #footer>
      <div class="tc">
        <el-button type="primary">提交</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { sysRole } from '@/api/setting'
export default {
  data() {
    return {
      isShow: false,
      list: [],
      selectVal: []
    }
  },

  methods: {
    async getData() {
      if (this.list.length === 0) {
        const res = await sysRole({
          page: 1,
          pagesize: 99999
        })
        this.list = res.data.rows
        console.log('获取角色列表', res)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tc {
  text-align: center;
}
</style>
