<template>
  <div v-loading="loading" class="app-container">
    <el-tabs @tab-click="tabAddClick">
      <el-tab-pane label="角色列表"/>
      <el-tab-pane name="add"><router-link slot="label" to="/sysRole/add">新增角色</router-link></el-tab-pane>
    </el-tabs>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column label="角色名称" prop="name" align="center"/>
      <el-table-column label="拥有菜单" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.menuList">
            <span v-for="menu in scope.row.menuList ">{{ menu.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="拥有权限" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.permList">
            <span v-for="perm in scope.row.permList ">{{ perm.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remarks" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/sysRole/edit/'+scope.row.id">编辑</router-link><br>
          <router-link :to="'/sysRole/setPerm/'+scope.row.id">分配权限</router-link><br>
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
    tabAddClick(tab) {
      if(tab && tab.name) {
        this.$router.push('/sysRole/add')
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

<style scoped>
  span{ display: block; }
</style>
