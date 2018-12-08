<template>
  <div v-loading="loading" class="app-container">
    <el-form label-width="120px">
      <el-form-item label="角色名称"><el-col :span="6"><el-input :disabled="true" v-model="role.name" type="text"/></el-col></el-form-item>
      <el-form-item label="备注"><el-col :span="6"><el-input :disabled="true" v-model="role.remarks" type="textarea"/></el-col></el-form-item>
      <el-form-item label="选择菜单">
        <el-tree
          ref="menuTree"
          :data="menuTree"
          :check-on-click-node="true"
          :check-strictly="true"
          :default-expand-all="true"
          node-key="id"
          show-checkbox
          accordion
          @check="menuCheck" />
      </el-form-item>
      <el-form-item label="分配权限">
        <el-checkbox-group v-model="checkedPerms">
          <el-checkbox v-for="perm in perms" :label="perm.id" :key="perm.id">{{ perm.name }}</el-checkbox>
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
import { apiGetTree, makeTreeLabel } from '@/api/sys/sysMenu'
import { apiGet,apiSetPerms } from '@/api/sys/sysRole'
import { apiGetByMenuIds } from '@/api/sys/sysPerm'

export default {
  data() {
    return {
      loading: false,
      menuTree: [],
      role: {
        id: null,
        name: null,
        remarks: null
      },
      perms: [],
      checkedPerms: [],
      menuIds: null
    }
  },
  created() {
    new Promise((resolve, reject) => {
      this.loading = true
      apiGetTree().then(response => {
        this.menuTree = makeTreeLabel(response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        if (this.$route.params && this.$route.params.id) {
          this.loading = true
          apiGet(this.$route.params.id).then(response => {
            this.role = response.data
            if(response.data.menuList && response.data.menuList.length > 0){
              let menuIdArr = response.data.menuList.map((menu) => {
                return menu.id;
              })
              this.$refs.menuTree.setCheckedKeys(menuIdArr)
              this.menuCheck()
            }
            if(response.data.permList && response.data.permList.length > 0){
              let permIdArr = response.data.permList.map((perm) => {
                return perm.id;
              })
              this.checkedPerms = permIdArr
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        } else {
          reject()
        }
      })
    }).then(() => {
      this.loading = false
    }).catch(error => {
      console.log(error)
      this.loading = false
      this.$message({
        message: '发生错误',
        type: 'error'
      })
    })
  },
  methods: {
    menuCheck() {
      let menuIdArr = this.$refs.menuTree.getCheckedKeys()
      if(menuIdArr && menuIdArr.length > 0){
        let menuIds = ''
        for(var key in menuIdArr){
          menuIds += (menuIdArr[key] + ',')
        }
        this.menuIds = menuIds
        this.loading = true
        apiGetByMenuIds(this.menuIds).then(response => {
          this.perms = response.data
          this.loading = false
        }).catch(error => {
          console.log(error)
          this.loading = false
        })
      }
    },
    onSubmit() {
      if(!this.role.id){
        this.$message({
          message: '无法获取角色id',
          type: 'error'
        })
        return false
      }
      if(!this.menuIds){
        this.$message({
          message: '请选择菜单',
          type: 'error'
        })
        return false
      }
      let permIds = ''
      if(this.checkedPerms){
        for(var key in this.checkedPerms){
          permIds += (this.checkedPerms[key] + ',')
        }
      }
      this.loading = true
      apiSetPerms(this.role.id,this.menuIds,permIds).then(response => {
        this.loading = false
        this.$router.push('/sysRole/list')
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    onCancel() {
      this.$router.push('/sysRole/list')
    }
  }
}
</script>
