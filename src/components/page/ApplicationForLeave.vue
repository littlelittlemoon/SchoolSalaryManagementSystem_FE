<template>
    <div class="div-block">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="请假原因" prop="reason">
                <el-select v-model="ruleForm.reason" placeholder="请假原因">
                    <el-option label="事假" value="shijia"></el-option>
                    <el-option label="病假" value="bingjia"></el-option>
                    <el-option label="婚假" value="hunjia"></el-option>
                    <el-option label="产假" value="chanjia"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请假时间" required>
                <el-col :span="11">
                    <!--<el-tooltip class="item" effect="light" content="请提前一周申请！" placement="bottom-start">-->
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="请假开始时间" v-model="ruleForm.date1"
                                            style="width: 80%;"></el-date-picker>
                        </el-form-item>
                    <!--</el-tooltip>-->
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-date-picker type="date" placeholder="请假结束时间" v-model="ruleForm.date2"
                                        style="width: 80%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="备注" style="width: 92%;" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即申请</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    reason: '',
                    date1: '',
                    date2: '',
                    desc: ''
                },
                rules: {
                    reason: [
                        {required: true, message: '请选择请假原因', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择开始日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择结束日期', trigger: 'change'}
                    ],
                    desc: [
                        {required: false, message: '备注', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
