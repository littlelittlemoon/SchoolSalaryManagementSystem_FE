<template>
    <div>
        <el-input
            placeholder="员工姓名、编号、部门..."
            icon="search"
            v-model="input2"
            :on-icon-click="handleIconClick" style="margin-bottom: 10px;width: 30%" v-if="twoHide">
        </el-input>
        <!--<el-button style="position: absolute; right: 0px" type="primary">上报财务处<i-->
        <!--class="el-icon-upload2 el-icon&#45;&#45;right"></i></el-button>-->
        <el-table :data="tableData" border style="width: 100%" v-if="twoHide">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" >
                        <el-form-item label="身份证号">
                            <span>{{ props.row.identityNum }}</span>
                        </el-form-item>
                        <el-form-item label="银行卡号">
                            <span>{{ props.row.bankAcount }}</span>
                        </el-form-item>
                        <el-form-item label="电话号码">
                            <span>{{ props.row.phoneNum }}</span>
                        </el-form-item>
                        <el-form-item label="基本工资">
                            <span>{{ props.row.baseMoney }}</span>
                        </el-form-item>
                        <el-form-item label="职务工资">
                            <span>{{ props.row.dutyMoney }}</span>
                        </el-form-item>
                        <el-form-item label="职称工资">
                            <span>{{ props.row.titleMoney }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                type="selection"
                width="70">
            </el-table-column>
            <el-table-column
                label="员工编号"
                prop="staffNum">
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
                prop="staffDep"
                label="所属部门"
                :filters="[{ text: '计算机学院', value: '计算机学院' }, { text: '软件工程学院', value: '软件工程学院' }, { text: '大气科学学院', value: '大气科学学院' }]"
                :filter-method="filterDep" width="120">
            </el-table-column>
            <el-table-column
                label="职称"
                prop="staffTitle"
                :filters="[{ text: '教授', value: '教授' }, { text: '副教授', value: '副教授' }, { text: '讲师', value: '讲师' }, { text: '系主任', value: '系主任' }]"
                :filter-method="filterTit">
            </el-table-column>
            <el-table-column
                label="职务"
                prop="staffDuty"
                :filters="[{ text: '部门管理员', value: '部门管理员' }, { text: '财务处管理员', value: '财务处管理员' }, { text: '人事处管理员', value: '人事处管理员' }, { text: '普通教职工', value: '普通教职工' }]"
                :filter-method="filterDuty">
            </el-table-column>
            <el-table-column
                label="入职时间"
                prop="entryTime">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button size="small" type="danger"
                               @click="isDelete">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination" v-if="twoHide">
            <el-pagination
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>

        <el-breadcrumb separator="/" v-if="!twoHide">
            <el-breadcrumb-item>{{tableData[0].staffDep}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{tableData[0].staffName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="div-block" v-if="!twoHide">
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
                    <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
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
        margin-top:20px;
        padding: 20px;
        width: 60%;
        border: 1px solid #eaeefb;
        border-radius: 4px;
        transition: .2s;
    }
</style>

<script>
    export default {
        data() {
            return {
                input2: '',
                oneHide: true,
                twoHide: true,
                activeName: 'first',
                ruleForm: {
                    staffName: '蔡明',
                    staffSex: '男',
                    staffDep: '计算机学院',
                    staffTitle: '教授',
                    staffDuty: '普通教职工',
                    entryTime: '2009.05.06',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351'
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
                },
                tableData: [{
                    staffNum: '2013001',
                    staffName: '蔡明',
                    staffSex: '男',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351',
                    entryTime: '2009.05.06',
                    staffDep: '计算机学院',
                    staffDuty: '普通教职工',
                    staffTitle: '教授',
                    titleMoney: '2400￥',
                    dutyMoney: '0￥',
                    baseMoney: '4500￥'
                }, {
                    staffNum: '2013002',
                    staffName: '刘敏',
                    staffSex: '女',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351',
                    entryTime: '2003.05',
                    staffDep: '计算机学院',
                    staffDuty: '普通教职工',
                    staffTitle: '副教授',
                    titleMoney: '2300￥',
                    dutyMoney: '0￥',
                    baseMoney: '4300￥'
                }, {
                    staffNum: '2013004',
                    staffName: '振宇',
                    staffSex: '女',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351',
                    entryTime: '2003.05',
                    staffDep: '软件工程学院',
                    staffDuty: '普通教职工',
                    staffTitle: '系主任',
                    titleMoney: '3000￥',
                    dutyMoney: '0￥',
                    baseMoney: '4500￥'
                }, {
                    staffNum: '2013005',
                    staffName: '李华',
                    staffSex: '女',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351',
                    entryTime: '2012.01',
                    staffDep: '大气科学学院',
                    staffDuty: '普通教职工',
                    staffTitle: '讲师',
                    titleMoney: '2200￥',
                    dutyMoney: '0￥',
                    baseMoney: '4200￥'
                }]
            }
        },
        methods: {
            handleIconClick(ev) {
                console.log(ev);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTit(value, row) {
                return row.staffTitle === value;
            },
            handleEdit(index, row) {
                this.$message('修改第' + (index + 1) + '行');
                this.twoHide = false;
            },
            handleDelete(index, row) {
                this.$message.error('删除第' + (index + 1) + '行');
            },
            oneHandleEdit(index, row) {
                this.$message('管理第' + (index + 1) + '行');
                this.oneHide = false;

            },
            oneHandleDelete(index, row) {
                this.$message.error('删除第' + (index + 1) + '行');
            },
            filterDep(value, row) {
                return row.staffDep === value;
            },
            filterDuty(value, row) {
                return row.staffDuty === value;
            },
            isDelete() {
                this.$confirm('删除‘计算机学院成员：蔡明’, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });
            }
        }
    }
</script>

