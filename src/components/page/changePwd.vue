<template>
    <div class="div-block">
        <el-form :model="passWord" :rules="rules" ref="passWord" label-width="100px" class="demo-ruleForm">
            <el-form-item label="请输入旧密码" prop="oldPassWord">
                <el-input type="password" v-model="passWord.oldPassWord" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码" prop="newPassWord">
                <el-input type="password" v-model="passWord.newPassWord" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPassWord">
                <el-input type="password" v-model="passWord.checkPassWord" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('passWord')">提交</el-button>
                <el-button @click="resetForm('passWord')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs';
    import {getCookie, formatDateTime} from '../../assets/common/VueUtils.js'
    export default {
        data() {
            var checkOldPass = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('旧密码不能为空'));
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passWord.newPassWord) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                passWord: {
                    oldPassWord: '',
                    newPassWord: '',
                    checkPassWord: ''
                },
                rules: {
                    oldPassWord: [
                        {validator: checkOldPass, trigger: 'blur'}
                    ],
                    newPassWord: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPassWord: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            submitForm(formName) {
                axios.post('http://lalala.tunnel.2bdata.com/staffInfo/changePwd', qs.stringify({
                    staffId: getCookie("staffId"),
                    oldPwd: this.passWord.oldPassWord,
                    newPwd: this.passWord.newPassWord
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '修改密码失败',
                            message: response.data.message
                        });
                    } else {
                        this.$notify.success({
                            title: '修改密码成功',
                            message: '密码修改成功，请重新登录！'
                        });
                        this.$router.push('/login');
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
    .div-block {
        padding: 20px;
        width: 40%;
        border: 1px solid #eaeefb;
        border-radius: 4px;
        transition: .2s;
        margin: 0 auto;
    }
</style>
