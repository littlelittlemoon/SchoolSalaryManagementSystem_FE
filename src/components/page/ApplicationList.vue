<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>考勤管理</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>查看当月考勤记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table
            :data="applyListData"
            border
            style="width: 100%">
            <el-table-column
                prop="absentApplyTime"
                label="申请日期"
                sortable>
            </el-table-column>
            <el-table-column
                prop="absentReason"
                label="请假原因">
            </el-table-column>
            <el-table-column
                prop="absentStartTime"
                label="开始时间"
                sortable>
            </el-table-column>
            <el-table-column
                prop="absentEndTime"
                label="结束时间"
                sortable>
            </el-table-column>
            <el-table-column
                prop="absentDays"
                label="请假天数"
                sortable>
            </el-table-column>
            <el-table-column
                prop="absentState"
                label="审核状态"
                :filters="[{ text: '部门通过', value: '部门通过' },
                { text: '待部门审核', value: '待部门审核' },
                { text: '待人事处审核', value: '待人事处审核' },
                { text: '部门打回', value: '部门打回' },
                { text: '已统计', value: '已统计' },
                { text: '已撤回', value: '已撤回' }]"
                :filter-method="filterStatus">
                <template scope="scope">
                    <el-tag
                        :type="tabColor(scope.row.absentState)"
                        close-transition>{{scope.row.absentState}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="absentCheckTime"
                label="审核时间"
                sortable>
            </el-table-column>
            <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button size="mini" type="info" :disabled="canTurnBack(scope.row.absentState)"
                               @click="turnBack(scope.row.absentStartTime)">撤销申请
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
    </div>
</template>

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
                applyListData: ''
            }
        },
        created: function () {
            this.getData(this.currentPage);
        },
        methods: {
            tabColor(status){
                if (status == '待部门审核') {
                    return 'warning';
                } else if (status == '部门通过') {
                    return 'success';
                } else if (status == '待人事处审核') {
                    return 'primary';
                } else if (status == '已统计') {
                    return '';
                } else if (status == '已撤回') {
                    return 'gray';
                } else {
                    return 'danger';
                }
            },
            getData(currentPage){
                const self = this;
                axios.get('http://localhost:8080/absentInfo/absentInfoList', {
                    params: {
                        currentPage: currentPage,
                        pageSize: self.pageSize,
                        staffId: getCookie("staffId")
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.applyListData = response.data.data.absentInfos;
                        this.totalPage = response.data.data.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            canTurnBack(absentState){
                if (absentState == '待部门审核') {
                    return false;
                } else {
                    return true;
                }
            },
            turnBack(startTime){
                this.$confirm('撤回请假申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('http://localhost:8080/absentInfo/turnBack', qs.stringify({
                        staffId: getCookie("staffId"),
                        absentStartTime: startTime
                    })).then(response => {
                        console.log(response);
                        if (response.data.code == 1) {
                            this.$notify.error({
                                title: '操作失败',
                                message: '啊偶，服务器出错啦~'
                            });
                        } else {
                            this.$message({
                                message: '撤回成功！',
                                type: 'success'
                            });
                            this.getData(this.currentPage);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消撤回！'
                    });
                });

            },
            filterStatus(value, row) {
                return row.absentState === value;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
                this.getData(val)
            }
        }
    }
</script>
