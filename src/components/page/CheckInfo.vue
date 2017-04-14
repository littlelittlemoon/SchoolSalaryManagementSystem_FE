<template>
    <el-table
        :data="tableData5"
        style="width: 100%">
        <el-table-column type="expand">
            <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <div  v-for="absence in props.row.absences" class="item">
                        <el-form-item label="考勤时间">
                            <span>{{absence.checkDetailTime}}</span>
                        </el-form-item>
                        <el-form-item label="缺勤原因">
                            <span>{{absence.absentReason }}</span>
                        </el-form-item>
                        <el-form-item label="缺勤扣款">
                            <span>{{absence.absentMoney }}</span>
                        </el-form-item>
                    </div>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
            label="考勤年月"
            prop="checkTime">
        </el-table-column>
        <el-table-column
            label="应到天数"
            prop="baseDays">
        </el-table-column>
        <el-table-column
            label="实到天数"
            prop="realDays">
        </el-table-column>
        <el-table-column
            label="缺勤金"
            prop="absentWages">
        </el-table-column>
    </el-table>
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
    export default {
        data() {
            return {
                tableData5: [{
                    checkTime: '2017.03',
                    baseDays: '22',
                    realDays: '19',
                    absentWages: '200￥',
                    absences:[{
                        checkDetailTime: '2017.03.05',
                        absentReason: '事假',
                        absentMoney: '50￥'
                    },{
                        checkDetailTime: '2017.03.18',
                        absentReason: '病假',
                        absentMoney: '50￥'
                    },{
                        checkDetailTime: '2017.03.25',
                        absentReason: '旷工',
                        absentMoney: '100￥'
                    }
                    ]
                }, {
                    checkTime: '2017.02',
                    baseDays: '22',
                    realDays: '22',
                    absentWages: '0￥',
                    absences:[]
                }, {
                    checkTime: '2017.01',
                    baseDays: '22',
                    realDays: '19',
                    absentWages: '150￥',
                    absences:[{
                        checkDetailTime: '2017.01.03',
                        absentReason: '事假',
                        absentMoney: '50￥'
                    },{
                        checkDetailTime: '2017.01.19',
                        absentReason: '事假',
                        absentMoney: '50￥'
                    },{
                        checkDetailTime: '2017.01.20',
                        absentReason: '事假',
                        absentMoney: '50￥'
                    }]
                }, {
                    checkTime: '2016.12',
                    baseDays: '22',
                    realDays: '18',
                    absentWages: '200￥',
                    absences:[{
                        checkDetailTime: '2016.12.09',
                        absentReason: '事假',
                        absentMoney: '50￥'
                    },{
                        checkDetailTime: '2016.12.12',
                        absentReason: '事假',
                        absentMoney: '50￥'
                    },{
                        checkDetailTime: '2016.12.22',
                        absentReason: '病假',
                        absentMoney: '50￥'
                    },{
                        checkDetailTime: '2016.12.28',
                        absentReason: '事假',
                        absentMoney: '50￥'
                    },]
                }]
            }
        }
    }
</script>
