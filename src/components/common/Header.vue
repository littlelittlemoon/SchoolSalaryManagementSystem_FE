<template>
    <div class="header">
        <div class="logo">学校工资管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu class="el-dropdown-menu" slot="dropdown">
                    <el-dropdown-item class="el-dropdown-menu__item"  command="loginout">退出</el-dropdown-item>
                    <el-dropdown-item class="el-dropdown-menu__item"  command="modifyPassWord">修改密码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import qs from 'qs';
    import {getCookie, formatDateTime} from '../../assets/common/VueUtils.js'
    export default {
        data() {
            return {
                name: 'tantan'
            }
        },
        computed: {
            username(){
                let username = localStorage.getItem('username');
                return username ? username : this.name;
            }
        },
        methods: {
            handleCommand(command) {
                if (command == 'loginout') {
                    localStorage.removeItem('username')
                    this.$router.push('/login');
                } else if (command == 'modifyPassWord') {
                    localStorage.removeItem('username')
                    this.$router.push('/changePwd');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }

    .header .logo {
        float: left;
        width: 250px;
        text-align: center;
    }

    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }

    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }

    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-menu{
        width: 150px;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
