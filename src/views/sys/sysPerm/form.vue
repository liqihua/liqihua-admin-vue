<template>
  <div v-loading="loading" class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="所属菜单">
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
import { apiGetTree, makeTreeLabel } from '@/api/sys/sysMenu'
import { apiSave, apiGet } from '@/api/sys/sysPerm'

export default {
  data() {
    return {
      loading: false,
      menuTree: [],
      form: {
        menuId: null,
        id: null,
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
      return new Promise(((resolve, reject) => {
        if (this.$route.params && this.$route.params.id) {
          apiGet(this.$route.params.id).then(response => {
            this.form.id = response.data.id
            this.form.name = response.data.name
            this.form.symbol = response.data.symbol
            this.form.remarks = response.data.remarks
            this.form.menuId = response.data.menu.id
            this.$refs.menuTree.setCheckedKeys([this.form.menuId])
            resolve()
          }).catch(error => {
            reject(error)
          })
        } else {
          resolve()
        }
      }))
    }).then(() => {
      this.loading = false
    }).catch(error => {
      console.log(error)
      this.loading = false
    })



  },
  methods: {
    menuCheck(clickNode) {
      this.$refs.menuTree.setCheckedKeys([clickNode.id])
      this.form.menuId = clickNode.id
    },
    onSubmit() {
      if(!this.form.menuId) {
        this.$message({
          message: '请选择所属菜单',
          type: 'error'
        })
        return false
      }
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
      this.$router.push('/sysPerm/list')
    }
  }
}
</script>
