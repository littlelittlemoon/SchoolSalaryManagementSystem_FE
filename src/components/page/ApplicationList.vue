<template>
    <div>
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
                { text: '已统计', value: '已统计' }]"
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
            this.getData(1)
        },
        methods: {
            tabColor(status){
                if(status == '待部门审核'){
                    return 'warning';
                }else if(status == '部门通过'){
                    return 'success';
                }else if(status == '待人事处审核'){
                    return 'primary';
                }else if(status == '已统计'){
                    return 'blue';
                }else{
                    return 'danger';
                }
            },
            getData(currentPage){
                const self = this;
                axios.get('http://139.224.129.108:8089/absentInfo/absentInfoList', {
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
                        var applyList = response.data.data.absentInfos;
                        this.totalPage = response.data.data.total;
                        this.currentPage = response.data.data.currentPage;
                        if (applyList != null) {
                            this.applyListData = applyList;
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
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
