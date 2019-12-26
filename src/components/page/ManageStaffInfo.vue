<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>员工信息</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>管理员工信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-input
            placeholder="员工姓名、编号、部门..."
            icon="search"
            v-model="staffInfoSearch"
            :on-icon-click="handleSearchClick" style="margin-bottom: 10px;width: 30%">
        </el-input>
        <el-table :data="staffListData" border style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="身份证号">
                            <span>{{ props.row.staffIdentityNum}}</span>
                        </el-form-item>
                        <el-form-item label="银行卡号">
                            <span>{{ props.row.staffBankAcount }}</span>
                        </el-form-item>
                        <el-form-item label="电话号码">
                            <span>{{ props.row.staffTel }}</span>
                        </el-form-item>
                        <el-form-item label="角色类型">
                            <span>{{ props.row.roleName }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                label="员工编号"
                prop="staffId">
            </el-table-column>
            <el-table-column
                label="员工姓名"
                prop="staffName">
            </el-table-column>
            <el-table-column
                label="性别"
                prop="staffSex">
            </el-table-column>
            <el-table-column
                prop="departmentName"
                label="所属部门"
                :filters="[{ text: '计算机系', value: '计算机系' }, { text: '软件工程学院', value: '软件工程学院' }, { text: '大气科学学院', value: '大气科学学院' }]"
                :filter-method="filterDep" width="120">
            </el-table-column>
            <el-table-column
                label="职称"
                prop="titleName"
                :filters="[{ text: '教授', value: '教授' }, { text: '副教授', value: '副教授' }, { text: '讲师', value: '讲师' }, { text: '系主任', value: '系主任' }]"
                :filter-method="filterTit">
            </el-table-column>
            <el-table-column
                label="职务"
                prop="dutyName"
                :filters="[{ text: '部门管理员', value: '部门管理员' }, { text: '财务处管理员', value: '财务处管理员' }, { text: '人事处管理员', value: '人事处管理员' }, { text: '普通教职工', value: '普通教职工' }]"
                :filter-method="filterDuty">
            </el-table-column>
            <el-table-column
                label="入职时间"
                prop="staffEntryTime">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.row)">修改
                    </el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.row.staffId)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="totalPage">
            </el-pagination>
        </div>
        <el-dialog title="修改员工信息" v-model="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="员工姓名" :label-width="formLabelWidth">
                    <el-input style="width: 60%;" v-model="ruleForm.staffName"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" :label-width="formLabelWidth">
                    <el-select v-model="ruleForm.staffDepartment" placeholder="请选择所属部门">
                        <el-option
                            v-for="item in options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职称" :label-width="formLabelWidth">
                    <el-select v-model="ruleForm.staffTitle" placeholder="请选择员工职称">
                        <el-option label="教授" value="教授"></el-option>
                        <el-option label="副教授" value="副教授"></el-option>
                        <el-option label="讲师" value="讲师"></el-option>
                        <el-option label="助教" value="助教"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职务" :label-width="formLabelWidth">
                    <el-select v-model="ruleForm.staffDuty" placeholder="请选择员工职务">
                        <el-option label="校长" value="校长"></el-option>
                        <el-option label="副校长" value="副校长"></el-option>
                        <el-option label="处长" value="处长"></el-option>
                        <el-option label="副处长" value="副处长"></el-option>
                        <el-option label="图书馆馆长" value="图书馆馆长"></el-option>
                        <el-option label="系主任" value="系主任"></el-option>
                        <el-option label="无职务" value="无职务"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="系统角色" :label-width="formLabelWidth">
                    <el-select v-model="ruleForm.staffRole" placeholder="请选择员工角色">
                        <el-option label="财务处管理员" value="财务处管理员"></el-option>
                        <el-option label="人事处管理员" value="人事处管理员"></el-option>
                        <el-option label="部门管理员" value="部门管理员"></el-option>
                        <el-option label="普通教职工" value="普通教职工"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input style="width: 60%;" v-model="ruleForm.identityNum"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号" :label-width="formLabelWidth">
                    <el-input style="width: 60%;" v-model="ruleForm.bankAcount"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input style="width: 60%;" v-model="ruleForm.phoneNum"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateStaffInfo()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style>
    .demo-table-expand {
        font-size: 0;
        margin-left: 50px;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .item {
        padding: 8px 0;
    }

    .el-table .cell, .el-table th > div {
        padding-left: 5px;
        padding-right: 5px;
    }

    .div-block {
        margin-top: 20px;
        padding: 20px;
        width: 60%;
        border: 1px solid #eaeefb;
        border-radius: 4px;
        transition: .2s;
    }
</style>

<script>
    import axios from 'axios';
    import qs from 'qs';
    import {getCookie, formatDateTime} from '../../assets/common/VueUtils.js';
    export default {
        data() {
            return {
                staffInfoSearch: '',
                currentPage: 1,
                pageSize: 6,
                totalPage: 0,
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
                },
                formLabelWidth: '120px',
                dialogFormVisible: false,
                staffListData: [],
                ruleForm: {
                    staffId: '',
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
                },
                options: [{
                    value: 'Dep_preOffice',
                    label: '校长办公室'
                }, {
                    value: 'Dep_parOffice',
                    label: '党委办公室'
                }, {
                    value: 'Dep_persDiv',
                    label: '人事处'
                }, {
                    value: 'Dep_deanDiv',
                    label: '教务处'
                }, {
                    value: 'Dep_reseaDiv',
                    label: '科研处'
                }, {
                    value: 'Dep_finaDiv',
                    label: '财务处'
                }, {
                    value: 'Dep_auditDiv',
                    label: '审计处'
                }, {
                    value: 'Dep_stuDiv',
                    label: '学生工作处'
                }, {
                    value: 'Dep_library',
                    label: '图书馆'
                }, {
                    value: 'Dep_labolUni',
                    label: '工会'
                }, {
                    value: 'Dep_compuDep',
                    label: '计算机系'
                }, {
                    value: 'Dep_commuDep',
                    label: '通信工程系'
                }, {
                    value: 'Dep_atmosDep',
                    label: '大气科学系'
                }, {
                    value: 'Dep_elecDep',
                    label: '电子信息系'
                }, {
                    value: 'Dep_soWareDep',
                    label: '软件工程系'
                }, {
                    value: 'Dep_culArtDep',
                    label: '文化艺术系'
                }, {
                    value: 'Dep_manaDep',
                    label: '管理系'
                }, {
                    value: 'Dep_mathDep',
                    label: '数学系'
                }]
            }
        },
        created: function () {
            this.getStaffList(this.staffInfoSearch, this.currentPage, this.pageSize);
        },
        methods: {
            getStaffList(staffInfoSearch, currentPage, pageSize){
                axios.get('http://localhost:8080/staffInfo/staffList', {
                    params: {
                        staffInfoSearch: staffInfoSearch,
                        currentPage: currentPage,
                        pageSize: pageSize
                    }
                }).then((response) => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: '服务端出错啦~'
                        });
                    } else {
                        this.staffListData = response.data.data.staffInfoViews;
                        this.totalPage = response.data.data.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleSearchClick(ev) {
                this.getStaffList(this.staffInfoSearch, this.currentPage, this.pageSize);
            },
            handleEdit(row) {
                this.ruleForm.staffId = row.staffId;
                this.ruleForm.staffName = row.staffName;
                this.ruleForm.staffSex = row.staffSex;
                this.ruleForm.staffDuty = row.dutyName;
                this.ruleForm.staffTitle = row.titleName;
                this.ruleForm.entryTime = row.staffEntryTime;
                this.ruleForm.staffDepartment = row.departmentName;
                this.ruleForm.staffRole = row.roleName;
                this.ruleForm.identityNum = row.staffIdentityNum;
                this.ruleForm.bankAcount = row.staffBankAcount;
                this.ruleForm.phoneNum = row.staffTel;
                this.dialogFormVisible = true;
            },
            updateStaffInfo(){
                this.dialogFormVisible = false;
                axios.post('http://localhost:8080/staffInfo/updateStaffInfo', qs.stringify({
                    staffId: this.ruleForm.staffId,
                    staffName: this.ruleForm.staffName,
                    staffSex: this.ruleForm.staffSex,
                    staffIdentityNum: this.ruleForm.identityNum,
                    departmentId: this.ruleForm.staffDepartment,
                    titleId: this.ruleForm.staffTitle,
                    dutyId: this.ruleForm.staffDuty,
                    staffEntryTime: this.ruleForm.entryTime,
                    staffBankAcount: this.ruleForm.bankAcount,
                    staffTel: this.ruleForm.phoneNum,
                    roleId: this.ruleForm.staffRole
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.$message({
                            message: '调整成功',
                            type: 'success'
                        });
                        this.getStaffList(this.staffInfoSearch, this.currentPage, this.pageSize);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleDelete(id) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('http://localhost:8080/staffInfo/deleteStaffInfo', qs.stringify({
                        staffId: id
                    })).then(response => {
                        console.log(response);
                        if (response.data.code == 1) {
                            this.$notify.error({
                                title: '操作失败',
                                message: response.data.message
                            });
                        } else {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getStaffList(this.staffInfoSearch, this.currentPage, this.pageSize);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getStaffList(this.staffInfoSearch, this.currentPage, this.pageSize);
            },
            filterTit(value, row) {
                return row.staffTitle === value;
            },
            filterDep(value, row) {
                return row.departmentName === value;
            },
            filterDuty(value, row) {
                return row.dutyName === value;
            }
        }
    }
</script>

