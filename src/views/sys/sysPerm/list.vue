<template>
  <div v-loading="loading" class="app-container">
    <el-tabs>
      <el-tab-pane label="权限列表"/>
      <el-tab-pane><router-link slot="label" to="/sysPerm/add">新增权限</router-link></el-tab-pane>
    </el-tabs>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column label="所属菜单" align="center"><template slot-scope="scope">{{ scope.row.menu.title }}</template></el-table-column>
      <el-table-column label="权限名称" align="center"><template slot-scope="scope">{{ scope.row.perm.name }}</template></el-table-column>
      <el-table-column label="权限符号" align="center"><template slot-scope="scope">{{ scope.row.perm.symbol }}</template></el-table-column>
      <el-table-column label="备注" align="center"><template slot-scope="scope">{{ scope.row.perm.remarks }}</template></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/sysPerm/edit/'+scope.row.perm.id">编辑</router-link><br>
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
          this.page()
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
