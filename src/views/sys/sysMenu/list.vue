<template>
  <div v-loading="loading" class="app-container">
    <el-tree :data="data" @node-click="handleNodeClick">
      <div slot-scope="{ data }" class="div-tree-node"><span>{{ data.title }}</span><span class="span-tree-node-operate"><router-link :to="'/sysUser/edit/'+data.title" class="sys-a">编辑</router-link><a class="sys-a" href="javascript:;" @click="toDelete(data.title)">删除</a></span></div>
    </el-tree>
  </div>
</template>

<script>
import '@/styles/sys.css'

export default {
  data() {
    return {
      loading: false,
      data: [{
        label: '一级 1',
        title: 'aa',
        children: [{
          label: '二级 1-1',
          title: 'aaa',
          children: [{
            label: '三级 1-1-1',
            title: 'aaaa'
          }]
        }]
      }, {
        label: '一级 2',
        title: 'bb',
        children: [{
          label: '二级 2-1',
          title: 'bbb1',
          children: [{
            label: '三级 2-1-1',
            title: 'bbb11'
          }]
        }, {
          label: '二级 2-2',
          title: 'bbb2',
          children: [{
            label: '三级 2-2-1',
            title: 'bbb22'
          }]
        }]
      }, {
        label: '一级 3',
        title: 'cc',
        children: [{
          label: '二级 3-1',
          title: 'ccc1',
          children: [{
            label: '三级 3-1-1',
            title: 'ccc11'
          }]
        }, {
          label: '二级 3-2',
          title: 'ccc2',
          children: [{
            label: '三级 3-2-1',
            title: 'ccc22'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    console.log('created')
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    toDelete(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除' + id)
      })
    }
  }

}
</script>

<style scoped>
  .div-tree-node{width: 100%;}
  .span-tree-node-operate {float:right;}
  .span-tree-node-operate>a,.span-tree-node-operate>router-link{margin-right: 20px;}
</style>
