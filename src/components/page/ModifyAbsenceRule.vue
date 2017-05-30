<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>薪资标准管理</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>管理缺勤扣款规则</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button style="margin-bottom:15px; margin-left: 88%;" type="primary" @click="preAddAbsenceRule">添加新方案<i
            class="el-icon-edit el-icon--right"></i></el-button>
        <el-table
            :data="absenceRuleData"
            border
            style="width: 100%">
            <el-table-column
                label="编号"
                prop="id">
            </el-table-column>
            <el-table-column
                label="缺勤类型"
                prop="absentType">
            </el-table-column>
            <el-table-column
                label="缺勤扣除比例"
                prop="proportion">
            </el-table-column>
            <el-table-column
                label="应到天数"
                prop="shouldDays">
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
                        @click="handleEdit(scope.row.id,scope.row.absentType,scope.row.proportion, scope.row.shouldDays)">
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
                        @click="updateStatus(scope.row.id,scope.row.absentType,scope.row.proportion, scope.row.shouldDays,scope.row.status)">
                        切换状态
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加缺勤类型" v-model="dialogFormVisible1">
            <el-form :model="addData">
                <el-form-item label="缺勤类型" :label-width="formLabelWidth">
                    <el-input v-model="addData.absentType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="缺勤扣除比例" :label-width="formLabelWidth">
                    <el-input v-model="addData.proportion" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="应到天数" :label-width="formLabelWidth">
                    <el-input v-model="addData.shouldDays" auto-complete="off" placeholder="21.75"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="addAbsenceRule()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="调整缺勤扣款规则" v-model="dialogFormVisible">
            <el-form :model="changeData">
                <el-form-item label="缺勤类型" :label-width="formLabelWidth">
                    <el-input v-model="changeData.absentType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="缺勤扣除比例" :label-width="formLabelWidth">
                    <el-input v-model="changeData.proportion" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="应到天数" :label-width="formLabelWidth">
                    <el-input v-model="changeData.shouldDays" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateAbsenceRule()">确 定</el-button>
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
                absenceRuleData: [],
                formLabelWidth: '120px',
                changeData: {
                    id: '',
                    absentType: '',
                    proportion: '',
                    shouldDays: ''
                },
                addData: {
                    absentType: '',
                    proportion: '',
                    shouldDays: ''
                }
            }
        },
        created: function () {
            this.getAbsenceRuleData();
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
            addAbsenceRule(){
                this.dialogFormVisible1 = false;
                axios.post('http://lalala.tunnel.2bdata.com/absenceSetting/add', qs.stringify({
                    absentType: this.addData.absentType,
                    proportion: this.addData.proportion,
                    shouldDays: this.addData.shouldDays
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
                        this.getAbsenceRuleData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            preAddAbsenceRule(){
                this.dialogFormVisible1 = true;
            },
            getAbsenceRuleData(){
                axios.get('http://lalala.tunnel.2bdata.com/absenceSetting/list').then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '查找失败',
                            message: response.data.message
                        });
                    } else {
                        this.absenceRuleData = response.data.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleEdit(id, absentType, proportion, shouldDays) {
                this.changeData.id = id;
                this.changeData.absentType = absentType;
                this.changeData.proportion = proportion;
                this.changeData.shouldDays = shouldDays;
                this.dialogFormVisible = true;
            },
            updateAbsenceRule(){
                this.dialogFormVisible = false;
                axios.post('http://lalala.tunnel.2bdata.com/absenceSetting/update', qs.stringify({
                    id: this.changeData.id,
                    absentType: this.changeData.absentType,
                    proportion: this.changeData.proportion,
                    shouldDays: this.changeData.shouldDays
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
                        this.getAbsenceRuleData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            updateStatus(id, absentType, proportion, shouldDays, status){
                if (status == '已启用') {
                    status = 'disable';
                } else {
                    status = 'enable';
                }
                axios.post('http://lalala.tunnel.2bdata.com/absenceSetting/update', qs.stringify({
                    id: id,
                    absentType: absentType,
                    proportion: proportion,
                    shouldDays: shouldDays,
                    status: status
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.getAbsenceRuleData();
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
                    axios.post('http://lalala.tunnel.2bdata.com/absenceSetting/delete', qs.stringify({
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
                            this.getAbsenceRuleData();
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
