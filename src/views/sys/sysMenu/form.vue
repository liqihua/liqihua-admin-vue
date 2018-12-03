<template>
  <div v-loading="loading" class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="父级菜单">
        <el-tree ref="menuTree" :data="menuTree" :check-on-click-node="true" node-key="id" show-checkbox accordion @check="menuCheck" />
      </el-form-item>
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
      menuTree: null,
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
    this.getMenuTree().then(() => {
      return new Promise((resolve, reject) => {
        if (this.$route.params && this.$route.params.id) {
          request({
            url: '/sys/sysMenuWebController/get',
            method: 'get',
            params: { id: this.$route.params.id }
          }).then(response => {
            this.form = response.data
            if (this.form.pid) {
              console.log(this.form.pid)
              this.$refs.menuTree.setCheckedKeys([this.form.pid])
            }
            this.loading = false
            resolve()
          }).catch(error => {
            console.log(error)
            this.loading = false
            reject()
          })
        } else {
          resolve()
        }
      })
    }).catch(() => {
      this.$message({ message: '发生错误', type: 'error' })
    })
  },
  methods: {
    init() {
      this.form.pid = null
      this.form.id = null
      this.form.title = ''
      this.form.routerName = ''
      this.form.rank = 999
      this.form.hide = false
    },
    getMenuTree() {
      return new Promise((resolve, reject) => {
        this.loading = true
        request({
          url: '/sys/sysMenuWebController/getTree',
          method: 'get'
        }).then(response => {
          this.menuTree = this.makeTreeLabel(response.data)
          this.loading = false
          resolve()
        }).catch(error => {
          console.log(error)
          this.loading = false
          reject()
        })
      })
    },
    makeTreeLabel(menuList) {
      if (menuList) {
        for (var key in menuList) {
          menuList[key].label = menuList[key].title
          if (menuList[key].children) {
            menuList[key].children = this.makeTreeLabel(menuList[key].children)
          }
        }
      }
      return menuList
    },
    menuCheck(clickNode) {
      this.$refs.menuTree.setCheckedKeys([clickNode.id])
      this.form.pid = clickNode.id
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
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.init()
            this.getMenuTree()
            this.loading = false
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
      this.$message({
        message: 'cancel!',
        type: 'warning'
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

