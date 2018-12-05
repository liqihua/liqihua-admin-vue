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
      <el-table-column label="权限名称" align="center"><template slot-scope="scope">{{ scope.row.name }}</template></el-table-column>
      <el-table-column label="权限符号" align="center"><template slot-scope="scope">{{ scope.row.symbol }}</template></el-table-column>
      <el-table-column label="备注" align="center"><template slot-scope="scope">{{ scope.row.remarks }}</template></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      list: null,
      page: 1,
      pageSize: 30
    }
  },
  methods: {
    toList() {

    }
  }
}
</script>
