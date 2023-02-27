<template>
  <el-dialog
    :title="`为【${title}】分配权限`"
    width="700px"
    :visible.sync="isShow"
    @close="closeEvent"
  >
    <el-tree
      ref="tree"
      check-strictly
      :data="list"
      show-checkbox
      :props="{ label: 'name' }"
      default-expand-all
      node-key="id"
      :default-checked-keys="permIds"
    />
    <template #footer>
      <div class="tc">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { sysPermission } from '@/api/peimission'
import { sysRoleId, sysRoleAssignPrem } from '@/api/setting'
export default {
  data() {
    return {
      isShow: false,
      list: [],
      permIds: [], // 角色的权限点数据
      title: '',
      id: ''
    }
  },
  methods: {
    async getData() {
      if (this.list.length === 0) {
        const res = await sysPermission()
        this.list = this.changeData(res.data, '0')
        console.log(res, '权限数据列表')
      }
    },
    changeData(arr, pid) {
      return arr.filter((item) => {
        if (item.pid === pid) {
          item.children = this.changeData(arr, item.id)
          return true
        }
      })
    },
    // 获取角色详情
    async getRoleInfo(id) {
      this.id = id
      const res = await sysRoleId(id)
      this.permIds = res.data.permIds
      //   this.$refs.tree.setCheckedKeys(res.data.permIds) 不建议使用，需要数据List和dom结构渲染完成才行
      console.log(res, 'ji')
    },
    closeEvent() {
      this.$refs.tree.setCheckedKeys([])
    },
    // 确定点击
    async submit() {
      console.log(2)
      await sysRoleAssignPrem({
        id: this.id,
        permIds: this.$refs.tree.getCheckedKeys()
      })
      this.$message.success('分配权限成功')
      this.isShow = false

      //   console.log(this.$refs.tree.getCheckedKeys())
    }
  }
}
</script>

<style lang="scss" scoped>
.tc {
  text-align: center;
}
</style>
