<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>工资管理</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>{{newTitle}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待处理" name="first" style="position: relative;">
                <el-input
                    placeholder="员工姓名、编号..."
                    icon="search"
                    v-model="pane1.searchCondition"
                    :on-icon-click="searchCondition1hand" style="margin-bottom: 10px;width: 30%">
                </el-input>
                <el-select v-model="depId" filterable placeholder="请选择部门" @visible-change="depIdChange1">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button style="position: absolute; right: 0px" type="primary" @click="countAbsentMoney">计算缺勤金<i
                    class="el-icon-edit el-icon--right"></i></el-button>
                <el-table :data="absentInfo" style="width: 100%" @selection-change="handleSelectionChange">
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
                                    <el-form-item label="缺勤原因">
                                        <span>{{absence.absentReason}}</span>
                                    </el-form-item>
                                    <el-form-item label="缺勤天数">
                                        <span>{{absence.absentDays}}</span>
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
                        label="员工编号"
                        prop="staffId" style="width: 20%">
                    </el-table-column>
                    <el-table-column
                        label="员工姓名"
                        prop="staffName" style="width: 10%">
                    </el-table-column>
                    <el-table-column
                        label="考勤年月"
                        prop="absentCheckTime" style="width: 20%">
                    </el-table-column>
                    <el-table-column
                        prop="department"
                        label="所属部门">
                    </el-table-column>
                    <el-table-column
                        label="缺勤天数"
                        prop="absentDays" style="width: 10%">
                    </el-table-column>
                    <el-table-column label="操作" style="width: 10%">
                        <template scope="scope">
                            <el-button size="small" @click="handleEdit1(scope.$index, scope.row)">管理
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange1"
                        :current-page="pane1.currentPage"
                        :page-size="pane1.pageSize"
                        layout="total, prev, pager, next"
                        :total="pane1.totalPage">
                    </el-pagination>
                </div>
            </el-tab-pane>

            <el-tab-pane label="缺勤金计算结果" name="second">
                <el-input
                    placeholder="员工姓名、编号..."
                    icon="search"
                    v-model="pane2.searchCondition"
                    :on-icon-click="searchCondition2hand" style="margin-bottom: 10px;width: 30%">
                </el-input>
                <el-select v-model="depId" filterable placeholder="请选择部门" @visible-change="depIdChange2">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button style="position: absolute; right: 0px" type="primary" @click="countInsuranceMoney">计算五险一金<i
                    class="el-icon-edit el-icon--right"></i></el-button>
                <el-table :data="absentMoneyInfo" border style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="expand">
                        <template scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <div v-for="absence in props.row.absentMoneyList" class="item">
                                    <el-form-item label="开始时间">
                                        <span>{{absence.absentStartTime}}</span>
                                    </el-form-item>
                                    <el-form-item label="结束时间">
                                        <span>{{absence.absentEndTime}}</span>
                                    </el-form-item>
                                    <el-form-item label="缺勤原因">
                                        <span>{{absence.absentReason}}</span>
                                    </el-form-item>
                                    <el-form-item label="缺勤天数">
                                        <span>{{absence.absentDays}}</span>
                                    </el-form-item>
                                    <el-form-item label="缺勤扣款">
                                        <span>{{absence.absentMoney}}</span>
                                    </el-form-item>
                                    <el-form-item label="扣款管理">
                                        <el-button size="small"
                                                   @click="handleEdit2(absence.staffId, absence.absentStartTime, absence.absentMoney)">
                                            调整
                                        </el-button>
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
                        label="员工编号"
                        prop="staffId" style="width: 20%">
                    </el-table-column>
                    <el-table-column
                        label="员工姓名"
                        prop="staffName" style="width: 10%">
                    </el-table-column>
                    <el-table-column
                        label="考勤年月"
                        prop="checkTime" style="width: 20%">
                    </el-table-column>
                    <el-table-column
                        label="所属部门"
                        prop="departmentName" style="width: 20%">
                    </el-table-column>
                    <el-table-column
                        label="缺勤天数"
                        prop="absentDays" style="width: 10%">
                    </el-table-column>
                    <el-table-column
                        label="缺勤扣款"
                        prop="money" style="width: 10%">
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange2"
                        :current-page="pane2.currentPage"
                        :page-size="pane2.pageSize"
                        layout="total, prev, pager, next"
                        :total="pane2.totalPage">
                    </el-pagination>
                </div>
                <el-dialog title="调整缺勤扣款金额" v-model="pane2.dialogFormVisible">
                    <el-form :model="changeData1">
                        <el-form-item label="缺勤扣款" :label-width="formLabelWidth">
                            <el-input v-model="changeData1.absentMoney" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="pane2.dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateAbsentMoney()">确 定</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="五险一金计算结果" name="third">
                <el-input
                    placeholder="员工姓名、编号..."
                    icon="search"
                    v-model="pane3.searchCondition"
                    :on-icon-click="searchCondition3hand" style="margin-bottom: 10px;width: 30%">
                </el-input>
                <el-select v-model="depId" filterable placeholder="请选择部门" @visible-change="depIdChange3">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button style="position: absolute; right: 0px" type="primary" @click="countTaxMoney">计算交税金额<i
                    class="el-icon-edit el-icon--right"></i></el-button>
                <el-table :data="insuranceMoneyInfo" border style="width: 100%"
                          @selection-change="handleSelectionChange">
                    <el-table-column type="expand">
                        <template scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="医疗保险">
                                    <span>{{props.row.insuranceMedical}}</span>
                                </el-form-item>
                                <el-form-item label="养老保险">
                                    <span>{{props.row.insuranceAged}}</span>
                                </el-form-item>
                                <el-form-item label="失业保险">
                                    <span>{{props.row.insuranceUnemp}}</span>
                                </el-form-item>
                                <el-form-item label="公积金">
                                    <span>{{props.row.insuranceAccu}}</span>
                                </el-form-item>
                                <el-form-item label="扣款管理">
                                    <el-button size="small"
                                               @click="handleEdit3(props.row.staffId, props.row.checkTime, props.row.insuranceMedical, props.row.insuranceAged,props.row.insuranceUnemp,props.row.insuranceAccu)">
                                        调整
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        type="selection"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        label="员工编号"
                        prop="staffId" style="width: 20%">
                    </el-table-column>
                    <el-table-column
                        label="员工姓名"
                        prop="staffName" style="width: 10%">
                    </el-table-column>
                    <el-table-column
                        label="考勤年月"
                        prop="checkTime" style="width: 20%">
                    </el-table-column>
                    <el-table-column
                        label="所属部门"
                        prop="departmentName" style="width: 20%">
                    </el-table-column>
                    <el-table-column
                        label="缴纳基数"
                        prop="insuranceBase" style="width: 10%">
                    </el-table-column>
                    <el-table-column
                        label="总计扣除"
                        prop="insuranceTotal" style="width: 10%">
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange3"
                        :current-page="pane3.currentPage"
                        :page-size="pane3.pageSize"
                        layout="total, prev, pager, next"
                        :total="pane3.totalPage">
                    </el-pagination>
                </div>
                <el-dialog title="调整五险一金扣款金额" v-model="pane3.dialogFormVisible">
                    <el-form :model="changeData2">
                        <el-form-item label="医疗保险" :label-width="formLabelWidth">
                            <el-input v-model="changeData2.insuranceMedica" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="养老保险" :label-width="formLabelWidth">
                            <el-input v-model="changeData2.insuranceAged" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="失业保险" :label-width="formLabelWidth">
                            <el-input v-model="changeData2.insuranceUnemp" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="公积金" :label-width="formLabelWidth">
                            <el-input v-model="changeData2.insuranceAccu" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="pane3.dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateInsuranceMoney()">确 定</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="交税金额计算结果" name="forth">
                <el-input
                    placeholder="员工姓名、编号..."
                    icon="search"
                    v-model="pane4.searchCondition"
                    :on-icon-click="searchCondition4hand" style="margin-bottom: 10px;width: 30%">
                </el-input>
                <el-select v-model="depId" filterable placeholder="请选择部门" @visible-change="depIdChange4">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button style="position: absolute; right: 0px" type="primary" @click="sendToFs">发送到财务部门<i
                    class="el-icon-upload2 el-icon--right"></i></el-button>
                <el-table :data="taxMoneyInfo" border style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="expand">
                        <template scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="适用税率">
                                    <span>{{props.row.taxRate}}</span>
                                </el-form-item>
                                <el-form-item label="速算扣除数">
                                    <span>{{props.row.taxCalcu}}</span>
                                </el-form-item>
                                <el-form-item label="扣款管理">
                                    <el-button size="small"
                                               @click="handleEdit4(props.row.staffId, props.row.checkTime, props.row.taxMoney)">
                                        调整
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        type="selection"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        label="员工编号"
                        prop="staffId" style="width: 20%">
                    </el-table-column>
                    <el-table-column
                        label="员工姓名"
                        prop="staffName" style="width: 10%">
                    </el-table-column>
                    <el-table-column
                        label="审核年月"
                        prop="checkTime" style="width: 20%">
                    </el-table-column>
                    <el-table-column
                        label="所属部门"
                        prop="departmentName" style="width: 20%">
                    </el-table-column>
                    <el-table-column
                        label="交税基数"
                        prop="baseMoney" style="width: 10%">
                    </el-table-column>
                    <el-table-column
                        label="交税扣款"
                        prop="taxMoney" style="width: 10%">
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange4"
                        :current-page="pane4.currentPage"
                        :page-size="pane4.pageSize"
                        layout="total, prev, pager, next"
                        :total="pane4.totalPage">
                    </el-pagination>
                </div>
                <el-dialog title="调整扣税金额" v-model="pane4.dialogFormVisible">
                    <el-form :model="changeData3">
                        <el-form-item label="扣税金额" :label-width="formLabelWidth">
                            <el-input v-model="changeData3.taxMoney" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="pane4.dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateTaxMoney()">确 定</el-button>
                    </div>
                </el-dialog>
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
                newTitle: '审核考勤信息',
                pane1: {
                    currentPage: 1,
                    pageSize: 6,
                    totalPage: 0,
                    searchCondition: '',
                    staffIds: [],
                },
                pane2: {
                    currentPage: 1,
                    pageSize: 6,
                    totalPage: 0,
                    dialogFormVisible: false,
                    searchCondition: '',
                    staffIds: [],
                },
                pane3: {
                    currentPage: 1,
                    pageSize: 6,
                    totalPage: 0,
                    dialogFormVisible: false,
                    searchCondition: '',
                    staffIds: [],
                },
                pane4: {
                    currentPage: 1,
                    pageSize: 6,
                    totalPage: 0,
                    dialogFormVisible: false,
                    searchCondition: '',
                    staffIds: [],
                },
                depId: '',
                multipleSelection: '',
                absentInfo: [],
                absentMoneyInfo: [],
                insuranceMoneyInfo: [],
                taxMoneyInfo: [],
                changeData1: {
                    staffId: '',
                    absentStartTime: '',
                    absentMoney: ''
                },
                changeData2: {
                    staffId: '',
                    checkTime: '',
                    insuranceMedica: '',
                    insuranceAged: '',
                    insuranceUnemp: '',
                    insuranceAccu: ''
                },
                changeData3: {
                    staffId: '',
                    checkTime: '',
                    taxMoney: ''
                },
                formLabelWidth: '120px',
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
            }
        },
        created: function () {
            this.getAbsentData(this.pane1.searchCondition, this.pane1.currentPage, this.pane1.pageSize, this.depId);
        },
        methods: {
            /**
             * 所属部门
             * */
            depIdChange1(){
                this.getAbsentData(this.pane1.searchCondition, this.pane1.currentPage, this.pane1.pageSize, this.depId);
            },
            depIdChange2(){
                this.getAbsentMoneyResult(this.pane2.searchCondition, this.pane2.currentPage, this.pane2.pageSize, this.depId);
            },
            depIdChange3(){
                this.getInsuranceResult(this.pane3.searchCondition, this.pane3.currentPage, this.pane3.pageSize, this.depId);
            },
            depIdChange4(){
                this.getTaxResult(this.pane4.searchCondition, this.pane4.currentPage, this.pane4.pageSize, this.depId);
            },
            /**
             * 获取某部门的考勤信息
             * */
            getAbsentData(searchCondition, currentPage, pageSize, departmentId){
                axios.get('http://localhost:8080/absentInfo/hrCheckAbsentInfo', {
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        departmentId: departmentId,
                        searchCondition: searchCondition
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '查找失败',
                            message: response.data.message
                        });
                    } else {
                        this.absentInfo = response.data.data.staffAbsentInfoDetails;
                        this.pane1.totalPage = response.data.data.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
//            canCountAbsentMoney(status, column){
//                console.log("++++++++++++++++++++++++++" + status);
//                if(status == 'dtp'){
//                    return true;
//                }else{
//                    return false;
//                }
//            },
            handleEdit1(index, row) {
                this.$message('管理第' + (index + 1) + '行');
                this.oneHide = false;

            },
            handleClick(tab, event) {
                //切换tabs时触发
                if (this.activeName == 'first') {
                    this.newTitle = '审核考勤信息';
                    this.getAbsentData(this.pane1.searchCondition, this.pane1.currentPage, this.pane1.pageSize, this.depId);
                } else if (this.activeName == 'second') {
                    this.newTitle = '管理缺勤扣款';
                    this.getAbsentMoneyResult(this.pane2.searchCondition, this.pane2.currentPage, this.pane2.pageSize, this.depId);
                } else if (this.activeName == 'third') {
                    this.newTitle = '管理五险一金扣款';
                    this.getInsuranceResult(this.pane3.searchCondition, this.pane3.currentPage, this.pane3.pageSize, this.depId);
                } else {
                    this.newTitle = '管理交税扣款';
                    this.getTaxResult(this.pane4.searchCondition, this.pane4.currentPage, this.pane4.pageSize, this.depId);
                }
            },
            countAbsentMoney(){
                this.pane1.staffIds = [];
                for (let i in this.multipleSelection) {
                    this.pane1.staffIds.push(this.multipleSelection[i].staffId);
                }
                axios.post('http://localhost:8080/absentMoney/countAbsentMoney', qs.stringify({
                    staffIds: JSON.stringify(this.pane1.staffIds)
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '操作错误',
                            message: response.data.message
                        });
                    } else {
                        this.$message({
                            message: '计算缺勤扣款成功！',
                            type: 'success'
                        });
                        this.getAbsentData(this.pane1.searchCondition, this.pane1.currentPage, this.pane1.pageSize, this.depId);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getAbsentMoneyResult(searchCondition, currentPage, pageSize, departmentId){
                axios.get('http://localhost:8080/absentMoney/absentMoneyResult', {
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        departmentId: departmentId,
                        searchCondition: searchCondition
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '查找失败',
                            message: response.data.message
                        });
                    } else {
                        this.absentMoneyInfo = response.data.data.hrAbsentMoneyList;
                        this.pane2.totalPage = response.data.data.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            handleEdit2(staffId, absentStartTime, absentMoney) {
                this.changeData1.staffId = staffId;
                this.changeData1.absentStartTime = absentStartTime;
                this.changeData1.absentMoney = absentMoney;
                this.pane2.dialogFormVisible = true;

            },
            updateAbsentMoney(){
                this.pane2.dialogFormVisible = false;
                axios.post('http://localhost:8080/absentMoney/updateAbsentMoney', qs.stringify({
                    staffId: this.changeData1.staffId,
                    money: this.changeData1.absentMoney,
                    startTime: this.changeData1.absentStartTime,
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.$message({
                            message: '调整成功',
                            type: 'success'
                        });
                        this.getAbsentMoneyResult(this.pane2.searchCondition, this.pane2.currentPage, this.pane2.pageSize, this.depId);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            countInsuranceMoney(){
                this.pane2.staffIds = [];
                for (let i in this.multipleSelection) {
                    this.pane2.staffIds.push(this.multipleSelection[i].staffId);
                }
                axios.post('http://localhost:8080/insurance/countInsuranceMoney', qs.stringify({
                    staffIds: JSON.stringify(this.pane2.staffIds)
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '操作错误',
                            message: response.data.message
                        });
                    } else {
                        this.$message({
                            message: '计算五险一金成功！',
                            type: 'success'
                        });
                        this.getAbsentMoneyResult(this.pane2.searchCondition, this.pane2.currentPage, this.pane2.pageSize, this.depId);
                    }

                }).catch(function (error) {
                    console.log(error);
                });
            },
            getInsuranceResult(searchCondition, currentPage, pageSize, departmentId){
                axios.get('http://localhost:8080/insurance/insuranceMoneyResult', {
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        departmentId: departmentId,
                        searchCondition: searchCondition
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '查找失败',
                            message: response.data.message
                        });
                    } else {
                        this.insuranceMoneyInfo = response.data.data.insuranceInfoList;
                        this.pane3.totalPage = response.data.data.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleEdit3(staffId, checkTime, insuranceMedica, insuranceAged, insuranceUnemp, insuranceAccu){
                this.changeData2.staffId = staffId;
                this.changeData2.checkTime = checkTime;
                this.changeData2.insuranceMedica = insuranceMedica;
                this.changeData2.insuranceAged = insuranceAged;
                this.changeData2.insuranceUnemp = insuranceUnemp;
                this.changeData2.insuranceAccu = insuranceAccu;
                this.pane3.dialogFormVisible = true;
            },
            updateInsuranceMoney(){
                this.pane3.dialogFormVisible = false;
                axios.post('http://localhost:8080/insurance/updateInsuranMoney', qs.stringify({
                    staffId: this.changeData2.staffId,
                    insuranceTime: this.changeData2.checkTime,
                    medical: this.changeData2.insuranceMedica,
                    aged: this.changeData2.insuranceAged,
                    unemp: this.changeData2.insuranceUnemp,
                    accu: this.changeData2.insuranceAccu
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.$message({
                            message: '调整成功',
                            type: 'success'
                        });
                        this.getInsuranceResult(this.pane3.searchCondition, this.pane3.currentPage, this.pane3.pageSize, this.depId);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            countTaxMoney(){
                this.pane3.staffIds = [];
                for (let i in this.multipleSelection) {
                    this.pane3.staffIds.push(this.multipleSelection[i].staffId);
                }
                axios.post('http://localhost:8080/tax/countTaxMoney', qs.stringify({

                    staffIds: JSON.stringify(this.pane3.staffIds)
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '操作错误',
                            message: response.data.message
                        });
                    } else {
                        this.$message({
                            message: '计算扣税金额成功！',
                            type: 'success'
                        });
                        this.getInsuranceResult(this.pane3.searchCondition, this.pane3.currentPage, this.pane3.pageSize, this.depId);
                    }

                }).catch(function (error) {
                    console.log(error);
                });
            },
            getTaxResult(searchCondition, currentPage, pageSize, departmentId){
                axios.get('http://localhost:8080/tax/taxMoneyResult', {
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        departmentId: departmentId,
                        searchCondition: searchCondition
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '查找失败',
                            message: response.data.message
                        });
                    } else {
                        this.taxMoneyInfo = response.data.data.taxInfoList;
                        this.pane4.totalPage = response.data.data.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleEdit4(staffId, checkTime, taxMoney){
                this.changeData3.staffId = staffId;
                this.changeData3.checkTime = checkTime;
                this.changeData3.taxMoney = taxMoney;
                this.pane4.dialogFormVisible = true;
            },
            updateTaxMoney(){
                this.pane4.dialogFormVisible = false;
                axios.post('http://localhost:8080/tax/updateTaxMoney', qs.stringify({
                    staffId: this.changeData3.staffId,
                    taxTime: this.changeData3.checkTime,
                    taxMoney: this.changeData3.taxMoney
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.$message({
                            message: '调整成功',
                            type: 'success'
                        });
                        this.getTaxResult(this.pane4.searchCondition, this.pane4.currentPage, this.pane4.pageSize, this.depId);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            sendToFs(){
                axios.post('http://localhost:8080/tax/sendToFs', qs.stringify({
                    departmentId: this.depId
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败！',
                            message: response.data.message
                        });
                    } else {
                        this.$message({
                            message: '发送成功！',
                            type: 'success'
                        });
                        this.getTaxResult(this.pane4.searchCondition, this.pane4.currentPage, this.pane4.pageSize, this.depId);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            /**
             * 搜索-搜索框
             * */
            searchCondition1hand(){
                this.getAbsentData(this.pane1.searchCondition, this.pane1.currentPage, this.pane1.pageSize, this.depId);
            },
            searchCondition2hand(){
                this.getAbsentMoneyResult(this.pane2.searchCondition, this.pane2.currentPage, this.pane2.pageSize, this.depId);
            },
            searchCondition3hand(){
                this.getInsuranceResult(this.pane3.searchCondition, this.pane3.currentPage, this.pane3.pageSize, this.depId);
            },
            searchCondition4hand(){
                this.getTaxResult(this.pane4.searchCondition, this.pane4.currentPage, this.pane4.pageSize, this.depId);
            },
            /**
             * 分页-改变页码
             * */
            handleCurrentChange1(val) {
                this.pane1.currentPage = val;
                this.getAbsentData(this.pane1.searchCondition, this.pane1.currentPage, this.pane1.pageSize, this.depId);
            },
            handleCurrentChange2(val) {
                this.pane2.currentPage = val;
                this.getAbsentMoneyResult(this.pane2.searchCondition, this.pane2.currentPage, this.pane2.pageSize, this.depId);
            },
            handleCurrentChange3(val) {
                this.pane3.currentPage = val;
                this.getInsuranceResult(this.pane3.searchCondition, this.pane3.currentPage, this.pane3.pageSize, this.depId);
            },
            handleCurrentChange4(val) {
                this.pane4.currentPage = val;
                this.getTaxResult(this.pane4.searchCondition, this.pane4.currentPage, this.pane4.pageSize, this.depId);
            }
        }
    }
</script>
