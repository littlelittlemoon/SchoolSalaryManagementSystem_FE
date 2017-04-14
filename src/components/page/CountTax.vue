<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待处理" name="first" style="position: relative;">
            <el-input
                placeholder="员工姓名、编号、部门..."
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick" style="margin-bottom: 10px;width: 30%">
            </el-input>
            <el-button style="position: absolute; right: 0px" type="primary">计算扣税金额<i
                class="el-icon-edit el-icon--right"></i></el-button>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="65" fixed>
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
                <el-table-column
                    label="缺勤扣款"
                    prop="absentMoney">
                </el-table-column>
                <el-table-column
                    label="五险一金"
                    prop="insMoney">
                </el-table-column>
                <el-table-column label="操作" style="width: 10%" fixed="right">
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

        <el-tab-pane label="已处理" name="second">
            <el-input
                placeholder="员工姓名、编号、部门..."
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick" style="margin-bottom: 10px;width: 30%">
            </el-input>
            <el-button style="position: absolute; right: 0px" type="primary">上报财务处<i
                class="el-icon-upload2 el-icon--right"></i></el-button>
            <el-table :data="tableData2" border style="width: 100%" v-if="twoHide">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="交税基数">
                                <span>{{ props.row.taxBaseMoney }}</span>
                            </el-form-item>
                            <el-form-item label="适用税率">
                                <span>{{ props.row.taxRatio }}</span>
                            </el-form-item>
                            <el-form-item label="速算扣除数">
                                <span>{{ props.row.taxCalculate }}</span>
                            </el-form-item>
                            <el-form-item label="交税金额">
                                <span>{{ props.row.totalTaxMoney }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
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
                    label="交税基数"
                    prop="taxBaseMoney">
                </el-table-column>
                <el-table-column
                    label="交税金额"
                    prop="totalTaxMoney">
                </el-table-column>
                <!--<el-table-column label="操作" style="width: 10%">-->
                <!--<template scope="scope">-->
                <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看明细</el-button>-->
                <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <div class="pagination" v-if="twoHide">
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
            <!--<el-breadcrumb separator="/" v-if="!twoHide">-->
                <!--<el-breadcrumb-item>{{tableData[0].staffDep}}</el-breadcrumb-item>-->
                <!--<el-breadcrumb-item>{{tableData[0].staffName}}</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->

        </el-tab-pane>
    </el-tabs>
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
</style>

<script>
    export default {
        data() {
            return {
                input2: '',
                oneHide: true,
                twoHide: true,
                activeName: 'first',

                tableData: [{
                    checkTime: '2017.03',
                    staffDep: '计算机学院',
                    staffNum: '2013001',
                    staffName: '蔡明',
                    staffTitle: '教授',
                    staffDuty: '普通教职工',
                    dutyMoney: '0￥',
                    titleMoney: '2400￥',
                    baseMoney: '4500￥',
                    absentMoney: '250￥',
                    insMoney: '477.8￥'
                }, {
                    checkTime: '2017.03',
                    staffDep: '计算机学院',
                    staffNum: '2013002',
                    staffName: '刘敏',
                    staffTitle: '副教授',
                    staffDuty: '普通教职工',
                    dutyMoney: '0￥',
                    titleMoney: '2300￥',
                    baseMoney: '4300￥',
                    absentMoney: '150￥',
                    insMoney: '464.4￥'
                }, {
                    checkTime: '2017.03',
                    staffDep: '软件工程学院',
                    staffNum: '2013004',
                    staffName: '振宇',
                    staffTitle: '系主任',
                    staffDuty: '普通教职工',
                    dutyMoney: '0￥',
                    titleMoney: '3000￥',
                    baseMoney: '4500￥',
                    absentMoney: '300￥',
                    insMoney: '518.4￥'
                }, {
                    checkTime: '2017.03',
                    staffDep: '大气科学学院',
                    staffNum: '2013005',
                    staffName: '李华',
                    staffTitle: '讲师',
                    staffDuty: '普通教职工',
                    dutyMoney: '0￥',
                    titleMoney: '2200￥',
                    baseMoney: '4200￥',
                    absentMoney: '150￥',
                    insMoney: '450￥'
                }],

                tableData2: [{
                    checkTime: '2017.03',
                    staffDep: '计算机学院',
                    staffNum: '2013001',
                    staffName: '蔡明',
                    staffTitle: '教授',
                    staffDuty: '普通教职工',
                    dutyMoney: '0￥',
                    taxBaseMoney: '2672.2￥',
                    taxRatio: '0.1',
                    taxCalculate: '105￥',
                    totalTaxMoney: '162.22￥'
                }, {
                    checkTime: '2017.03',
                    staffDep: '计算机学院',
                    staffNum: '2013002',
                    staffName: '刘敏',
                    staffTitle: '副教授',
                    staffDuty: '普通教职工',
                    dutyMoney: '0￥',
                    taxBaseMoney: '2485.6￥',
                    taxRatio: '0.1',
                    taxCalculate: '105￥',
                    totalTaxMoney: '143.56￥'
                }, {
                    checkTime: '2017.03',
                    staffDep: '软件工程学院',
                    staffNum: '2013004',
                    staffName: '振宇',
                    staffTitle: '系主任',
                    staffDuty: '普通教职工',
                    dutyMoney: '0￥',
                    taxBaseMoney: '3181.6￥',
                    taxRatio: '0.1',
                    taxCalculate: '105￥',
                    totalTaxMoney: '213.16￥'
                }, {
                    checkTime: '2017.03',
                    staffDep: '大气科学学院',
                    staffNum: '2013005',
                    staffName: '李华',
                    staffTitle: '讲师',
                    staffDuty: '普通教职工',
                    dutyMoney: '0￥',
                    taxBaseMoney: '2300￥',
                    taxRatio: '0.1',
                    taxCalculate: '105￥',
                    totalTaxMoney: '125￥'
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
            filterDep(value, row) {
                return row.staffDep === value;
            },
            filterDuty(value, row) {
                return row.staffDuty === value;
            }
        }
    }
</script>


