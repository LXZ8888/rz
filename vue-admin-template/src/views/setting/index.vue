<template>
  <div class="setting">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="角色管理" name="first">
        <el-button type="primary" size="small">新增角色</el-button>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="序号" type="index" />
          <el-table-column label="名称" prop="date" />
          <el-table-column label="描述" prop="name" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" size="small">分配权限</el-button>
              <el-button
                type="primary"
                size="small"
                @click="handleClick(scope.row)"
              >查看</el-button>
              <el-button type="danger" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center">
          <el-pagination layout="prev, pager, next" :total="50" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'second',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎'
        },
        {
          date: '2016-05-04',
          name: '王小虎'
        },
        {
          date: '2016-05-01',
          name: '王小虎'
        },
        {
          date: '2016-05-03',
          name: '王小虎'
        }
      ],
      currentRow: null
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  padding: 20px;
}
</style>
