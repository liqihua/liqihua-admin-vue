<template>
  <div v-loading="loading" class="app-container">
    <el-tabs>
      <el-tab-pane label="菜单列表"/>
      <el-tab-pane><router-link slot="label" to="/sysMenu/add">新增菜单</router-link></el-tab-pane>
    </el-tabs>
    <zk-table
      ref="table"
      :data="menuTree"
      :columns="columns"
      :stripe="true"
      :border="true"
      :tree-type="true"
      :expand-type="false"
      :selection-type="false">
      <template slot="hide" slot-scope="scope">
        {{ scope.row.hide?'隐藏':'正常' }}
      </template>
      <template slot="operation" slot-scope="scope">
        <router-link :to="'/sysMenu/edit/'+scope.row.id">编辑</router-link>
        <a href="javascript:;" @click="toDelete(scope.row.id)">删除</a>
      </template>
    </zk-table>
  </div>
</template>

<script>
import Vue from 'vue'
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)
import { getTree, toDelete } from '@/api/sys/sysMenu'

export default {
  data() {
    return {
      loading: false,
      menuTree: [],
      columns: [
        {
          label: '菜单明恒',
          prop: 'title'
        },
        {
          label: '路由名称',
          prop: 'routerName'
        },
        {
          label: '显示',
          prop: 'hide',
          type: 'template',
          template: 'hide'
        },
        {
          label: '排序',
          prop: 'rank'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operation'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      getTree().then(response => {
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
        toDelete(id).then(() => {
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
