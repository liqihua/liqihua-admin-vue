<template>
  <div v-loading="loading" class="app-container">
    <el-tabs @tab-click="tabAddClick">
      <el-tab-pane label="权限列表"/>
      <el-tab-pane name="add"><router-link slot="label" to="/sys/sysPerm/add">新增权限</router-link></el-tab-pane>
    </el-tabs>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column label="所属菜单" prop="menu.title" align="center"/>
      <el-table-column label="权限名称" prop="perm.name" align="center"/>
      <el-table-column label="权限符号" prop="perm.symbol" align="center"/>
      <el-table-column label="备注" prop="perm.remarks" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/sys/sysPerm/edit/'+scope.row.perm.id">编辑</router-link><br>
          <a @click="doDelete(scope.row.perm.id)">删除</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { apiPage, apiDelete } from '@/api/sys/sysPerm'

export default {
  data() {
    return {
      loading: false,
      list: [],
      page: 1,
      pageSize: 30
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
      apiPage(this.page,this.pageSize).then(response => {
        this.list = response.data.records
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
