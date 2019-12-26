<template>
    <div class="login-wrap">
        <div class="ms-title">用户登录</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs';
    import {getCookie, formatDateTime} from '../../assets/common/VueUtils.js'
    export default {
        data: function () {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.get('http://localhost:8080/staffInfo/login', {
                            params: {
                                username: self.ruleForm.username,
                                password: self.ruleForm.password
                            }
                        }).then(function (response) {
                            if (response.data.code == 1) {
                                self.$notify.error({
                                    title: '登录失败',
                                    message: response.data.message
                                });
                            } else {
                                self.addCookie("staffId", response.data.data);
                                axios.get('http://localhost:8080/staffInfo/getStaff', {
                                    params: {
                                        staffId: getCookie("staffId")
                                    }
                                }).then((response) => {
                                    console.log(response);
                                    if (response.data.code == 1) {
                                        this.$notify.error({
                                            title: '操作失败',
                                            message: '服务端出错啦~'
                                        });
                                    } else {
                                        localStorage.setItem('username', response.data.data.departmentName + ' - ' + response.data.data.staffName + ' - ' + response.data.data.roleName);
                                        self.$router.push('/AboutMe');
                                    }
                                }).catch(function (error) {
                                    console.log(error);
                                });

                            }
                        }).catch(function (error) {
                            console.log(error);
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addCookie(name, value) {
                var d = new Date();
                d.setTime(d.getTime() + (0.5 * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = name + "=" + value + "; " + expires;
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }
</style>
