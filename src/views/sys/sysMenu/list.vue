<template>
  <div v-loading="loading" class="app-container">
    <el-tree :data="menuTree" @node-click="handleNodeClick">
      <div slot-scope="{ data }" class="div-tree-node"><span>{{ data.title }}</span><span class="span-tree-node-operate"><router-link :to="'/sysUser/edit/'+data.title" class="sys-a">编辑</router-link><a class="sys-a" href="javascript:;" @click="toDelete(data.title)">删除</a></span></div>
    </el-tree>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      loading: false,
      menuTree: null
    }
  },
  created() {
    this.loading = true
    request({
      url: '/sys/sysMenuWebController/getTree',
      method: 'get'
    }).then(response => {
      this.menuTree = response.data
      this.loading = false
    }).catch(error => {
      console.log(error)
      this.loading = false
    })
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    toDelete(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除' + id)
      })
    }
  }

}
</script>

<style scoped>
  .div-tree-node{width: 100%;}
  .span-tree-node-operate {float:right;}
  .span-tree-node-operate>a,.span-tree-node-operate>router-link{margin-right: 20px;}
</style>
