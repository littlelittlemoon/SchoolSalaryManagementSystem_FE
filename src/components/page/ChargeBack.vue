<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待处理" name="first" style="position: relative;">
            <el-input
                placeholder="员工姓名、编号、部门..."
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick" style="margin-bottom: 10px;width: 30%" >
            </el-input>
            <el-button style="position: absolute; right: 0px" type="primary">计算缺勤金<i class="el-icon-edit el-icon--right"></i></el-button>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" v-if="oneHide">
                <el-table-column type="expand" >
                    <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <div v-for="absence in props.row.absences" class="item">
                                <el-form-item label="考勤时间">
                                    <span>{{absence.checkDetailTime}}</span>
                                </el-form-item>
                                <el-form-item label="缺勤原因">
                                    <span>{{absence.absentReason}}</span>
                                </el-form-item>
                            </div>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    type="selection"
                    width="80">
                </el-table-column>
                <el-table-column
                    label="考勤年月"
                    prop="checkTime">
                </el-table-column>
                <el-table-column
                    prop="staffDep"
                    label="所属部门"
                    :filters="[{ text: '计算机学院', value: '计算机学院' }, { text: '软件工程学院', value: '软件工程学院' }, { text: '大气科学学院', value: '大气科学学院' }]"
                    :filter-method="filterDep" width="200">
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
                    label="缺勤天数"
                    prop="absentDays">
                </el-table-column>
                <el-table-column label="操作" style="width: 10%">
                    <template scope="scope">
                        <el-button size="small" @click="oneHandleEdit(scope.$index, scope.row)">管理</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination" v-if="oneHide">
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>

            <el-breadcrumb separator="/" v-if="!oneHide">
                <el-breadcrumb-item>{{tableData[0].staffDep}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{tableData[0].staffName}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-table :data="tableData[0].absences" border style="width: 100%; margin-top: 20px;" v-if="!oneHide">
                <el-table-column prop="checkDetailTime" label="缺勤日期" sortable style="width: 30%">
                </el-table-column>
                <el-table-column prop="absentReason" label="缺勤原因" style="width: 30%">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" type="primary"
                                   @click="oneHandleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="small" type="danger"
                                   @click="oneHandleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>

        <el-tab-pane label="已处理" name="second">

            <el-input
                placeholder="员工姓名、编号、部门..."
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick" style="margin-bottom: 10px;width: 30%" >
            </el-input>
            <el-button style="position: absolute; right: 0px" type="primary">上报财务处<i class="el-icon-upload2 el-icon--right"></i></el-button>
            <el-table :data="tableData" border style="width: 100%" v-if="twoHide">
                <el-table-column
                    label="考勤年月"
                    prop="checkTime" style="width: 20%">
                </el-table-column>
                <el-table-column
                    prop="staffDep"
                    label="所属部门"
                    width="200"
                    :filters="[{ text: '计算机学院', value: '计算机学院' }, { text: '软件工程学院', value: '软件工程学院' }, { text: '大气科学学院', value: '大气科学学院' }]"
                    :filter-method="filterDep">
                </el-table-column>
                <el-table-column
                    label="员工编号"
                    prop="staffNum" style="width: 20%">
                </el-table-column>
                <el-table-column
                    label="员工姓名"
                    prop="staffName" style="width: 10%">
                </el-table-column>
                <el-table-column
                    label="缺勤天数"
                    prop="absentDays" style="width: 10%">
                </el-table-column>
                <el-table-column
                    label="缺勤扣款"
                    prop="totalMoney" style="width: 10%">
                </el-table-column>
                <el-table-column label="操作" style="width: 10%">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看明细</el-button>
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
            <el-table :data="tableData[0].absences" border style="width: 100%; margin-top: 20px;" v-if="!twoHide">
                <el-table-column prop="checkDetailTime" label="缺勤日期" sortable style="width: 30%">
                </el-table-column>
                <el-table-column prop="absentReason" label="缺勤原因" style="width: 30%">
                </el-table-column>
                <el-table-column prop="absentMoney" label="缺勤扣款" style="width: 25%">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" type="primary"
                                   @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="small" type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
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
                    absentDays: 3,
                    totalMoney: '250￥',
                    absences: [{
                        checkDetailTime: '2017.03.05',
                        absentReason: '事假',
                        absentMoney: '50￥'
                    }, {
                        checkDetailTime: '2017.03.18',
                        absentReason: '病假',
                        absentMoney: '50￥'
                    }, {
                        checkDetailTime: '2017.03.25',
                        absentReason: '旷工',
                        absentMoney: '150￥'
                    }]
                }, {
                    checkTime: '2017.03',
                    staffDep: '计算机学院',
                    staffNum: '2013002',
                    staffName: '刘敏',
                    absentDays: 3,
                    totalMoney: '250￥',
                    absences: [{
                        checkDetailTime: '2017.03.05',
                        absentReason: '事假',
                        absentMoney: '50￥'
                    }, {
                        checkDetailTime: '2017.03.18',
                        absentReason: '病假',
                        absentMoney: '50￥'
                    }, {
                        checkDetailTime: '2017.03.25',
                        absentReason: '旷工',
                        absentMoney: '150￥'
                    }]
                }, {
                    checkTime: '2017.03',
                    staffDep: '软件工程学院',
                    staffNum: '2013004',
                    staffName: '振宇',
                    absentDays: 3,
                    totalMoney: '250￥',
                    absences: [{
                        checkDetailTime: '2017.03.05',
                        absentReason: '事假',
                        absentMoney: '50￥'
                    }, {
                        checkDetailTime: '2017.03.18',
                        absentReason: '病假',
                        absentMoney: '50￥'
                    }, {
                        checkDetailTime: '2017.03.25',
                        absentReason: '旷工',
                        absentMoney: '150￥'
                    }]
                }, {
                    checkTime: '2017.03',
                    staffDep: '大气科学学院',
                    staffNum: '2013005',
                    staffName: '李华',
                    absentDays: 3,
                    totalMoney: '250￥',
                    absences: [{
                        checkDetailTime: '2017.03.05',
                        absentReason: '事假',
                        absentMoney: '50￥'
                    }, {
                        checkDetailTime: '2017.03.18',
                        absentReason: '病假',
                        absentMoney: '50￥'
                    }, {
                        checkDetailTime: '2017.03.25',
                        absentReason: '旷工',
                        absentMoney: '150￥'
                    }]
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
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
                this.twoHide = false;

            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            oneHandleEdit(index, row) {
                this.$message('管理第'+(index+1)+'行');
                this.oneHide = false;

            },
            oneHandleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            filterDep(value, row) {
                return row.staffDep === value;
            }
        }
    }
</script>
