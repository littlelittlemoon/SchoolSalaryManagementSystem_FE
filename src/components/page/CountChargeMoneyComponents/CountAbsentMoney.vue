<template>
    <div>
        <el-input
            placeholder="员工姓名、编号、部门..."
            icon="search"
            v-model="searchCondition"
            :on-icon-click="handleIconClick" style="margin-bottom: 10px;width: 30%">
        </el-input>
        <el-button style="position: absolute; right: 0px" type="primary">上报财务处<i
            class="el-icon-upload2 el-icon--right"></i></el-button>
        <el-table :data="absentMoneyInfo" border style="width: 100%" v-if="twoHide">
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
                                           @click="handleEdit(absence.staffId, absence.absentStartTime, absence.absentMoney)">
                                    调整
                                </el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </template>
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
        <div class="pagination" v-if="twoHide">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="totalPage">
            </el-pagination>
        </div>
        <el-dialog title="调整缺勤扣款金额" v-model="dialogFormVisible">
            <el-form :model="changeData">
                <el-form-item label="缺勤扣款" :label-width="formLabelWidth">
                    <el-input v-model="changeData.absentMoney" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateAbsentMoney()">确 定</el-button>
            </div>
        </el-dialog>
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
                dialogFormVisible: false,
                searchCondition: '',
                input2: '',
                tableData: '',
                oneHide: true,
                twoHide: true,
                activeName: 'first',
                multipleSelection: '',
                checkList: [],
                changeData: {
                    staffId: '',
                    absentStartTime: '',
                    absentMoney: ''
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                staffIds: [],
                absentMoneyInfo: [],
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
                }],
                depId: ''
            }
        },
        created: function () {
            this.getAbsentData(1);
        },
        methods: {
            handleIconClick(ev) {
                console.log(ev);
            },
            depIdChange(){
                this.getAbsentData(this.currentPage);
            },
            getAbsentData(currentPage){
                axios.get('http://139.224.129.108:8089/absentInfo/hrCheckAbsentInfo', {
                    params: {
                        currentPage: currentPage,
                        pageSize: this.pageSize,
                        departmentId: this.depId,
                        searchCondition: this.searchCondition1
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '查找失败',
                            message: response.data.message
                        });
                    } else {
                        this.checkList = response.data.data.staffAbsentInfoDetails;
                        this.totalPage = response.data.data.total;
                        this.currentPage = response.data.data.currentPage;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleClick(tab, event) {
                //切换tabs时触发
                if (this.activeName == 'first') {
                    this.getAbsentData(this.currentPage);
                } else {
                    this.getAbsentMoneyResult(this.searchCondition2, this.currentPage, this.pageSize);
                }
            },
            getAbsentMoneyResult(searchCondition, currentPage, pageSize, depId){
                axios.get('http://139.224.129.108:8089/absentMoney/absentMoneyResult', {
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        departmentId: depId,
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
                        this.totalPage = response.data.data.total;
                        this.currentPage = response.data.data.currentPage;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            handleEdit(staffId, absentStartTime, absentMoney) {
                this.changeData.staffId = staffId;
                this.changeData.absentStartTime = absentStartTime;
                this.changeData.absentMoney = absentMoney;
                this.dialogFormVisible = true;

            },
            updateAbsentMoney(){
                this.dialogFormVisible = false;
                axios.post('http://139.224.129.108:8089/absentMoney/updateAbsentMoney', qs.stringify({
                    staffId: this.changeData.staffId,
                    money: this.changeData.absentMoney,
                    startTime: this.changeData.absentStartTime,
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
                        this.getAbsentMoneyResult(this.searchCondition2, this.currentPage, this.pageSize);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
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
            searchCondition1hand(){
                this.getAbsentData(this.currentPage);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getAbsentMoneyResult(this.searchCondition, this.currentPage, this.pageSize, this.depId);
            },
            countAbsentMoney(){
                var i;
                for (i in this.multipleSelection) {
                    this.staffIds.push(this.multipleSelection[i].staffId);
                }
                this.loading = true;
                axios.post('http://139.224.129.108:8089/absentMoney/countAbsentMoney', qs.stringify({
                    staffIds: JSON.stringify(this.staffIds)
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '操作错误',
                            message: response.data.message
                        });
                    } else {
                        setTimeout(() => {
                            this.loading = false;
                            this.getAbsentData(this.currentPage);
                        }, 3000);


                    }


                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style>

</style>
