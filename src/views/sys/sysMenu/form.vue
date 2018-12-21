<template>
  <div v-loading="loading" class="app-container">
    <el-tabs value="add" @tab-click="tabClick">
      <el-tab-pane label="菜单列表" name="list"/>
      <el-tab-pane label="新增菜单" name="add"/>
    </el-tabs>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="父级菜单">
        <el-tree
          ref="menuTree"
          :data="menuTree"
          :check-on-click-node="true"
          :check-strictly="true"
          :filter-node-method="filterNode"
          node-key="id"
          show-checkbox
          accordion
          @check="menuCheck" />
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
import { apiGet, apiGetTree, apiSave, makeTreeLabel } from '@/api/sys/sysMenu'

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
          apiGet(this.$route.params.id).then(response => {
            this.form = response.data
            if (this.form.pid) {
              console.log(this.form.pid)
              this.$refs.menuTree.setCheckedKeys([this.form.pid])
            }
            this.$refs.menuTree.filter(this.$route.params.id)
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
    tabClick(tab) {
      if(tab.name == 'list') {
        this.$router.push('/sys/sysMenu/list')
      }
    },
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
        apiGetTree().then(response => {
          this.menuTree = makeTreeLabel(response.data)
          this.loading = false
          resolve()
        }).catch(error => {
          console.log(error)
          this.loading = false
          reject()
        })
      })
    },
    menuCheck(clickNode) {
      this.$refs.menuTree.setCheckedKeys([clickNode.id])
      this.form.pid = clickNode.id
    },
    filterNode(id,data){
      if(id == data.id){
        data.disabled = true
      }
      return true

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
          apiSave(this.form).then(response => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.loading = false
            this.$router.push("/sys/sysMenu/list");
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
      this.$router.push("/sys/sysMenu/list");
    }
  }
}
</script>


