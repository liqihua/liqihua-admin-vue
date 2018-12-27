<template>
    <div v-loading="loading" class="app-container">
        <el-tabs value="add" @tab-click="tabClick">
            <el-tab-pane label="测试人员列表" name="list"/>
            <el-tab-pane label="新增测试人员" name="add"/>
        </el-tabs>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="头像" prop="avatar">
                <el-col :span="6">
                    <el-input v-model="form.avatar" type="text" clearable/>
                </el-col>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-col :span="6">
                    <el-input v-model="form.name" type="text" clearable/>
                </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-col :span="6">
                    <el-input v-model="form.password" type="text" clearable/>
                </el-col>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-col :span="6">
                    <el-input v-model="form.age" type="text" clearable/>
                </el-col>
            </el-form-item>
            <el-form-item label="性别：0女 1男" prop="gender">
                <el-col :span="6">
                    <el-radio-group v-model="form.gender">
                        <el-radio :label="true">true</el-radio>
                        <el-radio :label="false">false</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="睡觉时间" prop="sleepTime">
                <el-col :span="6">
                    <el-time-picker v-model="form.sleepTime" :picker-options="{ selectableRange: '00:00:00 - 23:59:59' }" value-format="HH:mm:ss" placeholder="选择时间"/>
                </el-col>
            </el-form-item>
            <el-form-item label="上班时间" prop="workTime">
                <el-col :span="6">
                    <el-date-picker v-model="form.workTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间"/>
                </el-col>
            </el-form-item>
            <el-form-item label="出生时间" prop="birthday">
                <el-col :span="6">
                    <el-date-picker v-model="form.birthday" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"/>
                </el-col>
            </el-form-item>
            <el-form-item label="个人简介" prop="intro">
                <el-col :span="6">
                    <el-input v-model="form.intro" type="textarea"/>
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
import { makeParam } from '@/utils/strutil'
import request from '@/utils/request'

const listPath = '/pro/testPerson/list'

export default {
    data() {
        return {
            loading: false,
            form: {
                id: null,
                avatar: null,
                name: null,
                password: null,
                age: null,
                gender: null,
                sleepTime: null,
                workTime: null,
                birthday: null,
                intro: null,
            },
            rules: {
                avatar: [{ required: true, trigger: 'blur', message: '头像不能为空' }],
                name: [{ required: true, trigger: 'blur', message: '姓名不能为空' }],
                password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
                age: [{ required: true, trigger: 'blur', message: '年龄不能为空' }],
                gender: [{ required: true, trigger: 'blur', message: '性别：0女 1男不能为空' }],
                sleepTime: [{ required: true, trigger: 'blur', message: '睡觉时间不能为空' }],
                workTime: [{ required: true, trigger: 'blur', message: '上班时间不能为空' }],
                birthday: [{ required: true, trigger: 'blur', message: '出生时间不能为空' }],
                intro: [{ required: true, trigger: 'blur', message: '个人简介不能为空' }],
            }
        }
    },
    created() {
        if (this.$route.params && this.$route.params.id) {
            this.loading = true
            request({
                url: '/sys/testPersonWebController/get',
                method: 'get',
                params: { id: this.$route.params.id }
            }).then(response => {
                this.loading = false
                this.form = response.data
            }).catch(error => {
                console.log(error)
                this.loading = false
            })
        }
    },
    methods: {
        tabClick(tab) {
            if(tab.name == 'list') {
                this.$router.push(listPath)
            }
        },
        onSubmit() {
            this.$refs.form.validate(valid => {
                if(valid) {
                    this.loading = true
                    var param = makeParam(this.form)
                    return request({
                        url: '/sys/testPersonWebController/save',
                        method: 'post',
                        data: param
                    }).then(() => {
                        this.loading = false
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                        this.$router.push(listPath)
                    }).catch(error => {
                        console.log(error)
                        this.loading = false
                    })
                }
            })
        },
        onCancel() {
            this.$router.push(listPath);
        }
    }
}
</script>

<style scoped>

</style>

