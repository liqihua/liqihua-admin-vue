<template>
  <div v-loading="loading" class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户头像" prop="avatar">
        <el-upload
          :headers="uploadHeader"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="uploadAvatarSuccess"
          :on-error="uploadAvatarFail"
          :action="uploadUrl"
          name="avatar"
          class="avatar-uploader">
          <img v-if="form.avatar" :src="form.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户账号"><el-col :span="6"><el-input v-model="form.username" type="text" disabled/></el-col></el-form-item>
      <el-form-item label="用户密码" prop="password"><el-col :span="6"><el-input v-if="showInputPassword" v-model="form.password" type="password"/><el-button v-if="showBtnPassword" size="mini" type="text" @click="resetPassword">重设密码</el-button></el-col></el-form-item>
      <el-form-item label="用户姓名" prop="realName"><el-col :span="6"><el-input v-model="form.realName" type="text"/></el-col></el-form-item>
      <el-form-item label="用户昵称" prop="nickname"><el-col :span="6"><el-input v-model="form.nickname" type="text"/></el-col></el-form-item>
      <el-form-item label="手机号码" prop="mobile"><el-col :span="6"><el-input v-model="form.mobile" type="text"/></el-col></el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="true">男</el-radio>
          <el-radio :label="false">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import API from '@/api/config/api'
import { getInfo, apiUpdateUser } from '@/api/login'
import { getToken } from '@/utils/auth'

const SHA = require('jssha')

export default {
  data() {
    return {
      loading: false,
      uploadHeader: null,
      uploadUrl: API.SYS_USER.UPLOAD_AVATAR,
      showInputPassword: false,
      showBtnPassword: true,
      form: {
        avatar: null,
        username: null,
        password: null,
        nickname: null,
        realName: null,
        gender: null,
        mobile: null
      }
    }
  },
  created() {
    this.loading = true
    new Promise((resolve,reject) => {
      getInfo().then(response => {
        this.form = response.data
        resolve()
      }).catch(error => {
        reject(error)
      })
    }).then(() => {
      return new Promise(resolve => {
        this.uploadHeader = {token: getToken()}
        resolve()
      })
    }).catch(error => {
      console.log('error',error)
    })
    this.loading = false

  },
  methods: {
    onSubmit() {
      this.loading = true
      var formData = this.form
      if (formData.password) {
        var shaObj = new SHA('SHA-1', 'TEXT')
        shaObj.update(formData.password)
        formData.password = shaObj.getHash('HEX')
      }
      apiUpdateUser(formData).then(response => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.showInputPassword = false
        this.showBtnPassword = true
        this.form.password = null
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    uploadAvatarSuccess(res, file) {
      this.form.avatar = res.data
    },
    uploadAvatarFail(err, file) {
      this.$message.error(err)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    resetPassword() {
      this.showInputPassword = true
      this.showBtnPassword = false
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

