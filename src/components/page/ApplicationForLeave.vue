<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>考勤管理</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>请假申请</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="div-block">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="请假类型" required prop="absentType">
                    <el-select v-model="ruleForm.absentType" placeholder="请假类型" >
                        <el-option v-for="item in ruleForm.items" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请假时间" required>
                    <el-col :span="11">
                        <el-form-item prop="absentStartTime">
                            <el-date-picker type="date" placeholder="请假开始时间" v-model="ruleForm.absentStartTime"
                                            style="width: 80%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="absentEndTime">
                            <el-date-picker type="date" placeholder="请假结束时间" v-model="ruleForm.absentEndTime"
                                            style="width: 80%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="请假天数" style="width: 92%;" prop="absentDays">
                    <el-input type="text" v-model="ruleForm.absentDays"></el-input>
                </el-form-item>
                <el-form-item label="请假原因" prop="absentReason" style="width: 92%;">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入请假原因，最多50字..."
                        v-model="ruleForm.absentReason">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即申请</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
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

                ruleForm: {
                    items: [],
                    absentType: '',
                    absentReason: '',
                    absentStartTime: '',
                    absentEndTime: '',
                    absentDays: ''
                },
                rules: {
                    absentType: [{
                        required: true,
                        message: '请选择请假类型',
                        trigger: 'change'
                    }],
                    absentStartTime: [{
                        type: 'date',
                        required: true,
                        message: '请选择开始日期',
                        trigger: 'change'
                    }],
                    absentEndTime: [{
                        type: 'date',
                        required: true,
                        message: '请选择结束日期',
                        trigger: 'change'
                    }],
                    absentDays: [{
                        required: true,
                        message: '请假天数',
                        trigger: 'blur'
                    }]
                }
            };
        },
        created: function () {
            this.getAbsentType();
        },
        methods: {
            getAbsentType(){
                axios.get('http://lalala.tunnel.2bdata.com/absenceSetting/absentType').then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '查找失败',
                            message: response.data.message
                        });
                    } else {
                        this.ruleForm.items = response.data.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            submitForm(formname) {
                this.$refs[formname].validate((valid) => {
                    if (valid) {
                        axios.post('http://lalala.tunnel.2bdata.com/absentInfo/applyLeave', qs.stringify({
                            staffId: getCookie("staffId"),
                            absentReason: this.ruleForm.absentType,
                            absentStartTime: formatDateTime(this.ruleForm.absentStartTime),
                            absentEndTime: formatDateTime(this.ruleForm.absentEndTime),
                            absentDays: this.ruleForm.absentDays,
                            absentDetail: this.ruleForm.absentReason
                        })).then(response => {
                            console.log(response);
                            if (response.data.code == 1) {
                                this.$notify.error({
                                    title: '操作失败',
                                    message: response.data.message
                                });
                            } else {
                                this.$router.push('/ApplicationList');
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
            resetForm(formname) {
                this.$refs[formname].resetFields();
            }
        }
    }
</script>

<style>
    .div-block {
        padding: 20px;
        width: 60%;
        border: 1px solid #eaeefb;
        border-radius: 4px;
        transition: .2s;
    }

    .item {
        margin: 4px;
    }

    .left .el-tooltip__popper,
    .right .el-tooltip__popper {
        padding: 8px 10px;
    }
</style>
