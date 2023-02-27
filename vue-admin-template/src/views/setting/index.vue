<template>
  <!-- 查： -->
  <div class="setting">
    <el-tabs>
      <el-tab-pane label="角色管理" name="first">
        <el-button
          type="primary"
          size="small"
          @click="addEvent"
        >新增角色</el-button>

        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column label="序号" type="index" width="80px" />
          <el-table-column label="名称" prop="name" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button
                type="success"
                size="small"
                @click="setEvent(row)"
              >分配权限</el-button>
              <el-button
                type="primary"
                size="small"
                @click="editEvent(row)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="small"
                @click="delEvent(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center; padding-top: 20px">
          <el-pagination
            :current-page.sync="page.page"
            layout="sizes,prev, pager, next"
            :total="total"
            :page-size.sync="page.pagesize"
            :page-sizes="[1, 5, 10, 100]"
            @size-change="getData"
            @current-change="getData"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second" lazy><Info /></el-tab-pane>
    </el-tabs>
    <!-- 新增弹框组件 -->
    <Add ref="add" @getData="getData" />
    <!-- 分配权限弹框 -->
    <setPermission ref="set" />
  </div>
</template>

<script>
import Add from './components/add.vue'
import SetPermission from './components/setPermission.vue'
// import Info from './components/info.vue'
import { sysRole, sysRoleDelete } from '@/api/setting.js'
export default {
  components: {
    Add,
    Info: () => import('./components/info.vue'),
    SetPermission
  },
  data() {
    return {
      activeName: 'second',
      page: {
        page: 1,
        pagesize: 1
      },
      total: 50,
      tableData: [],
      currentRow: null
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },

    async getData() {
      const res = await sysRole(this.page)
      this.tableData = res.data.rows
      console.log('角色列表', res)
      this.total = res.data.total
    },
    // 新增
    addEvent() {
      this.$refs.add.isShow = true
      this.$refs.add.mode = 'add'
    },
    // 编辑
    editEvent(row) {
      this.$refs.add.isShow = true
      this.$refs.add.mode = 'edit'
      this.$refs.add.form = JSON.parse(JSON.stringify(row))
    },

    // 删除点击事件
    delEvent(id) {
      this.$confirm('您确定删除该项目吗')
        .then(async() => {
          console.log('121')
          await sysRoleDelete(id)

          this.$message.success('删除成功')
          // 如果当前页只有一条数据&&页码要大于1
          if (this.tableData.length === 1 && this.page.page > 1) {
            this.page.page--
          }
          this.getData()
        })
        .catch(() => {})
    },
    // 分配权限点击
    setEvent(row) {
      this.$refs.set.isShow = true
      // 调用弹框组件获取列表
      this.$refs.set.getData()
      // 调用弹框方法获取详情
      this.$refs.set.getRoleInfo(row.id)
      this.$refs.set.title = row.name // 子=父
      // this.title=row.title  忘记是在不同的组件调用  父
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  padding: 20px;
}
</style>
