<template>
  <div v-loading="loading" class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="菜单标题" prop="title"><el-col :span="6"><el-input v-model="form.title" type="text"/></el-col></el-form-item>
      <el-form-item label="路由名称" prop="routerName"><el-col :span="6"><el-input v-model="form.routerName" type="text"/></el-col></el-form-item>
      <el-form-item label="排序" prop="rank"><el-col :span="6"><el-input v-model="form.rank" type="text"/></el-col></el-form-item>
      <el-form-item label="隐藏" prop="hide">
        <el-switch v-model="form.hide"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
import { makeParam } from '@/utils/strutil.js'

export default {
  data() {
    return {
      form: {
        id: null,
        title: '',
        routerName: '',
        rank: 999,
        hide: false
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '菜单标题不能为空' }],
        routerName: [{ required: true, trigger: 'blur', message: '路由名称不能为空' }],
        rank: [{ required: true, trigger: 'blur', message: '排序值不能为空' }],
        hide: [{ required: true, trigger: 'blur', message: '是否隐藏不能为空' }]
      },
      loading: false
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      console.log('id----' + this.$route.params.id)
    }
  },
  methods: {
    init() {
      this.form.id = null
      this.form.title = ''
      this.form.routerName = ''
      this.form.rank = 999
      this.form.hide = false
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (isNaN(this.form.rank)) {
            this.$message({
              message: '排序值必须是数字',
              type: 'error'
            })
            return false
          }
          this.loading = true
          var data = makeParam(this.form)
          request({
            url: '/sys/sysMenuWebController/save',
            method: 'post',
            data: data
          }).then(response => {
            console.log(response)
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.init()
            this.loading = false
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

