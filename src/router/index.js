import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/AboutMe',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/AboutMe.vue'], resolve)
                },

                {
                    path: '/ManageSalary',
                    component: resolve => require(['../components/page/ManageSalary.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/HistorySalary',
                    component: resolve => require(['../components/page/HistorySalary.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/CountPrice',
                    component: resolve => require(['../components/page/CountPrice.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/CountInsurance',
                    component: resolve => require(['../components/page/CountInsurance.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/CountTax',
                    component: resolve => require(['../components/page/CountTax.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/AddStaff',
                    component: resolve => require(['../components/page/AddStaff.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: '/ManageStaffInfo',
                    component: resolve => require(['../components/page/ManageStaffInfo.vue'], resolve)    // vue-echarts-v3组件
                },
                {
                    path: '/StaffHistorySalary',
                    component: resolve => require(['../components/page/StaffHistorySalary.vue'], resolve)    // SalaryInfo组件
                },
                {
                    path: '/StaffCheckInfo',
                    component: resolve => require(['../components/page/StaffCheckInfo.vue'], resolve)    // CheckInfo组件
                },
                {
                    path: '/ApplicationForLeave',
                    component: resolve => require(['../components/page/ApplicationForLeave.vue'], resolve)    // /ApplicationForLeave组件
                },
                {
                    path: '/DepCheckInfo',
                    component: resolve => require(['../components/page/DepCheckInfo.vue'], resolve)    // /ApplicationForLeave组件
                },
                {
                    path: '/ChargeBack',
                    component: resolve => require(['../components/page/ChargeBack.vue'], resolve)    // /ApplicationForLeave组件
                },
                {
                    path: '/ApplicationList',
                    component: resolve => require(['../components/page/ApplicationList.vue'], resolve)    // /ApplicationForLeave组件
                },
                {
                    path: '/ModifyTaxRule',
                    component: resolve => require(['../components/page/ModifyTaxRule.vue'], resolve)    // ModifyTaxRule组件
                },
                {
                    path: '/ModifyInsuranceRule',
                    component: resolve => require(['../components/page/ModifyInsuranceRule.vue'], resolve)    // ModifyTaxRule组件
                },
                {
                    path: '/ModifyAbsenceRule',
                    component: resolve => require(['../components/page/ModifyAbsenceRule.vue'], resolve)    // ModifyTaxRule组件
                },
                {
                    path: '/changePwd',
                    component: resolve => require(['../components/page/changePwd.vue'], resolve)    // ModifyTaxRule组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
