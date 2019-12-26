<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <el-menu-item index="AboutMe">
                <i class="el-icon-setting"></i>个人信息
            </el-menu-item>
            <el-submenu index="2" v-if="finShow">
                <template slot="title"><i class="el-icon-date"></i>工资发放平台</template>
                <el-menu-item index="ManageSalary">工资发放管理</el-menu-item>
                <el-menu-item index="HistorySalary">历史工资发放记录</el-menu-item>
            </el-submenu>
            <el-submenu index="3" v-if="finShow">
                <template slot="title"><i class="el-icon-setting"></i>薪资标准管理</template>
                <el-menu-item index="ModifyTaxRule">管理扣税标准</el-menu-item>
                <el-menu-item index="ModifyInsuranceRule">管理五险一金计算标准</el-menu-item>
                <el-menu-item index="ModifyAbsenceRule">管理缺勤扣款标准</el-menu-item>
            </el-submenu>
            <el-submenu index="4" v-if="hrShow">
                <template slot="title"><i class="el-icon-date"></i>工资计算平台</template>
                <el-menu-item index="ChargeBack">计算本月工资</el-menu-item>
            </el-submenu>
            <el-submenu index="5" v-if="hrShow">
                <template slot="title"><i class="el-icon-setting"></i>员工信息管理平台</template>
                <el-menu-item index="AddStaff">调入员工</el-menu-item>
                <el-menu-item index="ManageStaffInfo">管理员工信息</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-document"></i>我的工资信息</template>
                <el-menu-item index="StaffHistorySalary">历史工资信息</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title"><i class="el-icon-star-on"></i>我的考勤中心</template>
                <el-menu-item index="ApplicationForLeave">请假申请</el-menu-item>
                <el-menu-item index="ApplicationList">查看当月考勤申请</el-menu-item>
                <el-menu-item index="StaffCheckInfo">查看历史考勤记录</el-menu-item>
            </el-submenu>
            <el-submenu index="8" v-if="depShow">
                <template slot="title"><i class="el-icon-edit"></i>考勤管理平台</template>
                <el-menu-item index="DepCheckInfo">考勤审核</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    import axios from 'axios';
    import qs from 'qs';
    import {getCookie, formatDateTime} from '../../assets/common/VueUtils.js'
    export default {
        data(){
            return {
                showData: '',
                depShow: false,
                hrShow: false,
                finShow: false
            }
        },
        computed: {
            onRoutes(){
                return this.$route.path.replace('/', '');
            }
        },
        created: function () {
            this.getUserInfo();
        },
        methods: {
            getUserInfo(){
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
                        this.showData = response.data.data.roleName;
                        if (this.showData == '部门管理员') {
                            this.depShow = true;
                        } else if (this.showData == '人事处管理员') {
                            this.hrShow = true;
                        } else if (this.showData == '财务处管理员') {
                            this.finShow = true;
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>
<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #2E363F;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
