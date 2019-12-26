<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>考勤管理</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>查看历史考勤记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-date-picker
            v-model="selMonth"
            type="month"
            placeholder="选择考勤月份" style="margin-bottom: 10px;width: 30%" @change="dateChange">
        </el-date-picker>
        <el-table :data="historyCheckList" style="width: 100%">
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
                            <el-form-item label="缺勤类型">
                                <span>{{absence.absentReason}}</span>
                            </el-form-item>
                            <el-form-item label="缺勤扣款">
                                <span>{{absence.money}}</span>
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
                label="应到天数"
                prop="shouldDays">
            </el-table-column>
            <el-table-column
                label="实到天数"
                prop="realDays">
            </el-table-column>
            <el-table-column
                label="扣款总计"
                prop="absentTotalMoney">
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
                currentPage: 1,
                pageSize: 6,
                totalPage: 0,
                selMonth: '',
                historyCheckList: []
            }
        },
        created: function () {
            this.getcheckedData(this.currentPage, this.pageSize, this.selMonth);
        },
        methods: {
            dateChange(){
                this.getcheckedData(this.currentPage, this.pageSize, this.selMonth);
            },
            getcheckedData(currentPage, pageSize, selMonth){
                let time = '';
                if (selMonth != '') {
                    time = formatDateTime(selMonth);
                }
                axios.get('http://localhost:8080/absentInfo/staffAbsentInfo', {
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        time: time,
                        state: 'done',
                        id: getCookie("staffId")
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.historyCheckList = response.data.data.staffAbsentInfoDetails;
                        this.totalPage = response.data.data.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getcheckedData(this.currentPage, this.pageSize, this.selMonth);
            }
        }
    }
</script>
