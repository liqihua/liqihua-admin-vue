<template>
  <div v-loading="loading" class="app-container">
    <el-tabs @tab-click="tabAddClick">
      <el-tab-pane label="权限列表"/>
      <el-tab-pane name="add"><router-link slot="label" to="/sys/sysPerm/add">新增权限</router-link></el-tab-pane>
    </el-tabs>
    <zk-table
      ref="table"
      :is-fold="true"
      :data="permTree"
      :columns="columns"
      :stripe="true"
      :border="true"
      :tree-type="true"
      :expand-type="false"
      :selection-type="false">
      <template slot="operation" slot-scope="scope">

        <router-link v-if="scope.row.id" :to="'/sys/sysPerm/edit/'+scope.row.id">编辑</router-link>
        <a  v-if="scope.row.id" href="javascript:;" @click="doDelete(scope.row.id)">删除</a>
      </template>
    </zk-table>
  </div>
</template>

<script>
import Vue from 'vue'
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)
import { apiDelete, apiListGroupByMenuId } from '@/api/sys/sysPerm'

export default {
  data() {
    return {
      loading: false,
      list: [],
      page: 1,
      pageSize: 30,
      permTree: [],
      columns: [
        {
          label: '所属菜单',
          prop: 'menuName'
        },
        {
          label: '权限名称',
          prop: 'name'
        },
        {
          label: '权限符号',
          prop: 'symbol'
        },
        {
          label: '备注',
          prop: 'remarks'
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
    this.doPage()
  },
  methods: {
    tabAddClick(tab) {
      if(tab && tab.name) {
        this.$router.push('/sys/sysPerm/add')
      }
    },
    doPage() {
      this.loading = true
      apiListGroupByMenuId().then(response => {
        this.permTree = []
        for(let key in response.data){
          let menu = new Object();
          menu.menuName = response.data[key].title
          menu.name = null
          menu.symbol = null
          menu.remarks = null
          if(response.data[key].permList) {
            let permList = response.data[key].permList;
            menu.children = []
            for(let key in permList) {
              let perm = new Object();
              perm.id = permList[key].id
              perm.menuName = menu.menuName
              perm.name = permList[key].name
              perm.symbol = permList[key].symbol
              perm.remarks = permList[key].remarks
              menu.children.push(perm)
            }
          }
          this.permTree.push(menu)
        }
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    doDelete(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        apiDelete(id).then(response => {
          this.doPage()
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
