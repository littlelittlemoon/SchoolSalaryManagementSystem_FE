<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>薪资标准管理</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>管理五险一金扣款规则</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button style="margin-bottom:15px; margin-left: 88%;" type="primary" @click="preAddInsuranceRule">添加新方案<i
            class="el-icon-edit el-icon--right"></i></el-button>
        <el-table
            :data="insuranceRuleData"
            border
            style="width: 100%">
            <el-table-column
                label="编号"
                prop="id">
            </el-table-column>
            <el-table-column
                label="缴纳基数比率"
                prop="baseRate">
            </el-table-column>
            <el-table-column
                label="医疗保险比例"
                prop="medicalRate">
            </el-table-column>
            <el-table-column
                label="养老保险比例"
                prop="agedRate">
            </el-table-column>
            <el-table-column
                label="失业保险比例"
                prop="unempRate">
            </el-table-column>
            <el-table-column
                label="公积金比例"
                prop="accuRate">
            </el-table-column>
            <el-table-column
                prop="status"
                label="启用状态">
                <template scope="scope">
                    <el-tag
                        :type="tabColor(scope.row.status)"
                        close-transition>{{scope.row.status}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="225">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="handleEdit(scope.row.id,scope.row.baseRate,scope.row.medicalRate, scope.row.agedRate,scope.row.unempRate, scope.row.accuRate)">
                        调整
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row.id)">删除
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        @click="updateStatus(scope.row.id,scope.row.baseRate,scope.row.medicalRate, scope.row.agedRate,scope.row.unempRate, scope.row.accuRate,scope.row.status)">
                        切换状态
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加五险一金扣除方案" v-model="dialogFormVisible1">
            <el-form :model="addData">
                <el-form-item label="缴纳基数比例" :label-width="formLabelWidth">
                    <el-input v-model="addData.baseRate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="医疗保险比例" :label-width="formLabelWidth">
                    <el-input v-model="addData.medicalRate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="养老保险比例" :label-width="formLabelWidth">
                    <el-input v-model="addData.agedRate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="失业保险比例" :label-width="formLabelWidth">
                    <el-input v-model="addData.unempRate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公积金比例" :label-width="formLabelWidth">
                    <el-input v-model="addData.accuRate" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="addInsuranceRule()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="调整五险一金扣除比例" v-model="dialogFormVisible">
            <el-form :model="changeData">
                <el-form-item label="缴纳基数比率" :label-width="formLabelWidth">
                    <el-input v-model="changeData.baseRate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="医疗保险缴纳比率" :label-width="formLabelWidth">
                    <el-input v-model="changeData.medicalRate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="养老保险缴纳比率" :label-width="formLabelWidth">
                    <el-input v-model="changeData.agedRate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="失业保险缴纳比率" :label-width="formLabelWidth">
                    <el-input v-model="changeData.unempRate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公积金缴纳比率" :label-width="formLabelWidth">
                    <el-input v-model="changeData.accuRate" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateInsuranceRule()">确 定</el-button>
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
                dialogFormVisible: false,
                dialogFormVisible1: false,
                insuranceRuleData: [],
                formLabelWidth: '120px',
                status: '',
                changeData: {
                    id: '',
                    baseRate: '',
                    medicalRate: '',
                    agedRate: '',
                    unempRate: '',
                    accuRate: ''
                },
                addData: {
                    baseRate: '',
                    medicalRate: '',
                    agedRate: '',
                    unempRate: '',
                    accuRate: ''
                }
            }
        },
        created: function () {
            this.getInsuranceRuleData();
        },
        methods: {
            tabColor(status){
                if (status == '未启用') {
                    return 'sliver';
                } else if (status == '已启用') {
                    return 'success';
                } else {
                    return 'danger';
                }
            },
            addInsuranceRule(){
                this.dialogFormVisible1 = false;
                axios.post('http://lalala.tunnel.2bdata.com/insuranceSetting/add', qs.stringify({
                    baseRate: this.addData.baseRate,
                    medicalRate: this.addData.medicalRate,
                    agedRate: this.addData.agedRate,
                    unempRate: this.addData.unempRate,
                    accuRate: this.addData.accuRate
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.getInsuranceRuleData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            preAddInsuranceRule(){
                this.dialogFormVisible1 = true;
            },
            getInsuranceRuleData(){
                axios.get('http://lalala.tunnel.2bdata.com/insuranceSetting/list').then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '查找失败',
                            message: response.data.message
                        });
                    } else {
                        this.insuranceRuleData = response.data.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleEdit(id, baseRate, medicalRate, agedRate, unempRate, accuRate) {
                this.changeData.id = id;
                this.changeData.baseRate = baseRate;
                this.changeData.medicalRate = medicalRate;
                this.changeData.agedRate = agedRate;
                this.changeData.unempRate = unempRate;
                this.changeData.accuRate = accuRate;
                this.dialogFormVisible = true;
            },
            updateInsuranceRule(){
                this.dialogFormVisible = false;
                axios.post('http://lalala.tunnel.2bdata.com/insuranceSetting/update', qs.stringify({
                    id: this.changeData.id,
                    baseRate: this.changeData.baseRate,
                    medicalRat: this.changeData.medicalRate,
                    agedRate: this.changeData.agedRate,
                    unempRate: this.changeData.unempRate,
                    accuRate: this.changeData.accuRate
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
                        this.getInsuranceRuleData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            updateStatus(id, baseRate, medicalRate, agedRate, unempRate, accuRate, status){
                if (status == '已启用') {
                    status = 'disable';
                } else {
                    status = 'enable';
                }
                axios.post('http://lalala.tunnel.2bdata.com/insuranceSetting/update', qs.stringify({
                    id: id,
                    baseRate: baseRate,
                    medicalRat: medicalRate,
                    agedRate: agedRate,
                    unempRate: unempRate,
                    accuRate: accuRate,
                    status: status
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.getInsuranceRuleData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleDelete(id) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('http://lalala.tunnel.2bdata.com/insuranceSetting/delete', qs.stringify({
                        id: id
                    })).then(response => {
                        console.log(response);
                        if (response.data.code == 1) {
                            this.$notify.error({
                                title: '操作失败',
                                message: response.data.message
                            });
                        } else {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getInsuranceRuleData();
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>
