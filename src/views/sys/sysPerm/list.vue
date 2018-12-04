<template>
  <div v-loading="loading" class="app-container">
    <el-tabs>
      <el-tab-pane label="权限列表"/>
      <el-tab-pane><router-link slot="label" to="/sysPerm/add">新增权限</router-link></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  }
}
</script>
