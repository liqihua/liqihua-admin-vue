<template>
  <div v-loading="loading" class="app-container">
    <el-tabs>
      <el-tab-pane label="角色列表"/>
      <el-tab-pane><router-link slot="label" to="/sysRole/add">新增角色</router-link></el-tab-pane>
    </el-tabs>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column label="角色名称" align="center"><template slot-scope="scope">{{ scope.row.name }}</template></el-table-column>
      <el-table-column label="备注" align="center"><template slot-scope="scope">{{ scope.row.remarks }}</template></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/sysRole/edit/'+scope.row.id">编辑</router-link><br>
          <a @click="doDelete(scope.row.id)">删除</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { apiPage, apiDelete } from '@/api/sys/sysRole'

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
