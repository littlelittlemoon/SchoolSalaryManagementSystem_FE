<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>工资管理</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>历史工资记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="2">
            <el-col :span="9">
                <el-date-picker
                    v-model="selMonth"
                    type="month"
                    placeholder="选择工资月份" style="margin-bottom: 10px;width: 50%" @change="dateChange">
                </el-date-picker>
            </el-col>
            <el-col :span="6">
                <el-select v-model="depId" filterable placeholder="请选择部门" @visible-change="depIdChange">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="9">
                <el-input
                    placeholder="员工姓名、编号..."
                    icon="search"
                    v-model="condition"
                    :on-icon-click="searchConditionhand" style="margin-left: 50%; margin-bottom: 10px;width: 50%">
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="salaryData" border style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="员工职务">
                            <span>{{ props.row.dutyName }}</span>
                        </el-form-item>
                        <el-form-item label="员工职称">
                            <span>{{ props.row.titleName }}</span>
                        </el-form-item>
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
                label="审核时间"
                prop="checkTime">
            </el-table-column>
            <el-table-column
                label="员工编号"
                prop="staffId">
            </el-table-column>
            <el-table-column
                label="员工姓名"
                prop="staffName">
            </el-table-column>
            <!--<el-table-column-->
            <!--label="员工性别"-->
            <!--prop="staffSex" style="padding-left: 0; padding-right: 0;">-->
            <!--</el-table-column>-->
            <el-table-column
                prop="departmentName"
                label="所属部门">
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
    import {getCookie, formatDateTime} from '../../assets/common/VueUtils.js';
    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 6,
                totalPage: 0,
                depId: '',
                selMonth: '',
                condition: '',
                salaryData: [],
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
                }],
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
            this.getHistorySalary(this.condition, this.currentPage, this.pageSize, this.depId, this.selMonth);
        },
        methods: {
            depIdChange(){
                this.getHistorySalary(this.condition, this.currentPage, this.pageSize, this.depId, this.selMonth);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleDelete(index, row) {
                this.$message.error('删除第' + (index + 1) + '行');
            },
            filterDuty(value, row) {
                return row.staffDuty === value;
            },
            getHistorySalary(condition, currentPage, pageSize, departmentId, selMonth){
                let time = '';
                if (selMonth != '') {
                    time = formatDateTime(selMonth).substring(0, 7);
                }
                axios.get('http://localhost:8080/salary/historySalaryList', {
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        departmentId: departmentId,
                        searchCondition: condition,
                        time: time
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
            searchConditionhand(){
                this.getHistorySalary(this.condition, this.currentPage, this.pageSize, this.depId, this.selMonth);
            },
            dateChange(){
                this.getHistorySalary(this.condition, this.currentPage, this.pageSize, this.depId, this.selMonth);
            },
            /**
             * 分页-改变页码
             * */
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getHistorySalary(this.condition, currentPage, this.pageSize, this.depId, this.selMonth);
            },
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
