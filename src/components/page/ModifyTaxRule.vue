<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">>">
                <el-breadcrumb-item><i></i>薪资标准管理</el-breadcrumb-item>
                <el-breadcrumb-item><i></i>管理交税规则</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button style="margin-bottom:15px; margin-left: 88%;" type="primary" @click="preAddTaxRule">添加新方案<i
            class="el-icon-edit el-icon--right"></i></el-button>
        <el-table
            :data="taxRuleData"
            border
            style="width: 100%">
            <el-table-column
                label="编号"
                prop="id">
            </el-table-column>
            <el-table-column
                label="交税基数上界"
                prop="minNum">
            </el-table-column>
            <el-table-column
                label="交税基数下界"
                prop="maxNum">
            </el-table-column>
            <el-table-column
                label="适用税率"
                prop="rate">
            </el-table-column>
            <el-table-column
                label="速算扣除数"
                prop="calcuNum">
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
            <el-table-column label="操作" width="251">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="handleEdit(scope.row.id,scope.row.minNum,scope.row.maxNum, scope.row.rate,scope.row.calcuNum)">
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
                        @click="updateStatus(scope.row.id,scope.row.minNum,scope.row.maxNum, scope.row.rate,scope.row.calcuNum,scope.row.status)">
                        切换状态
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加扣税规则" v-model="dialogFormVisible1">
            <el-form :model="addData">
                <el-form-item label="交税基数上界" :label-width="formLabelWidth">
                    <el-input v-model="addData.minNum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="交税基数下界" :label-width="formLabelWidth">
                    <el-input v-model="addData.maxNum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="适用税率" :label-width="formLabelWidth">
                    <el-input v-model="addData.rate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="速算扣除数" :label-width="formLabelWidth">
                    <el-input v-model="addData.calcuNum" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="addTaxRule()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="调整扣税规则" v-model="dialogFormVisible">
            <el-form :model="changeData">
                <el-form-item label="交税基数上界" :label-width="formLabelWidth">
                    <el-input v-model="changeData.minNum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="交税基数下界" :label-width="formLabelWidth">
                    <el-input v-model="changeData.maxNum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="适用税率" :label-width="formLabelWidth">
                    <el-input v-model="changeData.rate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="速算扣除数" :label-width="formLabelWidth">
                    <el-input v-model="changeData.calcuNum" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateTaxRule()">确 定</el-button>
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
                taxRuleData: [],
                formLabelWidth: '120px',
                changeData: {
                    id: '',
                    minNum: '',
                    maxNum: '',
                    rate: '',
                    calcuNum: ''
                },
                addData: {
                    minNum: '',
                    maxNum: '',
                    rate: '',
                    calcuNum: ''
                }
            }
        },
        created: function () {
            this.getTaxRuleData();
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
            addTaxRule(){
                this.dialogFormVisible1 = false;
                axios.post('http://lalala.tunnel.2bdata.com/taxSetting/add', qs.stringify({
                    minNum: this.addData.minNum,
                    maxNum: this.addData.maxNum,
                    rate: this.addData.rate,
                    calcuNum: this.addData.calcuNum
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
                        this.getTaxRuleData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getTaxRuleData(){
                axios.get('http://lalala.tunnel.2bdata.com/taxSetting/list').then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        self.$notify.error({
                            title: '查找失败',
                            message: response.data.message
                        });
                    } else {
                        this.taxRuleData = response.data.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            preAddTaxRule(){
                this.dialogFormVisible1 = true;
            },
            handleEdit(id, minNum, maxNum, rate, calcuNum) {
                this.changeData.id = id;
                this.changeData.minNum = minNum;
                this.changeData.maxNum = maxNum;
                this.changeData.rate = rate;
                this.changeData.calcuNum = calcuNum;
                this.dialogFormVisible = true;
            },
            updateStatus(id, minNum, maxNum, rate, calcuNum, status){
                if (status == '已启用') {
                    status = 'disable';
                } else {
                    status = 'enable';
                }
                axios.post('http://lalala.tunnel.2bdata.com/taxSetting/update', qs.stringify({
                    id: id,
                    minNum: minNum,
                    maxNum: maxNum,
                    rate: rate,
                    calcuNum: calcuNum,
                    status: status
                })).then(response => {
                    console.log(response);
                    if (response.data.code == 1) {
                        this.$notify.error({
                            title: '操作失败',
                            message: response.data.message
                        });
                    } else {
                        this.getTaxRuleData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            updateTaxRule(){
                this.dialogFormVisible = false;
                axios.post('http://lalala.tunnel.2bdata.com/taxSetting/update', qs.stringify({
                    id: this.changeData.id,
                    minNum: this.changeData.minNum,
                    maxNum: this.changeData.maxNum,
                    rate: this.changeData.rate,
                    calcuNum: this.changeData.calcuNum
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
                        this.getTaxRuleData();
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
                    console.log("4545454454545454545454");
                    axios.post('http://lalala.tunnel.2bdata.com/taxSetting/delete', qs.stringify({
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
                            this.getTaxRuleData();
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
