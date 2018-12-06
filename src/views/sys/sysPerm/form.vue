<template>
  <div v-loading="loading" class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="权限名称" prop="name"><el-col :span="6"><el-input v-model="form.name" type="text"/></el-col></el-form-item>
      <el-form-item label="权限符号" prop="symbol"><el-col :span="6"><el-input v-model="form.symbol" type="text"/></el-col></el-form-item>
      <el-form-item label="备注" prop="remarks"><el-col :span="6"><el-input v-model="form.remarks" type="textarea"/></el-col></el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiSave } from '@/api/sys/sysPerm'

export default {
  data() {
    return {
      loading: false,
      form: {
        name: null,
        symbol: null,
        remarks: null
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '权限名称不能为空' }],
        symbol: [{ required: true, trigger: 'blur', message: '权限符号不能为空' }],
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if(valid) {
          this.loading = true
          apiSave(this.form).then(response => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.loading = false
            this.$router.push('/sysPerm/list')
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        }
      })
    },
    onCancel() {

    }
  }
}
</script>
