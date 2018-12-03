<template>
  <div v-loading="loading" class="app-container">
    <el-tabs>
      <el-tab-pane label="用户列表"/>
      <el-tab-pane><router-link slot="label" to="/sysUser/add">新增用户</router-link></el-tab-pane>
    </el-tabs>
    <el-table
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="账号" align="center"><template slot-scope="scope">{{ scope.row.username }}</template></el-table-column>
      <el-table-column label="昵称" align="center"><template slot-scope="scope">{{ scope.row.nickname }}</template></el-table-column>
      <el-table-column label="姓名" align="center"><template slot-scope="scope">{{ scope.row.realName }}</template></el-table-column>
      <el-table-column label="性别" align="center"><template slot-scope="scope">{{ scope.row.gender?'男':'女' }}</template></el-table-column>
      <el-table-column label="头像" align="center">
        <template v-if="scope.row.avatar" slot-scope="scope">
          <img v-if="scope.row.avatar" :src="scope.row.avatar" class="avatar" style="width: 80px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column label="手机" align="center"><template slot-scope="scope">{{ scope.row.mobile }}</template></el-table-column>
      <el-table-column label="备注" align="center"><template slot-scope="scope">{{ scope.row.remarks }}</template></el-table-column>
      <el-table-column label="锁定" align="center"><template slot-scope="scope">{{ scope.row.locked?'冻结':'正常' }}</template></el-table-column>
      <el-table-column label="创建时间" align="center"><template slot-scope="scope">{{ scope.row.createDate }}</template></el-table-column>
      <el-table-column label="更新时间" align="center"><template slot-scope="scope">{{ scope.row.updateDate }}</template></el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          <router-link :to="'/sysUser/edit/'+scope.row.id">编辑</router-link><br>
          <a @click="toDelete(scope.row.id)">删除</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '@/utils/request'
import { page } from '@/api/sys/sysUser'

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
      list: null,
      loading: false,
      page: 1,
      pageSize: 30
    }
  },
  created() {
    this.toList()
  },
  methods: {
    toList() {
      this.loading = true
      page(this.page, this.pageSize).then(response => {
        this.list = response.data.records
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
          url: '/sys/sysUserWebController/delete',
          method: 'post',
          data: 'id=' + id
        }).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.toList()
        }).catch(error => {
          console.log(error)
        })
        this.loading = false
      })
    }
  }
}
</script>
