<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>工资管理</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>查看历史工资</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-date-picker
            v-model="selMonth"
            type="month"
            placeholder="选择工资月份" style="margin-bottom: 10px;width: 30%" @change="dateChange">
        </el-date-picker>
        <el-table :data="salaryData" border style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <!--<el-form-item label="员工职务">-->
                        <!--<span>{{ props.row.dutyName }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="员工职称">-->
                        <!--<span>{{ props.row.titleName }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="入职年限">-->
                        <!--<span>{{ props.row.workYears }}</span>-->
                        <!--</el-form-item>-->
                        <el-form-item label="职称工资">
                            <span>{{ props.row.titleSalary }}</span>
                        </el-form-item>
                        <el-form-item label="职务工资">
                            <span>{{ props.row.dutySalary }}</span>
                        </el-form-item>
                        <el-form-item label="基本工资">
                            <span>{{ props.row.baseSalary }}</span>
                        </el-form-item>
                        <el-form-item label="缺勤扣款">
                            <span>{{ props.row.absentMoney }}</span>
                        </el-form-item>
                        <el-form-item label="五险一金">
                            <span>{{ props.row.insuranceTotal }}</span>
                        </el-form-item>
                        <el-form-item label="交税金额">
                            <span>{{ props.row.taxMoney }}</span>
                        </el-form-item>
                        <!--<el-form-item label="工龄津贴">-->
                        <!--<span>{{ props.row.seniorAllowance }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="全勤奖">-->
                        <!--<span>{{ props.row.fullAllowance }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="福利补贴">-->
                        <!--<span>{{ props.row.welfAllowance }}</span>-->
                        <!--</el-form-item>-->
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                label="发放年月"
                prop="checkTime">
            </el-table-column>
            <!--<el-table-column-->
            <!--label="员工编号"-->
            <!--prop="staffId">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--label="员工姓名"-->
            <!--prop="staffName">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--label="员工性别"-->
            <!--prop="staffSex" style="padding-left: 0; padding-right: 0;">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="departmentName"-->
            <!--label="所属部门">-->
            <!--</el-table-column>-->
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
                salaryData: [],
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
            };
        },
        created: function () {
            this.getHistorySalary(this.currentPage, this.pageSize, this.selMonth);
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleDelete(index, row) {
                this.$message.error('删除第' + (index + 1) + '行');
            },
            filterDuty(value, row) {
                return row.staffDuty === value;
            },
            getHistorySalary(currentPage, pageSize, selMonth){
                let time = '';
                if (selMonth != '') {
                    time = formatDateTime(selMonth).substring(0, 7);
                }
                axios.get('http://lalala.tunnel.2bdata.com/salary/historySalaryList', {
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        time: time,
                        searchCondition: getCookie("staffId")
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '查找失败',
                            message: response.data.message
                        });
                    } else {
                        this.salaryData = response.data.data.salaryDetails;
                        this.totalPage = response.data.data.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            dateChange(){
                this.getHistorySalary(this.currentPage, this.pageSize, this.selMonth);
            },
            /**
             * 分页-改变页码
             * */
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getHistorySalary(this.currentPage, this.pageSize, this.selMonth);
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
