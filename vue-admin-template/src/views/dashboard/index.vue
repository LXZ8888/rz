<template>
  <div>
    <!-- 树形控件,data：树形数据 -->
    <el-tree
      :data="list"
      :props="{ label: 'name', children: 'child' }"
      default-expand-all
      @node-click="handleNodeClick"
    >
      <template v-slot="{ data }">
        <div class="item">
          <div class="name">{{ data.name }}</div>
          <div>管理员</div>
          <div>操作</div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: '一级 1',
          child: [
            {
              name: '二级 1-1',
              child: [
                {
                  name: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          name: '一级 2',
          child: [
            {
              name: '二级 1-1',
              child: [
                {
                  name: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          name: '一级 3',
          child: [
            {
              name: '二级 1-1',
              child: [
                {
                  name: '三级 1-1-1'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  width: 100%;
  .name {
    flex: 1;
  }
}
</style>
