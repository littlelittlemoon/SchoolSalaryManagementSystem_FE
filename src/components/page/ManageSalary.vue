<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="基本工资情况" name="first">
            <el-input
                placeholder="员工姓名、编号、部门..."
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick" style="margin-bottom: 10px;width: 30%">
            </el-input>
            <el-table :data="tableData1" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="身份证号">
                                <span>{{ props.row.identityNum }}</span>
                            </el-form-item>
                            <el-form-item label="银行卡号">
                                <span>{{ props.row.bankAcount }}</span>
                            </el-form-item>
                            <el-form-item label="电话号码">
                                <span>{{ props.row.phoneNum }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="员工编号"
                    prop="staffNum" style="padding-left: 0; padding-right: 0;">
                </el-table-column>
                <el-table-column
                    label="员工姓名"
                    prop="staffName" style="padding-left: 0; padding-right: 0;">
                </el-table-column>
                <el-table-column
                    label="员工性别"
                    prop="staffSex" style="padding-left: 0; padding-right: 0;">
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
                    label="职称工资"
                    prop="titleMoney">
                </el-table-column>
                <el-table-column
                    label="职务工资"
                    prop="dutyMoney">
                </el-table-column>
                <el-table-column
                    label="基本工资"
                    prop="baseMoney">
                </el-table-column>
            </el-table>
            <div class="pagination"><!--v-if="oneHide"-->
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
        </el-tab-pane>

        <el-tab-pane label="扣款细则" name="second">
            <el-input
                placeholder="员工姓名、编号、部门..."
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick" style="margin-bottom: 10px;width: 30%">
            </el-input>
            <el-table :data="tableData2" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="70">
                </el-table-column>
                <el-table-column
                    label="审核年月"
                    prop="checkTime" style="padding-left: 0; padding-right: 0;">
                </el-table-column>
                <el-table-column
                    label="员工编号"
                    prop="staffNum" style="padding-left: 0; padding-right: 0;">
                </el-table-column>
                <el-table-column
                    label="员工姓名"
                    prop="staffName" style="padding-left: 0; padding-right: 0;">
                </el-table-column>
                <el-table-column
                    prop="staffDep"
                    label="所属部门"
                    :filters="[{ text: '计算机学院', value: '计算机学院' }, { text: '软件工程学院', value: '软件工程学院' }, { text: '大气科学学院', value: '大气科学学院' }]"
                    :filter-method="filterDep" width="150">
                </el-table-column>
                <el-table-column
                    label="缺勤扣款"
                    prop="absentMoney">
                </el-table-column>
                <el-table-column
                    label="五险一金"
                    prop="insMoney">
                </el-table-column>
                <el-table-column
                    label="交税金额"
                    prop="totalTaxMoney">
                </el-table-column>
                <el-table-column label="操作" style="width: 10%">
                    <template scope="scope">
                        <el-button size="small" @click="oneHandleEdit(scope.$index, scope.row)">管理</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination"><!--v-if="oneHide"-->
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
        </el-tab-pane>

        <el-tab-pane label="奖金细则" name="third">
            <el-input
                placeholder="员工姓名、编号、部门..."
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick" style="margin-bottom: 10px;width: 30%">
            </el-input>
            <el-table :data="tableData3" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="70">
                </el-table-column>
                <el-table-column
                    label="审核年月"
                    prop="checkTime" style="padding-left: 0; padding-right: 0;">
                </el-table-column>
                <el-table-column
                    label="员工编号"
                    prop="staffNum" style="padding-left: 0; padding-right: 0;">
                </el-table-column>
                <el-table-column
                    label="员工姓名"
                    prop="staffName" style="padding-left: 0; padding-right: 0;">
                </el-table-column>
                <el-table-column
                    prop="staffDep"
                    label="所属部门"
                    :filters="[{ text: '计算机学院', value: '计算机学院' }, { text: '软件工程学院', value: '软件工程学院' }, { text: '大气科学学院', value: '大气科学学院' }]"
                    :filter-method="filterDep" width="150">
                </el-table-column>
                <el-table-column
                    label="工龄津贴"
                    prop="seniorAllowance">
                </el-table-column>
                <el-table-column
                    label="全勤奖"
                    prop="fullAllowance">
                </el-table-column>
                <el-table-column
                    label="福利补贴"
                    prop="welfAllowance">
                </el-table-column>
                <el-table-column label="操作" style="width: 10%">
                    <template scope="scope">
                        <el-button size="small" @click="oneHandleEdit(scope.$index, scope.row)">管理</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination"><!--v-if="oneHide"-->
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="生成工资表" name="forth">
            <!--<el-button style="position: absolute; left: 215px;" type="success" @click="isPrint" v-if="hide">-->
                <!--生成工资表<i class="el-icon-upload2 el-icon&#45;&#45;right"></i></el-button>-->
            <el-button style="position: absolute; right: 0px" type="primary" @click="isSendToBank" >发送工资单到银行<i
                class="el-icon-upload2 el-icon--right"></i></el-button>
            <el-button style="position: absolute; right: 0px" type="primary" @click="isSendToBank">发送工资单到银行<i
                class="el-icon-upload2 el-icon--right"></i></el-button>
            <el-button style="position: absolute; right:215px;" :plain="true" type="success" @click="isSendToDep">
                发送工资单到各部门<i class="el-icon-upload2 el-icon--right"></i></el-button>

            <el-input
                placeholder="员工姓名、编号、部门..."
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick" style="margin-bottom: 10px;width: 30%">
            </el-input>
            <el-table :data="tableData4" border style="width: 100%">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">

                            <el-form-item label="职称工资">
                                <span>{{ props.row.titleMoney }}</span>
                            </el-form-item>
                            <el-form-item label="职务工资">
                                <span>{{ props.row.dutyMoney }}</span>
                            </el-form-item>
                            <el-form-item label="基本工资">
                                <span>{{ props.row.baseMoney }}</span>
                            </el-form-item>

                            <el-form-item label="缺勤扣款">
                                <span>{{ props.row.absentMoney }}</span>
                            </el-form-item>
                            <el-form-item label="五险一金">
                                <span>{{ props.row.insMoney }}</span>
                            </el-form-item>
                            <el-form-item label="交税金额">
                                <span>{{ props.row.totalTaxMoney }}</span>
                            </el-form-item>

                            <el-form-item label="工龄津贴">
                                <span>{{ props.row.seniorAllowance }}</span>
                            </el-form-item>
                            <el-form-item label="全勤奖">
                                <span>{{ props.row.fullAllowance }}</span>
                            </el-form-item>
                            <el-form-item label="福利补贴">
                                <span>{{ props.row.welfAllowance }}</span>
                            </el-form-item>

                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="审核年月"
                    prop="checkTime">
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
                    prop="staffDep"
                    label="所属部门"
                    :filters="[{ text: '计算机学院', value: '计算机学院' }, { text: '软件工程学院', value: '软件工程学院' }, { text: '大气科学学院', value: '大气科学学院' }]"
                    :filter-method="filterDep" width="150">
                </el-table-column>
                <el-table-column
                    label="应发工资"
                    prop="shouldPay">
                </el-table-column>
                <el-table-column
                    label="实发工资"
                    prop="realPay" style="padding-left: 0; padding-right: 0;">
                </el-table-column>
                <el-table-column
                    label="发放银行卡"
                    prop="bankAcount" width="200">
                </el-table-column>
            </el-table>
            <div class="pagination"><!--v-if="oneHide"-->
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    export default {
        data() {
            return {
//                hide: true,
                input2: '',
                activeName: 'first',
                tableData1: [{
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
                    dutyMoney: '0￥',
                    titleMoney: '2200￥',
                    baseMoney: '4200￥',
                }, {
                    staffNum: '2013002',
                    staffName: '刘敏',
                    staffSex: '女',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351',
                    entryTime: '2003.05.11',
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
                    entryTime: '2003.05.14',
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
                    entryTime: '2012.01.12',
                    staffDep: '大气科学学院',
                    staffDuty: '普通教职工',
                    staffTitle: '讲师',
                    titleMoney: '2200￥',
                    dutyMoney: '0￥',
                    baseMoney: '4200￥'
                }],
                tableData2: [{
                    checkTime: '2017.03',
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
                    absentMoney: '250￥',
                    insMoney: '477.8￥',
                    totalTaxMoney: '125￥'
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013002',
                    staffName: '刘敏',
                    staffSex: '女',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351',
                    entryTime: '2003.05.11',
                    staffDep: '计算机学院',
                    staffDuty: '普通教职工',
                    staffTitle: '副教授',
                    absentMoney: '150￥',
                    insMoney: '464.4￥',
                    totalTaxMoney: '143.56￥'
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013004',
                    staffName: '振宇',
                    staffSex: '女',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351',
                    entryTime: '2003.05.14',
                    staffDep: '软件工程学院',
                    staffDuty: '普通教职工',
                    staffTitle: '系主任',
                    absentMoney: '300￥',
                    insMoney: '518.4￥',
                    totalTaxMoney: '213.16￥'
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013005',
                    staffName: '李华',
                    staffSex: '女',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351',
                    entryTime: '2012.01.12',
                    staffDep: '大气科学学院',
                    staffDuty: '普通教职工',
                    staffTitle: '讲师',
                    absentMoney: '150￥',
                    insMoney: '450￥',
                    totalTaxMoney: '125￥'
                }],
                tableData3: [{
                    checkTime: '2017.03',
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
                    seniorAllowance: '100￥',
                    welfAllowance: '500￥',
                    fullAllowance: '0￥'
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013002',
                    staffName: '刘敏',
                    staffSex: '女',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351',
                    entryTime: '2003.05.11',
                    staffDep: '计算机学院',
                    staffDuty: '普通教职工',
                    staffTitle: '副教授',
                    seniorAllowance: '200￥',
                    welfAllowance: '500￥',
                    fullAllowance: '0￥'
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013004',
                    staffName: '振宇',
                    staffSex: '女',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351',
                    entryTime: '2003.05.14',
                    staffDep: '软件工程学院',
                    staffDuty: '普通教职工',
                    staffTitle: '系主任',
                    seniorAllowance: '150￥',
                    welfAllowance: '500￥',
                    fullAllowance: '0￥'
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013005',
                    staffName: '李华',
                    staffSex: '女',
                    identityNum: '510231198603024682',
                    bankAcount: '6217253100003034123',
                    phoneNum: '18408652351',
                    entryTime: '2012.01.12',
                    staffDep: '大气科学学院',
                    staffDuty: '普通教职工',
                    staffTitle: '讲师',
                    seniorAllowance: '50￥',
                    welfAllowance: '500￥',
                    fullAllowance: '0￥'
                }],
                tableData4: [{
                    checkTime: '2017.03',
                    staffNum: '2013001',
                    staffName: '蔡明',
                    staffDep: '计算机学院',
                    dutyMoney: '0￥',
                    titleMoney: '2200￥',
                    baseMoney: '4200￥',
                    absentMoney: '250￥',
                    insMoney: '477.8￥',
                    totalTaxMoney: '125￥',
                    seniorAllowance: '100￥',
                    welfAllowance: '500￥',
                    fullAllowance: '0￥',
                    shouldPay: '6400￥',
                    realPay: '6147.2￥',
                    bankAcount: '6217253100003034123'
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013002',
                    staffName: '刘敏',
                    staffDep: '计算机学院',
                    titleMoney: '2300￥',
                    dutyMoney: '0￥',
                    baseMoney: '4300￥',
                    absentMoney: '150￥',
                    insMoney: '464.4￥',
                    totalTaxMoney: '143.56￥',
                    seniorAllowance: '200￥',
                    welfAllowance: '500￥',
                    fullAllowance: '0￥',
                    shouldPay: '6600￥',
                    realPay: '6542.04￥',
                    bankAcount: '6217253100003034123'
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013004',
                    staffName: '振宇',
                    staffDep: '软件工程学院',
                    titleMoney: '3000￥',
                    dutyMoney: '0￥',
                    baseMoney: '4500￥',
                    absentMoney: '300￥',
                    insMoney: '518.4￥',
                    totalTaxMoney: '213.16￥',
                    seniorAllowance: '150￥',
                    welfAllowance: '500￥',
                    fullAllowance: '0￥',
                    shouldPay: '7500￥',
                    realPay: '7118.44￥',
                    bankAcount: '6217253100003034123'
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013005',
                    staffName: '李华',
                    staffDep: '大气科学学院',
                    titleMoney: '2200￥',
                    dutyMoney: '0￥',
                    baseMoney: '4200￥',
                    absentMoney: '150￥',
                    insMoney: '450￥',
                    totalTaxMoney: '125￥',
                    seniorAllowance: '50￥',
                    welfAllowance: '500￥',
                    fullAllowance: '0￥',
                    shouldPay: '6400￥',
                    realPay: '6225￥',
                    bankAcount: '6217253100003034123'
                }]
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            filterDep(value, row) {
                return row.staffDep === value;
            },
            filterTit(value, row) {
                return row.staffTitle === value;
            },
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
                this.$message('编辑第' + (index + 1) + '行');
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
            filterDuty(value, row) {
                return row.staffDuty === value;
            },
            isSendToBank() {
                this.$confirm('将工资发放细则发送至银行, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '发送成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消发送'
                    });
                });
            },
            isSendToDep() {
                this.$confirm('将工资单发送至各部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '发送成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消发送'
                    });
                });
            },
            isPrint(){
                this.$confirm('是否生成工资单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '生成成功!',
                        hide: false
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消生成'
                    });
                });
            }
        }
    };
</script>


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
        width: 33%;
    }

    .item {
        padding: 8px 0;
    }
</style>
