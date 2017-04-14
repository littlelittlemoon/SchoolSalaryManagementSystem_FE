<template>
    <div class="div-block">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="员工姓名" prop="staffName">
                <el-input style="width: 60%;" v-model="ruleForm.staffName"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="staffSex">
                <el-select v-model="ruleForm.staffSex" placeholder="请选择员工性别">
                    <el-option label="男" value="male"></el-option>
                    <el-option label="女" value="female"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属部门" prop="staffDep">
                <el-select v-model="ruleForm.staffDep" placeholder="请选择所属部门">
                    <el-option label="人事处" value="PersonnelDivision"></el-option>
                    <el-option label="财务处" value="FinancialDepartment"></el-option>
                    <el-option label="软件工程学院" value="SoftwareEngineeringInstitute"></el-option>
                    <el-option label="计算机学院" value="DepartmentOfComputerScience"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职称" prop="staffTitle">
                <el-select v-model="ruleForm.staffTitle" placeholder="请选择员工职称">
                    <el-option label="教授" value="professor"></el-option>
                    <el-option label="副教授" value="associateProfessor"></el-option>
                    <el-option label="讲师" value="lecturer"></el-option>
                    <el-option label="副教授" value="associateProfessor"></el-option>
                    <el-option label="校长" value="Principal"></el-option>
                    <el-option label="副校长" value="associateProfessor"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职务" prop="staffDuty">
                <el-select v-model="ruleForm.staffDuty" placeholder="请选择员工职务">
                    <el-option label="人事处管理员" value="personnelManager"></el-option>
                    <el-option label="财务处管理员" value="financeManager"></el-option>
                    <el-option label="部门管理员" value="departManager"></el-option>
                    <el-option label="普通教职工" value="teachingStaff"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入职时间" required>
                <el-col :span="11">
                    <el-form-item prop="entryTime">
                        <el-date-picker type="date" placeholder="选择入职日期" v-model="ruleForm.entryTime"
                                        style="width: 85%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="身份证号" prop="identityNum">
                <el-input style="width: 60%;" v-model="ruleForm.identityNum"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号" prop="bankAcount">
                <el-input style="width: 60%;" v-model="ruleForm.bankAcount"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phoneNum">
                <el-input style="width: 60%;" v-model="ruleForm.phoneNum"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">调入员工</el-button>
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
                    staffName: '',
                    staffSex: '',
                    staffDep: '',
                    staffTitle: '',
                    staffDuty: '',
                    entryTime: '',
                    identityNum: '',
                    bankAcount: '',
                    phoneNum: ''
                },
                rules: {
                    staffName: [
                        {required: true, message: '请输入员工姓名', trigger: 'blur'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
                    ],
                    staffSex: [
                        {required: true, message: '请选择员工性别', trigger: 'change'}
                    ],
                    staffDep: [
                        {required: true, message: '请选择员工所属部门', trigger: 'change'}
                    ],
                    staffTitle: [
                        {required: true, message: '请选择员工职称', trigger: 'change'}
                    ],
                    staffDuty: [
                        {required: true, message: '请选择员工职务', trigger: 'change'}
                    ],
                    entryTime: [
                        {type: 'date', required: true, message: '请选择入职日期', trigger: 'change'}
                    ],
                    identityNum: [
                        {required: true, message: '请输入员工身份证号', trigger: 'blur'},
                        {length:18, message: '长度为18位数字', trigger: 'blur'}
                    ],
                    bankAcount: [
                        {required: true, message: '请输入员工银行卡号', trigger: 'blur'},
                        {length:18, message: '长度为18位数字', trigger: 'blur'}
                    ],
                    phoneNum: [
                        {required: true, message: '请输入员工电话号码', trigger: 'blur'},
                        {length:11, message: '长度为11位数字', trigger: 'blur'}
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
</style>
