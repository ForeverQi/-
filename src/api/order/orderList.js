/*
 * @Author       : zhouqi
 * @description  : 订单列表页面相关的接口
 * @Date         : 2020-11-05 15:16:31
 * @LastEditors  : zhouqi
 * @LastEditTime : 2020-12-11 11:52:45
 * @FilePath     : /vue-VFrontend/src/api/order/orderList.js
 */
import request from "@/plugins/axios";
import util from "@/libs/util";

/**
 * @Date: 2020-11-05 15:18:08
 * @LastEditors: zhouqi
 * @description: 订单列表接口
 * @param {*} data
 * @return {*}
 */
export function getOrderList(data) {
    return request({
        url: "/frontend/mallorder/getOrderList",
        method: "post",
        data
    });
}
/**
 * @Date: 2020-11-05 15:20:01
 * @LastEditors: zhouqi
 * @description: 购物车列表接口
 * @param {*} data
 * @return {*}
 */
export function cartList(data) {
    return request({
        url: "/mallorder/api/cart.php",
        method: "post",
        data
    });
}
/**
 * @Date: 2020-11-05 15:23:47
 * @LastEditors: zhouqi
 * @description: 取消订单接口
 * @param {*} data
 * @return {*}
 */
export function orderHandle(data) {
    return request({
        url: "/frontend/mallorder/orderHandle",
        method: "post",
        data
    });
}
