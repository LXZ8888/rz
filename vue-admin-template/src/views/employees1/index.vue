<template>
  <div class="employees">
    <el-card class="mb15">
      <div class="top">
        <div class="left">
          <i class="el-icon-info" />
          <span>共{{ total }}条记录</span>
        </div>
        <div class="right">
          <el-button size="small" type="danger">简单表头导出</el-button>
          <el-button size="small" type="info">复杂表头导出</el-button>
          <el-button size="small" type="success">excel导入</el-button>
          <el-button size="small" type="primary" plain>新增员工</el-button>
        </div>
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="list"
        border
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <!--
        {
    "id": "604f764971f93f3ac8f365c2",
    "mobile": "13800000002",
    "username": "管理员",
    "password": "e10adc3949ba59abbe56e057f20f883e",
    "enableState": 1,
    "timeOfEntry": "2018-11-02",
    "formOfEmployment": 1,
    "workNumber": "9002",
    "correctionTime": "2018-11-30",
    "departmentName": "总裁办",
    "staffPhoto": "http://q6cu3t6jv.bkt.clouddn.com/1063705989926227968?t=1616204161907"
}
       -->
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="username" label="姓名" sortable width="100" />
        <el-table-column prop="mobile" label="手机号码" sortable width="150" />
        <el-table-column prop="staffPhoto" label="头像" sortable>
          <template v-slot="{ row }">
            <!-- <div>{{ row.staffPhoto }}</div> -->
            <img v-errorimg alt="" :src="row.staffPhoto" class="avatar">
          </template>
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" sortable />
        <el-table-column
          prop="formOfEmployment"
          label="聘用形式"
          sortable
          :formatter="changeFormOfEmployment"
        />
        <el-table-column prop="departmentName" label="部门" sortable />
        <el-table-column prop="timeOfEntry" label="入职时间" sortable />
        <el-table-column prop="enableState" label="账号状态" sortable />
        <el-table-column label="操作" width="300">
          <template>
            <el-button type="text">查看</el-button>
            <el-button type="text">转正</el-button>
            <el-button type="text">调岗</el-button>
            <el-button type="text">离职</el-button>
            <el-button type="text">角色</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          layout="total,sizes,prev, pager, next"
          :total="total"
          :current-page.sync="page.page"
          :page-sizes="[1, 5, 10, 20, 50, 100]"
          :page-size.sync="page.size"
          @size-change="getData"
          @current-change="getData"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import { sysUser } from '@/api/employees'
export default {
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 10
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await sysUser(this.page)
      this.list = res.data.rows
      this.total = res.data.total
      console.log(res)
    },
    changeFormOfEmployment(row, column, cellValue, index) {
      return cellValue === 1 ? '正式' : '非正式'
    }
  }
}
</script>
<style lang="scss" scoped>
.employees {
  padding: 20px;
  .avatar {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .page {
    text-align: center;
    padding-top: 15px;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      padding: 6px;
      border: 1px solid #91d5ff;
      background-color: #e6f7ff;
      border-radius: 5px;
      i {
        color: #409eff;
        padding-right: 7px;
      }
    }
  }
}
</style>
