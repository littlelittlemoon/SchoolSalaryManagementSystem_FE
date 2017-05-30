<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 学校工资管理系统（SSMS）简介</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>学校工资管理系统（SSMS）</h3>
            <article>
                <el-form :model="personalInfo" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="staffName">
                        <el-input disabled style="width: 60%;" v-model="personalInfo.staffName"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="staffSex">
                        <el-input disabled style="width: 60%;" v-model="personalInfo.staffSex"></el-input>
                    </el-form-item>
                    <el-form-item label="所属部门" prop="departmentName">
                        <el-input disabled style="width: 60%;" v-model="personalInfo.departmentName"></el-input>
                    </el-form-item>
                    <el-form-item label="职称" prop="staffTitle">
                        <el-input disabled style="width: 60%;" v-model="personalInfo.titleName"></el-input>
                    </el-form-item>
                    <el-form-item label="职务" prop="staffDuty">
                        <el-input disabled style="width: 60%;" v-model="personalInfo.dutyName"></el-input>
                    </el-form-item>
                    <el-form-item label="入职时间">
                        <el-input disabled style="width: 60%;" v-model="personalInfo.entryTime"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="identityNum">
                        <el-input disabled style="width: 60%;" v-model="personalInfo.identityNum"></el-input>
                    </el-form-item>
                    <el-form-item label="银行卡号" prop="bankAcount">
                        <el-input disabled style="width: 60%;" v-model="personalInfo.bankAcount"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phoneNum">
                        <el-input disabled style="width: 60%;" v-model="personalInfo.telNum"></el-input>
                    </el-form-item>
                </el-form>
            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                personalInfo:{
                    staffName: '谭凯悦',
                    staffSex: '女',
                    departmentName: '计算机学院',
                    titleName: '教授',
                    dutyName: '部门管理员',
                    entryTime: '2008-12-19',
                    identityNum: '5112587895454558525',
                    bankAcount:'6258445522225844525',
                    telNum: '15846885255'
                }
            }
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>
