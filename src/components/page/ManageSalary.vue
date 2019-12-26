<template>
    <div>
        <el-button style="position: absolute; right: 40px" type="primary" @click="preSendToBank"
                   :disabled="canSendToBank">{{send}}<i
            class="el-icon-upload2 el-icon--right"></i></el-button>
        <el-button style="position: absolute; right:245px;" :plain="true" type="success" @click="isSendToDep"
                   :disabled="canSendToDep">
            发送工资单到该部门<i class="el-icon-upload2 el-icon--right"></i></el-button>
        <el-select v-model="depId" filterable placeholder="请选择部门" @visible-change="depIdChange"
                   style="margin-bottom: 10px;width: 25%">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-table :data="salaryList" border
                  :summary-method="getSummaries"
                  show-summary style="width: 100%" v-if="isShow">
            <el-table-column
                label="审核年月"
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
            <el-table-column
                label="所属部门"
                prop="departmentName">
            </el-table-column>
            <el-table-column
                label="基本工资"
                prop="baseSalary">
            </el-table-column>
            <el-table-column
                label="职称工资"
                prop="titleSalary">
            </el-table-column>
            <el-table-column
                label="职务工资"
                prop="dutySalary">
            </el-table-column>
            <el-table-column
                label="五险一金"
                prop="insuranceTotal" style="padding-left: 0; padding-right: 0;">
            </el-table-column>
            <el-table-column
                label="扣税金额"
                prop="taxMoney">
            </el-table-column>
            <el-table-column
                label="缺勤扣款"
                prop="absentMoney">
            </el-table-column>
        </el-table>
        <el-table :data="salaryList" border
                  :summary-method="getSummaries"
                  show-summary style="width: 100%" v-if="!isShow">
            <el-table-column
                label="工资发放年月"
                prop="checkTime">
            </el-table-column>
            <el-table-column
                label="员工姓名"
                prop="staffName">
            </el-table-column>
            <el-table-column
                label="身份证号"
                prop="identityNum">
            </el-table-column>
            <el-table-column
                label="银行卡号"
                prop="bankAcount">
            </el-table-column>
            <el-table-column
                label="电话号码"
                prop="staffTel">
            </el-table-column>
            <el-table-column
                label="工资总计"
                prop="realPay">
            </el-table-column>
        </el-table>
    </div>

</template>
<script>
    import axios from 'axios';
    import qs from 'qs';
    import {getCookie, formatDateTime} from '../../assets/common/VueUtils.js'
    export default {
        data() {
            return {
                isShow: true,
                send: '发送工资单到银行',
                isSend: false,
                depId: 'Dep_compuDep',
                salaryList: [],
                toBankSalaryList: [],
                canSendToBank: true,
                canSendToDep: true,
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
        created: function(){
            this.getSalaryData(this.depId);
        },
        methods: {
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += ' 元';
                    } else {
                        sums[index] = 'N/A';
                    }
                });
                return sums;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            depIdChange(){
                this.getSalaryData(this.depId);
            },
            getSalaryData(departmentId)
            {
                axios.get('http://localhost:8080/salary/checkSalaryList', {
                    params: {
                        departmentId: departmentId
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '查找失败',
                            message: response.data.message
                        });
                    } else {
                        this.salaryList = response.data.data;
                        if (this.salaryList[0].status == 'ntb') {
                            this.canSendToBank = false;
                            this.canSendToDep = true;

                        } else {
                            this.canSendToBank = true;
                            this.canSendToDep = false;
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            preSendToBank(){
                this.isShow = false;
                if (this.isSend == false) {
                    this.send = "确认发送至银行";
                    this.isSend = true;
                } else {
                    this.isSendToBank();
                }
            },
            isSendToBank()
            {
                this.$confirm('将工资发放细则发送至银行, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('http://localhost:8080/salary/sendToBank', qs.stringify({
                        departmentId: this.depId
                    })).then(response => {
                        console.log(response);
                        if (response.data.code == 1) {
                            this.$notify.error({
                                title: '发送失败',
                                message: response.data.message
                            });
                        } else {
                            this.$message({
                                type: 'success',
                                message: '发送成功!'
                            });
                            this.send = "发送工资单到银行";
                            this.isSend = false;
                            this.isShow = true;
                            this.getSalaryData(this.depId);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消发送'
                    });
                    this.send = "发送工资单到银行";
                    this.isSend = false;
                    this.isShow = true;
                    this.getSalaryData(this.depId);
                });
            },
            isSendToDep(){
                this.$confirm('将工资单发送至各部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('http://localhost:8080/salary/sendToDepartment', qs.stringify({
                        departmentId: this.depId
                    })).then(response => {
                        console.log(response);
                        if (response.data.code == 1) {
                            this.$notify.error({
                                title: '发送失败',
                                message: response.data.message
                            });
                        } else {
                            this.$message({
                                type: 'success',
                                message: '发送成功!'
                            });
                            this.canSendToBank = true;
                            this.canSendToDep = true;
                            this.getSalaryData(this.depId);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消发送'
                    });
                    this.send = "发送工资单到银行";
                    this.isSend = false;
                    this.isShow = true;
                    this.getSalaryData(this.depId);
                });
            }
        }
    }
</script>


<style>

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
