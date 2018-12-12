<template>
  <div v-loading="loading" class="app-container">
    <el-form label-width="120px">
      <el-form-item label="用户头像">
        <img v-if="user.avatar" :src="user.avatar" class="avatar">
      </el-form-item>
      <el-form-item label="用户账号"><el-col :span="6"><el-input :disabled="true" v-model="user.username" type="text"/></el-col></el-form-item>
      <el-form-item label="用户姓名"><el-col :span="6"><el-input :disabled="true" v-model="user.realName" type="text"/></el-col></el-form-item>
      <el-form-item label="用户昵称"><el-col :span="6"><el-input :disabled="true" v-model="user.nickname" type="text"/></el-col></el-form-item>
      <el-form-item label="手机号码"><el-col :span="6"><el-input :disabled="true" v-model="user.mobile" type="text"/></el-col></el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="user.gender">
          <el-radio disabled :label="true">男</el-radio>
          <el-radio disabled :label="false">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="冻结">
        <el-switch disabled v-model="user.locked"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-col :span="8">
          <el-input :disabled="true" v-model="user.remarks" type="textarea"/>
        </el-col>
      </el-form-item>
      <el-form-item label="分配角色">
        <el-checkbox-group v-model="checkedRoleIdArr">
          <el-checkbox v-for="role in roleList" :label="role.id" :key="role.id">{{ role.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiGet, apiSetRoles } from '@/api/sys/sysUser'
import { apiPage } from '@/api/sys/sysRole'

export default {
  data() {
    return {
      loading: false,
      user: {
        id: null,
        avatar: null,
        username: null,
        password: null,
        nickname: null,
        realName: null,
        gender: null,
        mobile: null,
        locked: false,
        remarks: null,
        roleList: []
      },
      checkedRoleIdArr: [],
      roleList: []
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.loading = true
      new Promise((resolve, reject) => {
        apiGet(this.$route.params.id).then(response => {
          this.user = response.data
          if(!this.user.roleList) {
            this.user.roleList = []
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
        return new Promise((resolve, reject) => {
          apiPage(1,100).then(response => {
            this.roleList = response.data.records
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }).then(() => {
        return new Promise((resolve, reject) => {
          let userRoleIdArr = this.user.roleList.map((role) => { return role.id })
          for(let key in userRoleIdArr){
            this.checkedRoleIdArr.push(userRoleIdArr[key])
          }
          resolve()
        })
      }).then(() => {
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    } else {
      this.$message({
        message: '页面错误',
        type: 'error'
      })
    }
  },
  methods: {
    onSubmit() {
      if(!this.user.id){
        this.$message({
          message: '无法获取用户id',
          type: 'error'
        })
        return false
      }
      let roleIds = ''
      if(this.checkedRoleIdArr && this.checkedRoleIdArr.length > 0) {
        for(let key in this.checkedRoleIdArr) {
          roleIds += (this.checkedRoleIdArr[key] + ',')
        }
      }
      this.loading = true
      apiSetRoles(this.user.id,roleIds).then(response => {
        this.loading = false
        this.$router.push('/sys/sysUser/list')
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    onCancel() {
      this.$router.push('/sys/sysUser/list')
    }
  }
}
</script>

<style scoped>
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-checkbox {
    display: block;
    margin-left: 0;
  }
</style>
