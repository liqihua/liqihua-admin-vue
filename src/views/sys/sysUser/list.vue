<template>
  <div v-loading="loading" class="app-container">
    <el-tabs value="list" @tab-click="tabClick">
      <el-tab-pane label="用户列表" name="list"/>
      <el-tab-pane label="新增用户" name="add"/>
    </el-tabs>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column label="账号" prop="username" align="center"/>
      <el-table-column label="昵称" prop="nickname" align="center"/>
      <el-table-column label="姓名" prop="realName" align="center"/>
      <el-table-column label="性别" align="center"><template slot-scope="scope">{{ scope.row.gender?'男':'女' }}</template></el-table-column>
      <el-table-column label="头像" align="center">
        <template v-if="scope.row.avatar" slot-scope="scope">
          <img v-if="scope.row.avatar" :src="scope.row.avatar" class="avatar" style="width: 80px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column label="手机" prop="mobile" align="center"/>
      <el-table-column label="锁定" align="center"><template slot-scope="scope">{{ scope.row.locked?'冻结':'正常' }}</template></el-table-column>
      <el-table-column label="拥有角色" align="center">
        <template slot-scope="scope">
          <span v-for="role in scope.row.roleList" class="span-role">{{ role.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createDate" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/sys/sysUser/edit/'+scope.row.id">编辑</router-link><br>
          <router-link :to="'/sys/sysUser/setRole/'+scope.row.id">分配角色</router-link><br>
          <a @click="doDelete(scope.row.id)">删除</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { apiPage, apiDelete } from '@/api/sys/sysUser'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      loading: false,
      list: null,
      page: 1,
      pageSize: 30
    }
  },
  created() {
    this.doPage()
  },
  methods: {
    tabClick(tab) {
      if(tab.name == 'add') {
        this.$router.push('/sys/sysUser/add')
      }
    },
    doPage() {
      this.loading = true
      apiPage(this.page, this.pageSize).then(response => {
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
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.doPage()
        }).catch(error => {
          console.log(error)
        })
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
  .span-role{display: block;}
</style>
