<template>
  <!-- 增删改查：查  增  删与改
       查：
        1：定义接口api
        2:导入api
        3:进入页面就调用api获取数据存储
        4：数据渲染
 -->

  <div class="departments">
    <el-card>
      <div class="main">
        <div class="tree-top">
          <div class="name">传智教育</div>
          <div class="manager">负责人</div>
          <!-- el-dropdown
                     默认插槽：默认展示 内容
                     具名插槽（dropdown）
                       el-dropdown-menu
                          el-dropdown-item
           -->
          <div class="other">
            <el-dropdown>
              <span>
                <span>操作</span>
                <i class="el-icon-arrow-down" />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <el-tree style="margin-top: 15px" :data="list" default-expand-all>
          <template v-slot="{ data }">
            <div class="tree-top">
              <div class="name">{{ data.name }}</div>
              <div class="manager">{{ data.manager }}</div>
              <div class="other">
                <el-dropdown>
                  <span>
                    <span>操作</span>
                    <i class="el-icon-arrow-down" />
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </template>
        </el-tree>
      </div>
    </el-card>
  </div>
</template>
<script>
import { companyDepartment } from '@/api/departments'
export default {
  data() {
    return {
      list: [
        {
          name: '总裁办',
          manager: '管理员',
          children: [
            {
              name: '深圳分公司',
              manager: '张宇'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await companyDepartment()
      this.list = this.changeData(res.data.depts, '')
      console.table(res.data.depts)
    },
    // 树形数据转换
    changeData(arr, pid) {
      // 1:找出第一层数据
      // 2:能找出任意项的子集（将pid使用形参）
      // 3:给找出的每一项加入children=[]
      // 4:使用递归找出当前项的子集（子集的pid是自己的id）
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
<style lang="scss" scoped>
.departments {
  padding: 15px;
  .main {
    width: 80%;
    margin: 30px auto;
  }
  .tree-top {
    width: 100%;
    display: flex;
    align-items: center;
    .name {
      flex: 1;
    }
    .manager {
      width: 150px;
    }
  }
}
</style>
