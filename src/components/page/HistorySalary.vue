<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>工资管理</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>历史工资记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--<el-button style="position: absolute; right: 0px" type="primary">发送工资单到银行<i-->
        <!--class="el-icon-upload2 el-icon&#45;&#45;right"></i></el-button>-->
        <!--<el-button style="position: absolute; right: 0px" type="primary">发送工资单到各部门<i-->
        <!--class="el-icon-upload2 el-icon&#45;&#45;right"></i></el-button>-->
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-date-picker
                        v-model="selMonth"
                        type="month"
                        placeholder="选择工资月份" style="margin-bottom: 10px;width: 50%">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-input
                        placeholder="员工姓名、编号、部门..."
                        icon="search"
                        v-model="input2"
                        :on-icon-click="handleIconClick" style="margin-left: 50%; margin-bottom: 10px;width: 50%">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="员工职务">
                            <span>{{ props.row.staffDuty }}</span>
                        </el-form-item>
                        <el-form-item label="员工职称">
                            <span>{{ props.row.staffTitle }}</span>
                        </el-form-item>
                        <el-form-item label="入职年限">
                            <span>{{ props.row.workYears }}</span>
                        </el-form-item>

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
    </div>

</template>
<script>
    export default {
        data() {
            return {
                input2: '',
                selMonth: '',
                tableData: [{
                    checkTime: '2017.03',
                    staffNum: '2013001',
                    staffName: '蔡明',
                    staffSex: '男',
                    staffDep: '计算机学院',
                    staffDuty: '普通教职工',
                    staffTitle: '教授',
                    workYears: '7',
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
                    staffSex: '女',
                    staffDep: '计算机学院',
                    staffDuty: '普通教职工',
                    staffTitle: '副教授',
                    workYears: '16',
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
                    staffSex: '女',
                    staffDep: '软件工程学院',
                    staffDuty: '普通教职工',
                    staffTitle: '系主任',
                    workYears: '11',
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
                    staffSex: '女',
                    staffDep: '大气科学学院',
                    staffDuty: '普通教职工',
                    staffTitle: '讲师',
                    workYears: '5',
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

</style>
