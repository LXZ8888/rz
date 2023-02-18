<template>
  <div class="departments">
    <el-card>
      <div class="main">
        <div class="tree-top">
          <div class="name">传智教育</div>
          <div class="manager">负责人</div>
          <div class="other">
            <el-dropdown>
              <span> 操作 </span>
              <i class="el-icon-arrow-down" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <!-- 树形控件,data：树形数据 -->
        <el-tree
          style="margin-top: 15px"
          :data="list"
          default-expand-all
          @node-click="getData"
        >
          <template v-slot="{ data }">
            <div class="tree-top">
              <div class="name">{{ data.name }}</div>
              <div class="manager">{{ data.manager }}</div>
              <div class="other">
                <el-dropdown>
                  <span> 操作 </span>
                  <i class="el-icon-arrow-down" />
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑子部门</el-dropdown-item>
                      <el-dropdown-item>删除子部门</el-dropdown-item>
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
              manager: '张宁'
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
      console.log(res)
      this.list = res.data.depts
    }
  }
}
</script>

<style scoped lang="scss">
.departments {
  padding: 15px;
  .main {
    width: 80%;
    margin: 30px auto;
  }
  .tree-top {
    display: flex;
    align-items: center;
    width: 100%;
    .name {
      flex: 1;
    }
    .manager {
      width: 150px;
    }
  }
}
</style>
