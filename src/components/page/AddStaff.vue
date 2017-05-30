<template>
    <div class="div-block">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="员工姓名" prop="staffName">
                <el-input style="width: 60%;" v-model="ruleForm.staffName"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="staffSex">
                <el-select v-model="ruleForm.staffSex" placeholder="请选择员工性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属部门" prop="staffDep">
                <el-select v-model="ruleForm.staffDepartment" placeholder="请选择所属部门">
                    <el-option label="校长办公室" value="Dep_preOffice"></el-option>
                    <el-option label="党委办公室" value="Dep_parOffice"></el-option>
                    <el-option label="人事处" value="Dep_persDiv"></el-option>
                    <el-option label="财务处" value="Dep_finaDiv"></el-option>
                    <el-option label="软件工程学院" value="Dep_soWareDep"></el-option>
                    <el-option label="计算机学院" value="Dep_compuDep"></el-option>
                    <el-option label="教务处" value="Dep_deanDiv"></el-option>
                    <el-option label="审计处" value="Dep_auditDiv"></el-option>
                    <el-option label="学生工作处" value="Dep_stuDiv"></el-option>
                    <el-option label="图书馆" value="Dep_library"></el-option>
                    <el-option label="工会" value="Dep_labolUni"></el-option>
                    <el-option label="通信工程学院" value="Dep_commuDep"></el-option>
                    <el-option label="大气科学学院" value="Dep_atmosDep"></el-option>
                    <el-option label="电子信息工程学院" value="Dep_elecDep"></el-option>
                    <el-option label="文化艺术学院" value="Dep_culArtDep"></el-option>
                    <el-option label="管理学院" value="Dep_manaDep"></el-option>
                    <el-option label="数学学院" value="Dep_mathDep"></el-option>
                    <el-option label="科研处" value="Dep_reseaDiv"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职称" prop="staffTitle">
                <el-select v-model="ruleForm.staffTitle" placeholder="请选择员工职称">
                    <el-option label="教授" value="Tit_professor"></el-option>
                    <el-option label="副教授" value="Tit_assoProfe"></el-option>
                    <el-option label="讲师" value="Tit_lecturer"></el-option>
                    <el-option label="助教" value="Tit_assistant"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职务" prop="staffDuty">
                <el-select v-model="ruleForm.staffDuty" placeholder="请选择员工职务">
                    <el-option label="校长" value="Du_headMas"></el-option>
                    <el-option label="副校长" value="Du_viPresi"></el-option>
                    <el-option label="处长" value="Du_director"></el-option>
                    <el-option label="副处长" value="Du_deputyDirector"></el-option>
                    <el-option label="图书馆馆长" value="Du_libDre"></el-option>
                    <el-option label="系主任" value="Du_depHead"></el-option>
                    <el-option label="无职务" value="Du_noDuty"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="staffRole">
                <el-select v-model="ruleForm.staffRole" placeholder="请选择员工角色">
                    <el-option label="财务处管理员" value="R_finaMana"></el-option>
                    <el-option label="人事处管理员" value="R_persMana"></el-option>
                    <el-option label="部门管理员" value="R_depMana"></el-option>
                    <el-option label="普通教职工" value="R_teaStaff"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入职时间" required>
                <el-col :span="11">
                    <el-form-item prop="entryTime">
                        <el-date-picker format="yyyy-MM-dd" type="date" placeholder="选择入职日期" v-model="ruleForm.entryTime"
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
    import axios from 'axios';
    import qs from 'qs';
    export default {
        data() {
            return {
                ruleForm: {
                    staffName: '',
                    staffSex: '',
                    staffDepartment: '',
                    staffTitle: '',
                    staffDuty: '',
                    staffRole: '',
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
                    staffDepartment: [
                        {required: true, message: '请选择员工所属部门', trigger: 'change'}
                    ],
                    staffTitle: [
                        {required: true, message: '请选择员工职称', trigger: 'change'}
                    ],
                    staffDuty: [
                        {required: true, message: '请选择员工职务', trigger: 'change'}
                    ],
                    staffRole: [
                        {required: true, message: '请选择员工角色', trigger: 'change'}
                    ],
                    entryTime: [
                        {type: 'date', required: true, message: '请选择入职日期', trigger: 'change'}
                    ],
                    identityNum: [
                        {required: true, message: '请输入员工身份证号', trigger: 'blur'},
                        {length: 18, message: '长度为18位数字', trigger: 'blur'}
                    ],
                    bankAcount: [
                        {required: true, message: '请输入员工银行卡号', trigger: 'blur'},
                        {length: 18, message: '长度为18位数字', trigger: 'blur'}
                    ],
                    phoneNum: [
                        {required: true, message: '请输入员工电话号码', trigger: 'blur'},
                        {length: 11, message: '长度为11位数字', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            axios.post('http://139.224.129.108:8089/staffInfo/addStaff',qs.stringify(
                               {
                                    staffName: this.ruleForm.staffName,
                                    staffSex: this.ruleForm.staffSex,
                                    departmentId: this.ruleForm.staffDepartment,
                                    titleId: this.ruleForm.staffTitle,
                                    dutyId: this.ruleForm.staffDuty,
                                    roleId: this.ruleForm.staffRole,
                                    staffEntryTime: this.formatDateTime(this.ruleForm.entryTime),
                                    staffIdentityNum: this.ruleForm.identityNum,
                                    staffBankAcount: this.ruleForm.bankAcount,
                                    staffTel: this.ruleForm.phoneNum
                            })).then(response => {
                                console.log(response);
                                if (response.data.code == 1) {
                                    this.$notify.error({
                                        title: '操作失败',
                                        message: response.data.message
                                    });
                                } else {
                                    this.$router.push('/ManageStaffInfo');
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    }
                );
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            formatDateTime(date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;

                return y + '-' + m + '-' + d;
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
