<template>
  <div class="permission">
    <el-card class="top">
      <div class="tr" style="text-align: right">
        <el-button type="primary" @click="addEvent('')">添加权限</el-button>
      </div>
    </el-card>

    <el-table :data="list" border row-key="id">
      <el-table-column label="名称" prop="name" />
      <el-table-column label="标识" prop="code" />
      <el-table-column label="描述" prop="description" />
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            v-if="row.type === 1"
            type="text"
            @click="addEvent2(row.id, 2)"
          >添加</el-button>

          <el-button type="text" @click="editEvent(row)">编辑</el-button>
          <el-button type="text" @click="delEvent(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增弹框组件 -->
    <Add ref="add" @getData="getData" />
  </div>
  <!-- {
    "id": "604f7df5f900be1850edb152",
    "name": "员工管理",
    "code": "employees",
    "description": "用户管理菜单",

} -->
</template>
<script>
import { sysPermission, sysPermissionDelete } from '@/api/peimission'
import Add from './component/add.vue'

export default {
  components: {
    Add
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 树形数据转换
    async getData() {
      const res = await sysPermission()
      this.list = this.changData(res.data, '0')
      // console.log('获取', res.data)
      console.table(res.data)
    },
    changData(arr, pid) {
      return arr.filter((item) => {
        if (item.pid === pid) {
          item.children = this.changData(arr, item.id)
          return true
        }
      })
    },
    addEvent() {
      this.$refs.add.isShow = true
      this.$refs.add.mode = 'add'
    },
    addEvent2(id) {
      this.$refs.add.isShow = true
      this.$refs.add.mode = 'add'
      this.$refs.add.form.type = 2
      this.$refs.add.form.pid = id
    },
    // 编辑打击
    editEvent(row) {
      this.$refs.add.isShow = true
      this.$refs.add.mode = 'edit'
      this.$refs.add.form = JSON.parse(JSON.stringify(row))
      console.log(JSON.parse(JSON.stringify(row)))
    },
    // 删除事件
    delEvent(id) {
      this.$confirm('您确定删除该项目吗')
        .then(async() => {
          await sysPermissionDelete(id)
          this.$message.success('删除成功')
          this.getData()
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.permission {
  padding: 20px;

  .top {
    margin-bottom: 20px;
  }
}
</style>
