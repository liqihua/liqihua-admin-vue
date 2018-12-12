<template>
  <div v-loading="loading" class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="name"><el-col :span="6"><el-input v-model="form.name" type="text"/></el-col></el-form-item>
      <el-form-item label="备注" prop="remarks"><el-col :span="6"><el-input v-model="form.remarks" type="textarea"/></el-col></el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiSave, apiGet } from '@/api/sys/sysRole'

export default {
  data() {
    return {
      loading: false,
      form: {
        id: null,
        name: null,
        remarks: null
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '角色名称不能为空' }],
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.loading = true
      apiGet(this.$route.params.id).then(response => {
        this.form = response.data
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
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
            this.$router.push('/sys/sysRole/list')
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        }
      })
    },
    onCancel() {
      this.$router.push('/sys/sysRole/list')
    }
  }
}
</script>
