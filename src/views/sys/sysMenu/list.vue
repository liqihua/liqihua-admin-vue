<template>
  <div v-loading="loading" class="app-container">
    <el-tabs>
      <el-tab-pane label="菜单列表"/>
      <el-tab-pane><router-link slot="label" to="/sysMenu/add">新增菜单</router-link></el-tab-pane>
    </el-tabs>
    <el-tree :data="menuTree">
      <div slot-scope="{ data }" class="div-tree-node">
        <span class="span-menu-field">{{ data.title }}</span>
        <span class="span-menu-field">{{ data.routerName }}</span>
        <span class="span-menu-field">{{ data.hide?'隐藏':'显示' }}</span>
        <span class="span-menu-field">{{ data.rank }}</span>
        <span class="span-tree-node-operate">
          <router-link :to="'/sysMenu/edit/'+data.id">编辑</router-link>
          <a href="javascript:;" @click="toDelete(data.id)">删除</a>
        </span>
      </div>
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
    this.getList()
  },
  methods: {
    getList() {
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
    toDelete(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        request({
          url: '/sys/sysMenuWebController/delete',
          method: 'post',
          data: 'id=' + id
        }).then(() => {
          this.getList()
          this.loading = false
        }).catch(error => {
          console.log(error)
          this.loading = false
        })
      })
    }
  }

}
</script>

<style scoped>
  .div-tree-node{width: 100%;}
  .span-tree-node-operate {float:right;}
  .span-tree-node-operate>a,.span-tree-node-operate>router-link{margin-right: 20px;}
  .span-menu-field{width: 120px;display: inline-block;font-family: 微软雅黑;text-align: left;}
  .span-menu-field:not(:first-child){margin-left: 20px;}
</style>
