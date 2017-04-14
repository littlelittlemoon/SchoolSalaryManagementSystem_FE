<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="考勤审核" name="first">
            <el-table :data="tableData2" border style="width: 100%">
                <el-table-column
                    label="员工编号"
                    prop="staffNum">
                </el-table-column>
                <el-table-column
                    label="员工姓名"
                    prop="staffName">
                </el-table-column>
                <el-table-column prop="checkDetailTime" label="请假时间" sortable
                                 style="width: 30%">
                </el-table-column>
                <el-table-column prop="absentReason" label="请假原因" style="width: 30%">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" type="primary"
                                   @click="handlePass(scope.$index, scope.row)">通过
                        </el-button>
                        <el-button size="small" type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">打回
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
        </el-tab-pane>

        <el-tab-pane label="查看考勤信息" name="second">
            <el-input
                placeholder="员工姓名、编号..."
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick" style="margin-bottom: 10px;width: 30%" >
            </el-input>
            <el-button style="position: absolute; right: 0px" type="primary">发送至人事处<i class="el-icon-upload2 el-icon--right"></i></el-button>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <div v-for="absence in props.row.absences" class="item">
                                <el-form-item label="考勤时间">
                                    <span>{{absence.checkDetailTime}}</span>
                                </el-form-item>
                                <el-form-item label="缺勤原因">
                                    <span>{{absence.absentReason }}</span>
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
                    label="员工编号"
                    prop="staffNum">
                </el-table-column>
                <el-table-column
                    label="员工姓名"
                    prop="staffName">
                </el-table-column>
                <el-table-column
                    label="缺勤天数"
                    prop="absentDays">
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
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
                activeName: 'first',
                tableData: [{
                    checkTime: '2017.03',
                    staffNum: '2013001',
                    staffName: '蔡明',
                    absentDays: 2,
                    absences: [{
                        checkDetailTime: '2017.03.05',
                        absentReason: '事假'
                    }, {
                        checkDetailTime: '2017.03.25',
                        absentReason: '旷工'

                    }]
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013005',
                    staffName: '李华',
                    absentDays: 3,
                    absences: [{
                        checkDetailTime: '2017.03.05',
                        absentReason: '事假'
                    }, {
                        checkDetailTime: '2017.03.18',
                        absentReason: '病假'
                    }, {
                        checkDetailTime: '2017.03.25',
                        absentReason: '旷工'
                    }
                    ]
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013002',
                    staffName: '刘敏',
                    absentDays: 3,
                    absences: [{
                        checkDetailTime: '2017.03.05',
                        absentReason: '事假'
                    }, {
                        checkDetailTime: '2017.03.18',
                        absentReason: '病假'
                    }, {
                        checkDetailTime: '2017.03.25',
                        absentReason: '旷工'
                    }
                    ]
                }, {
                    checkTime: '2017.03',
                    staffNum: '2013004',
                    staffName: '振宇',
                    absentDays: 3,
                    absences: [{
                        checkDetailTime: '2017.03.05',
                        absentReason: '事假'
                    }, {
                        checkDetailTime: '2017.03.18',
                        absentReason: '病假'
                    }, {
                        checkDetailTime: '2017.03.25',
                        absentReason: '旷工'
                    }
                    ]
                },],
                tableData2: [
                    {
                        checkTime: '2017.03',
                        staffNum: '2013001',
                        staffName: '蔡明',
                        checkDetailTime: '2017.03.29',
                        absentReason: '病假'
                    }

                ]


            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handlePass(index, row) {
                this.$message('通过第' + (index + 1) + '行');
            },
            handleDelete(index, row) {
                this.$message.error('拒绝第' + (index + 1) + '行');
            }
        }
    }
</script>
