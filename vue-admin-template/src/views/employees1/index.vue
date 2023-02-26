<template>
  <div class="employees">
    <el-card class="mb15">
      <div class="top">
        <div class="left">
          <i class="el-icon-info" />
          <span>共{{ total }}条记录</span>
        </div>
        <div class="right">
          <el-button
            size="small"
            type="danger"
            @click="exportClick"
          >简单表头导出</el-button>
          <el-button size="small" type="info">复杂表头导出</el-button>
          <el-button
            size="small"
            type="success"
            @click="$router.push('/employees/import')"
          >excel导入</el-button>
          <el-button
            size="small"
            type="primary"
            @click="addEvent"
          >新增员工</el-button>
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
            <img
              v-errorimg
              alt=""
              :src="row.staffPhoto"
              class="avatar"
              @click="imgClick(row.staffPhoto)"
            >
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
        <el-table-column
          prop="timeOfEntry"
          label="入职时间"
          sortable
          :formatter="changeTime"
        />
        <el-table-column
          prop="enableState"
          label="账号状态"
          sortable
          :formatter="changeWorkingState"
        />
        <el-table-column label="操作" width="300">
          <template v-slot="{ row }">
            <el-button
              type="text"
              @click="$router.push('/employees/detail/' + row.id)"
            >查看</el-button>
            <el-button type="text">转正</el-button>
            <el-button type="text">调岗</el-button>
            <el-button type="text">离职</el-button>
            <el-button type="text" @click="roleEvent">角色</el-button>
            <el-button type="text" @click="delEvent(row.id)">删除</el-button>
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
    <!-- 新增弹框 -->
    <Add ref="add" @getData="getData" />
    <el-dialog title="生成二维码" width="500px" :visible.sync="showCode">
      <canvas ref="canvas" />
    </el-dialog>
    <!-- 角色管理 -->
    <SetRole ref="setRole" />
  </div>
</template>
<script>
import SetRole from './components/setRole.vue'
import dayjs from 'dayjs'
import Add from './components/add.vue'
import { sysUser, sysUserDelete } from '@/api/employees'
import employeesData from '@/api/constant/employees'
import { export_json_to_excel } from '@/vendor/Export2Excel'
import Qrcode from 'qrcode'

export default {
  components: {
    Add,
    SetRole
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 10,
      showCode: false
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
      // console.log(res)
    },
    changeFormOfEmployment(row, column, cellValue, index) {
      // employeesData.hireType=[{id:1,value:'正式'}。。。]
      // find：找到返回值是找到项的值，找不到返回undefined
      const findItem = employeesData.hireType.find(
        (item) => item.id === +cellValue
      )
      return findItem ? findItem.value : '-'
    },
    // 入职时间数据转换
    changeTime(row, column, cellValue, index) {
      // dayjs使用  1、下载 2、导入 3、使用
      return dayjs(cellValue).format('YYYY-MM-DD')
    },
    // 状态数据转换
    changeWorkingState(row, column, cellValue, index) {
      // employeesData.hireType=[{id:1,value:'正式'}。。。]
      // find：找到返回值是找到项的值，找不到返回undefined
      const findItem = employeesData.workingState.find(
        (item) => +item.id === cellValue
      )
      return findItem ? findItem.value : '-'
    },
    // 新增按钮弹框
    addEvent() {
      this.$refs.add.isShow = true
    },
    delEvent(id) {
      this.$confirm('确定要删除吗', '提示')
        .then(async() => {
          await sysUserDelete(id)
          this.$message.success('删除成功')
          if (this.page.page > 1 && this.list.length === 1) {
            this.page.page--
          }
          this.getData()
        })
        .catch(() => {})
    },
    async exportClick() {
      const res = await sysUser({ page: 1, size: 99999 })
      // const userArr = res.data.rows
      const data = res.data.rows.map((item) => {
        return [
          item['username'],
          item['mobile'],
          item['workNumber'],
          this.changeFormOfEmployment(null, null, item['formOfEmployment']),
          item['departmentName'],
          this.changeTime(null, null, item['timeOfEntry']),
          this.changeWorkingState(null, null, item['enableState'])
          // item['correctionTime']
        ]
      })

      export_json_to_excel({
        header: [
          '姓名',
          '手机号码',
          '工号',
          '聘用形式',
          '部门',
          '入职时间',
          '账号状态'
        ],
        filename: '人资用户列表',
        // merges: ['A2', 'A3'],
        data: data
      })
      this.$message.success('导出成功')
      // console.log(userArr)
      // console.log(res)
      // console.log(this.list)
    },
    // 头像点击生成二维码
    imgClick(avatar) {
      this.showCode = true
      if (avatar) {
        this.$nextTick(() => {
          Qrcode.toCanvas(this.$refs.canvas, avatar, {
            // 二维码的配制，常用配制，宽与高之类
            width: 350,
            height: 350
          })
        })
      }
    },
    roleEvent() {
      this.$refs.setRole.isShow = true
      this.$refs.setRole.getData()
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
