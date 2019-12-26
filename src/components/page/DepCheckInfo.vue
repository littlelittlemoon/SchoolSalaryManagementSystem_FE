<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>考勤管理</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>考勤审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="考勤审核" name="first">
                <el-table :data="checkListData" border style="width: 100%">
                    <el-table-column
                        label="员工编号"
                        prop="staffId" style="width: 15%">
                    </el-table-column>
                    <el-table-column
                        label="员工姓名"
                        prop="staffName">
                    </el-table-column>
                    <el-table-column prop="absentApplyTime" label="申请时间" sortable width="115">
                    </el-table-column>
                    <el-table-column prop="absentReason" label="请假原因">
                    </el-table-column>
                    <el-table-column prop="absentStartTime" label="开始时间" sortable width="115">
                    </el-table-column>
                    <el-table-column prop="absentEndTime" label="结束时间" sortable width="115">
                    </el-table-column>
                    <el-table-column prop="absentDays" label="缺勤天数">
                    </el-table-column>
                    <el-table-column
                        label="备注"
                        prop="absentDetail" width="130">
                    </el-table-column>
                    <el-table-column label="操作" width="150px">
                        <template scope="scope">
                            <el-button size="small" type="primary"
                                       @click="handlePass(scope.row)">通过
                            </el-button>
                            <el-button size="small" type="danger"
                                       @click="handleReject(scope.row)">打回
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="6"
                        layout="total, prev, pager, next"
                        :total="totalPage">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="当月考勤记录" name="second">
                <el-input
                    placeholder="员工姓名、编号..."
                    icon="search"
                    v-model="searchCondition"
                    :on-icon-click="handleSearchClick" style="margin-bottom: 10px;width: 30%">
                </el-input>
                <el-button style="position: absolute; right: 0px" type="primary" @click="sendToHr()">发送至人事处<i
                    class="el-icon-upload2 el-icon--right"></i></el-button>
                <el-table :data="currentMonthCheckList" style="width: 100%">
                    <el-table-column type="expand">
                        <template scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <div v-for="absence in props.row.absences" class="item">
                                    <el-form-item label="开始时间">
                                        <span>{{absence.absentStartTime}}</span>
                                    </el-form-item>
                                    <el-form-item label="结束时间">
                                        <span>{{absence.absentEndTime}}</span>
                                    </el-form-item>
                                    <el-form-item label="缺勤天数">
                                        <span>{{absence.absentDays}}</span>
                                    </el-form-item>
                                    <el-form-item label="缺勤原因">
                                        <span>{{absence.absentReason}}</span>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="考勤年月"
                        prop="absentCheckTime">
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
                        label="缺勤天数"
                        prop="absentDays">
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="6"
                        layout="total, prev, pager, next"
                        :total="totalPage">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
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
</style>

<script>
    import axios from 'axios';
    import qs from 'qs';
    import {getCookie, formatDateTime} from '../../assets/common/VueUtils.js'

    export default {
        data() {
            return {
                activeName: 'first',
                currentPage: 1,
                pageSize: 6,
                totalPage: 0,
                checkListData: [],
                searchCondition: '',
                currentMonthCheckList: []
            }
        },
        created: function () {
            this.getData(this.currentPage, this.pageSize);
        },
        methods: {
            getData(currentPage, pageSize){
                axios.get('http://localhost:8080/absentInfo/absentInfoCheckList', {
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        staffId: getCookie("staffId")
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        var checkList = response.data.data.absentInfoChecks;
                        this.totalPage = response.data.data.total;
                        this.currentPage = response.data.data.currentPage;
                        if (checkList != null) {
                            this.checkListData = checkList;
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getcheckedData(searchCondition, currentPage, pageSize){
                let time = new Date();
                time = formatDateTime(time);
                axios.get('http://localhost:8080/absentInfo/staffAbsentInfo', {
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        time: time,
                        state: 'd_pass',
                        searchCondition: searchCondition,
                        staffId: getCookie("staffId")
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        var checkedList = response.data.data.staffAbsentInfoDetails;
                        this.totalPage = response.data.data.total;
                        this.currentPage = response.data.data.currentPage;
                        if (checkedList != null) {
                            this.currentMonthCheckList = checkedList;
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
                this.getData(val)
            },
            handleClick(tab, event) {
                if (this.activeName == 'first') {
                    this.getData(this.currentPage, this.pageSize);
                } else {
                    this.getcheckedData(this.searchCondition, this.currentPage, this.pageSize);
                }
            },
            sendToHr(){
                axios.post('http://localhost:8080/absentInfo/sendToHr', qs.stringify({
                    staffId: getCookie("staffId")
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.$notify.success({
                            title: '发送成功',
                            message: response.data.message
                        });
                        this.getcheckedData(this.searchCondition, this.currentPage, this.pageSize);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handlePass(row) {
                axios.post('http://localhost:8080/absentInfo/checkAbsentInfo', qs.stringify({
                    staffId: row.staffId,
                    beginTime: row.absentStartTime,
                    status: 'd_pass'
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.$message('操作成功，通过' + row.staffName + '的请假申请');
                        this.getData(this.currentPage, this.pageSize);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleReject(row) {
                axios.post('http://localhost:8080/absentInfo/checkAbsentInfo', qs.stringify({
                    staffId: row.staffId,
                    beginTime: row.absentStartTime,
                    status: 'd_reject'
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {

                        this.$message('操作成功，打回' + row.staffName + '的请假申请');
                        this.getData(this.currentPage, this.pageSize);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleSearchClick(ev) {
                this.getcheckedData(this.searchCondition, this.currentPage, this.pageSize);
            },
        }
    }
</script>
