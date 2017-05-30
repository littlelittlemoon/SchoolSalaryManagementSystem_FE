<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <el-menu-item index="AboutMe">
                <i class="el-icon-setting"></i>个人信息
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>(财务处)工资发放管理</template>
                <el-menu-item index="ManageSalary">(财务处)工资管理</el-menu-item>
                <el-menu-item index="ModifyTaxRule">(财务处)管理扣税规则</el-menu-item>
                <el-menu-item index="ModifyInsuranceRule">(财务处)管理五险一金扣除规则</el-menu-item>
                <el-menu-item index="ModifyAbsenceRule">(财务处)管理缺勤扣除规则</el-menu-item>
                <el-menu-item index="HistorySalary">(财务处)历史工资记录</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-date"></i>(人事处)管理扣款与奖金</template>
                <el-menu-item index="CountPrice">(人事处)奖金管理</el-menu-item>
                <el-menu-item index="ChargeBack">(人事处)缺勤扣款管理</el-menu-item>
                <el-menu-item index="CountInsurance">(人事处)五险一金</el-menu-item>
                <el-menu-item index="CountTax">(人事处)扣税管理</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-setting"></i>(人事处)管理人员信息</template>
                <el-menu-item index="AddStaff">(人事处)调入员工</el-menu-item>
                <el-menu-item index="ManageStaffInfo">(人事处)管理员工信息</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-star-on"></i>工资信息</template>
                <el-menu-item index="StaffHistorySalary">(员工)查看历史工资信息</el-menu-item>
                <!--<el-menu-item index="mixcharts"></el-menu-item>-->
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-star-on"></i>考勤管理</template>
                <el-menu-item index="ApplicationForLeave">(员工)请假申请</el-menu-item>
                <el-menu-item index="DepCheckInfo">(各部门)考勤管理</el-menu-item>
                <el-menu-item index="StaffCheckInfo">(员工)查看历史考勤记录</el-menu-item>
                <el-menu-item index="ApplicationList">(员工)查看当月考勤申请</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    export default {
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
