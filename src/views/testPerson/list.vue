<template>
    <div v-loading="loading" class="app-container">
        <el-tabs value="list" @tab-click="tabClick">
            <el-tab-pane label="测试人员列表" name="list"/>
            <el-tab-pane label="新增测试人员" name="add"/>
        </el-tabs>
        <el-table :data="list" border fit highlight-current-row>
            <el-table-column label="头像" prop="avatar" align="center"/>
            <el-table-column label="姓名" prop="name" align="center"/>
            <el-table-column label="密码" prop="password" align="center"/>
            <el-table-column label="年龄" prop="age" align="center"/>
            <el-table-column label="性别：0女 1男" prop="gender" align="center"/>
            <el-table-column label="睡觉时间" prop="sleepTime" align="center"/>
            <el-table-column label="上班时间" prop="workTime" align="center"/>
            <el-table-column label="出生时间" prop="birthday" align="center"/>
            <el-table-column label="个人简介" prop="intro" align="center"/>
            <el-table-column label="创建时间" prop="createDate" align="center"/>
            <el-table-column label="更新时间" prop="updateDate" align="center"/>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/pro/testPerson/edit/'+scope.row.id">编辑</router-link><br>
                    <a @click="doDelete(scope.row.id)">删除</a>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total, sizes, prev, pager, next" :total="total" :page-sizes="[pageSize,60]" :page-size="pageSize" :current-page="page" @current-change="pageClick" @size-change="pageSizeChange"></el-pagination>
    </div>
</template>

<script>
import request from '@/utils/request'

const formPath = '/pro/testPerson/add'

export default {
    data() {
        return {
            loading: false,
            page: 1,
            pageSize: 30,
            total: 0,
            list: []
        }
    },
    created() {
        this.doPage()
    },
    methods: {
        tabClick(tab) {
            if(tab.name == 'add') {
                this.$router.push(formPath)
            }
        },
        doPage() {
            this.loading = true
            request({
                url: '/sys/testPersonWebController/page',
                method: 'get',
                params: { page:this.page, pageSize:this.pageSize }
            }).then(response => {
                this.list = response.data.records
                this.total = response.data.total
                this.loading = false
            }).catch(error => {
                    console.log(error)
                this.loading = false
            })
        },
        doDelete(id) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true
                request({
                    url: '/sys/testPersonWebController/delete',
                    method: 'post',
                    data: 'id=' + id
                }).then(response => {
                    this.doPage()
                    this.loading = false
                }).catch(error => {
                    console.log(error)
                    this.loading = false
                })
            })
        },
        pageClick(clickPage){
            if(clickPage != this.page){
                this.page = clickPage
                this.doPage()
            }
        },
        pageSizeChange(pageSize){
            this.pageSize = pageSize
            this.doPage()
        }
    }
}
</script>

<style scoped>

</style>
