<template>
  <div v-loading="loading" class="app-container">
    <el-tabs value="add" @tab-click="tabClick">
      <el-tab-pane label="用户列表" name="list"/>
      <el-tab-pane label="新增用户" name="add"/>
    </el-tabs>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
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
      <el-form-item label="用户账号" prop="username"><el-col :span="6"><el-input v-model="form.username" type="text"/></el-col></el-form-item>
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
      <el-form-item label="冻结" prop="locked">
        <el-switch v-model="form.locked"/>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-col :span="8">
          <el-input v-model="form.remarks" type="textarea"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import API from '@/api/config/api'
import { apiGet, apiSave } from '@/api/sys/sysUser'
import { getToken } from '@/utils/auth'

const SHA = require('jssha')

export default {
  data() {
    return {
      loading: false,
      uploadHeader: null,
      uploadUrl: API.SYS_USER.UPLOAD_AVATAR,
      showInputPassword: true,
      showBtnPassword: false,
      form: {
        id: null,
        avatar: '',
        username: '',
        password: '',
        nickname: '',
        realName: '',
        gender: null,
        mobile: '',
        locked: false,
        remarks: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      }
    }
  },
  created() {
    this.uploadHeader = {token: getToken()}
    this.init()
    if (this.$route.params && this.$route.params.id) {
      this.loading = true
      this.showInputPassword = false
      this.showBtnPassword = true
      this.rules.password = null
      new Promise((resolve, reject) => {
        apiGet(this.$route.params.id).then(response => {
          this.loading = false
          this.form = response.data
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    }
  },
  methods: {
    tabClick(tab) {
      if(tab.name == 'list') {
        this.$router.push('/sys/sysUser/list')
      }
    },
    init() {
      this.form.id = null
      this.form.avatar = ''
      this.form.username = ''
      this.form.password = ''
      this.form.nickname = ''
      this.form.realName = ''
      this.form.gender = null
      this.form.mobile = ''
      this.form.locked = false
      this.form.remarks = ''
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          var formData = this.form
          if (formData.password) {
            var shaObj = new SHA('SHA-1', 'TEXT')
            shaObj.update(formData.password)
            formData.password = shaObj.getHash('HEX')
          }
          apiSave(formData).then(response => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.loading = false
            this.$router.push("/sys/sysUser/list");
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$router.push("/sys/sysUser/list");
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
      this.rules.password = [{ required: true, trigger: 'blur', message: '密码不能为空' }]
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

