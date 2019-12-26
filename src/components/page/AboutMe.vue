<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 学校工资管理系统（SSMS）简介</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>学校工资管理系统（SSMS）</h3>
            <article>
                <h1>学校工资管理系统（SSMS）</h1>
                <h2>主要功能模块</h2>
                <el-row :gutter="20">
                <el-col :span="12">
                <div>
                    <el-tree
                        :data="data2"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[1, 2, 4]"
                        :default-checked-keys="[1, 2, 4,7,8,9,10,14,15,16]"
                        :props="defaultProps">
                    </el-tree>
                </div>
                </el-col>
                <el-col :span="12">
                <div>
                    <el-tree
                        :data="data3"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[ 3,5,6]"
                        :default-checked-keys="[ 3, 5,6,11,12,13,17,18,19,20,21,22]"
                        :props="defaultProps">
                    </el-tree>
                </div>
                </el-col>
                </el-row>


            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                data2: [{
                    id: 1,
                    label: '用户信息',
                    children: [{
                        id: 7,
                        label: '用户登录、注销'
                    }, {
                        id: 8,
                        label: '修改个人密码'
                    }]
                }, {
                    id: 2,
                    label: '考勤管理',
                    children: [{
                        id: 9,
                        label: '请假申请'
                    }, {
                        id: 10,
                        label: '撤回待审核请假申请'
                    }, {
                        id: 10,
                        label: '考勤审核'
                    }]
                },  {
                    id: 4,
                    label: '员工信息管理',
                    children: [{
                        id: 14,
                        label: '添加新员工'
                    }, {
                        id: 15,
                        label: '删除员工'
                    }, {
                        id: 16,
                        label: '修改员工信息'
                    }]
                }],
                data3: [
                   {
                    id: 3,
                    label: '工资管理',
                    children: [{
                        id: 11,
                        label: '管理缺勤扣款'
                    }, {
                        id: 12,
                        label: '管理五险一金'
                    }, {
                        id: 13,
                        label: '管理扣税金额'
                    }]
                }, {
                    id: 5,
                    label: '工资发放管理',
                    children: [{
                        id: 17,
                        label: '生成工资表'
                    }, {
                        id: 18,
                        label: '发送工资单到银行'
                    }, {
                        id: 19,
                        label: '发送工资单到员工'
                    }]
                }, {
                    id:6,
                    label: '薪资标准管理',
                    children: [{
                        id: 20,
                        label: '管理五险一金计算标准'
                    }, {
                        id: 21,
                        label: '管理缺勤扣款计算标准'
                    }, {
                        id: 22,
                        label: '管理交税扣款计算标准'
                    }]
                }]
            }
        }
    }
</script>

<style scoped>
    .ms-doc {
        width: 100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }

    .ms-doc h3 {
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }

    .ms-doc article {
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    .ms-doc article h1 {
        font-size: 32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }

    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }

    .ms-doc article p {
        margin-bottom: 15px;
        line-height: 1.5;
    }

    .ms-doc article .el-checkbox {
        margin-bottom: 5px;
    }
</style>
