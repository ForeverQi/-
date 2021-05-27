/*
 * @Author       : zhouqi
 * @description  : 个人中心路由定义
 * @Date         : 2020-08-31 15:02:57
 * @LastEditors  : qwguo
 * @LastEditTime : 2020-12-08 18:50:41
 * @FilePath     : \ev-frontend-test\src\router\personal_center\personal_center.js
 */

export default [
    {
        path: "/personalCenter/personal-center-home",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-personalCenter-personal-center-home",
        components: {
            Contents: () => import("@/pages/personalCenter/views/personal-center-home")
        },
        meta: {
            title: "会员中心"
        }
    }
];
