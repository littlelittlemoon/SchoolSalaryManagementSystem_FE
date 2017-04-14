<template>
    <el-table
        :data="tableData5"
        style="width: 100%">
        <el-table-column type="expand">
            <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="时间">
                        <span>{{ props.row.salaryTime }}</span>
                    </el-form-item>
                    <el-form-item label="基本工资">
                        <span>{{ props.row.baseWages }}</span>
                    </el-form-item>
                    <el-form-item label="扣税金">
                        <span>{{ props.row.tax }}</span>
                    </el-form-item>
                    <el-form-item label="缺勤金">
                        <span>{{ props.row.absentWages }}</span>
                    </el-form-item>
                    <el-form-item label="五险一金">
                        <span>{{ props.row.insuranceWages }}</span>
                    </el-form-item>
                    <el-form-item label="工龄津贴">
                        <span>{{ props.row.longPay }}</span>
                    </el-form-item>
                    <el-form-item label="全勤奖">
                        <span>{{ props.row.fullBonus }}</span>
                    </el-form-item>
                    <el-form-item label="福利补贴">
                        <span>{{ props.row.welfare }}</span>
                    </el-form-item>
                    <el-form-item label="实发工资">
                        <span>{{ props.row.realWages }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
            label="时间"
            prop="salaryTime">
        </el-table-column>
        <el-table-column
            label="基本工资"
            prop="baseWages">
        </el-table-column>
        <el-table-column
            label="实发工资"
            prop="realWages">
        </el-table-column>
    </el-table>
</template>

<style>
    .demo-table-expand {
        font-size: 0;
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
</style>

<script>
    export default {
        data() {
            return {
                tableData5: [{
                    salaryTime: '2017.03',
                    baseWages: '6000￥',
                    realWages: '5600￥',
                    tax: '-550￥',
                    absentWages: '-200￥',
                    insuranceWages: '-300￥',
                    longPay: '+150￥',
                    fullBonus: '+0￥',
                    welfare: '+500￥'
                }, {
                    salaryTime: '2017.02',
                    baseWages: '6000￥',
                    realWages: '6000￥',
                    tax: '-550￥',
                    absentWages: '-0￥',
                    insuranceWages: '-300￥',
                    longPay: '+150￥',
                    fullBonus: '+200￥',
                    welfare: '+500￥'
                }, {
                    salaryTime: '2017.01',
                    baseWages: '6000￥',
                    realWages: '5650￥',
                    tax: '-550￥',
                    absentWages: '-150￥',
                    longPay: '+150￥',
                    insuranceWages: '-300￥',
                    fullBonus: '+0￥',
                    welfare: '+500￥'
                }, {
                    salaryTime: '2016.12',
                    baseWages: '6000￥',
                    realWages: '5600￥',
                    tax: '-550￥',
                    absentWages: '-200￥',
                    insuranceWages: '-300￥',
                    longPay: '+150￥',
                    fullBonus: '+0￥',
                    welfare: '+500￥'
                }]
            }
        }
    }
</script>
