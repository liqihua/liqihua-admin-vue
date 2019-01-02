<template>
  <div v-loading="loading" class="app-container">
    <el-form label-width="120px">
      <el-form-item label="角色名称"><el-col :span="6"><el-input :disabled="true" v-model="role.name" type="text"/></el-col></el-form-item>
      <el-form-item label="备注"><el-col :span="6"><el-input :disabled="true" v-model="role.remarks" type="textarea"/></el-col></el-form-item>
      <el-form-item label="分配菜单">
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
        <el-checkbox class="check-all" v-model="checkAll" @change="checkAllChange">全选</el-checkbox><br>
        <el-checkbox-group v-model="checkedPermIdArr">
          <el-checkbox v-for="perm in permList" :label="perm.id" :key="perm.id">{{ perm.name }}</el-checkbox>
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
      checkAll: false,
      role: {
        id: null,
        name: null,
        remarks: null,
        menuList: [],
        permList: []
      },
      menuTree: [],
      permList: [],
      checkedPermIdArr: []
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.loading = true
      new Promise((resolve, reject) => {
        apiGet(this.$route.params.id).then(response => {
          this.role = response.data
          if(!this.role.menuList){
            this.role.menuList = []
          }
          if(!this.role.permList){
            this.role.permList = []
          }
          console.log('1:获取角色信息完成',this.role)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
        return new Promise((resolve, reject) => {
          apiGetTree().then(response => {
            this.menuTree = makeTreeLabel(response.data)
            console.log('2:获取所有菜单完成',this.menuTree)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }).then(() => {
        return new Promise((resolve, reject) => {
          if(this.role.menuList && this.role.menuList.length > 0){
            let roleMenuIdArr = this.role.menuList.map((menu) => { return menu.id })
            this.$refs.menuTree.setCheckedKeys(roleMenuIdArr)
          }
          console.log('3:回显角色拥有的菜单完成',this.$refs.menuTree.getCheckedKeys())
          resolve()
        })
      }).then(() => {
        console.log('4:')
        return this.refreshPermList()
      }).then(() => {
        return new Promise(resolve => {
          let rolePermIdArr = this.role.permList.map((perm) => { return perm.id })
          let permIdArr = this.permList.map((perm) => { return perm.id })
          for(let key in rolePermIdArr){
            if(permIdArr.indexOf(rolePermIdArr[key]) != -1){
              this.checkedPermIdArr.push(rolePermIdArr[key])
            }
          }
          console.log('5:回显角色拥有的权限完成')
          resolve()
        })
      }).then(() => {
        return new Promise(resolve => {
          if(this.checkedPermIdArr.length == this.permList.length){
            this.checkAll = true
          }
          resolve()
        })
      }).then(() => {
        console.log('finished')
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
    checkAllChange(checked) {
      if(checked){
        this.checkedPermIdArr = this.permList.map((perm) => { return perm.id })
      }else{
        this.checkedPermIdArr = []
      }
    },
    checkAllParent(clickNode) {
      if(clickNode && clickNode.id){
        let checkedArr = this.$refs.menuTree.getCheckedKeys()
        checkedArr.push(clickNode.id)
        this.$refs.menuTree.setCheckedKeys(checkedArr)
        if(clickNode.pid){
          this.checkAllParent(this.$refs.menuTree.getNode(clickNode.pid).data)
        }
      }
    },
    disCheckAllChildren(clickNode){
      if(clickNode.children && clickNode.children.length > 0){
        let childrenIdArr = clickNode.children.map(c => {return c.id})
        let checkedArr = this.$refs.menuTree.getCheckedKeys()
        let newArr = checkedArr.filter(key => {return !childrenIdArr.includes(key)})
        this.$refs.menuTree.setCheckedKeys(newArr)
        for(let key in childrenIdArr) {
          let disNode = this.$refs.menuTree.getNode(childrenIdArr[key]).data
          this.disCheckAllChildren(disNode)
        }
      }
    },
    menuCheck(clickNode) {
      let clickId = clickNode.id
      let checkedKeys = this.$refs.menuTree.getCheckedKeys()
      // 如果是勾选，把所有父级也勾选上，如果是取消勾选，把所有子级同时取消勾选
      if(checkedKeys.includes(clickId)) {
        this.checkAllParent(clickNode)
      }else{
        this.disCheckAllChildren(clickNode)
      }
      this.refreshPermList()
    },
    refreshPermList() {
      return new Promise((resolve, reject) => {
        this.checkAll = false
        this.permList = []
        this.checkedPermIdArr = []
        let checkedMenuIdArr = this.$refs.menuTree.getCheckedKeys()
        if(checkedMenuIdArr && checkedMenuIdArr.length > 0){
          let menuIds = ''
          for(let key in checkedMenuIdArr){
            menuIds += (checkedMenuIdArr[key] + ',')
          }
          apiGetByMenuIds(menuIds).then(response => {
            this.permList = response.data
            console.log('根据菜单刷新权限列表')
            resolve()
          }).catch(error => {
            reject(error)
          })
        }else{
          console.log('根据菜单刷新权限列表')
          resolve()
        }
      })
    },
    onSubmit() {
      if(!this.role.id){
        this.$message({
          message: '无法获取角色id',
          type: 'error'
        })
        return false
      }
      let menuIds = ''
      let permIds = ''
      let checkedMenuIdArr = this.$refs.menuTree.getCheckedKeys()
      if(checkedMenuIdArr && checkedMenuIdArr.length > 0) {
        for(let key in checkedMenuIdArr) {
          menuIds += (checkedMenuIdArr[key] + ',')
        }
      }
      if(this.checkedPermIdArr && this.checkedPermIdArr.length > 0) {
        for(let key in this.checkedPermIdArr) {
          permIds += (this.checkedPermIdArr[key] + ',')
        }
      }
      this.loading = true
      apiSetPerms(this.role.id,menuIds,permIds).then(response => {
        this.loading = false
        this.$router.push('/sys/sysRole/list')
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    onCancel() {
      this.$router.push('/sys/sysRole/list')
    }
  }
}
</script>
