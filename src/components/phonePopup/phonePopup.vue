<!--
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2020-12-02 10:14:40
 * @LastEditors  : qwguo
 * @LastEditTime : 2020-12-09 15:15:30
 * @FilePath     : \ev-frontend-test\src\components\phonePopup\phonePopup.vue
-->
<template>
    <section class="phonePopup-box">
        <section class="phonePopup">
            <!-- 弹窗 -->
            <div class="alert-bg" :class="mbStatus ? 'alert-bg2' : ''"></div>
            <div class="alert-c" v-show="mbStatus">
                <div class="close-tit">
                    <div
                        class="close"
                        @click="closeRadioMb()"
                        v-if="showPoneJson.show == 1"
                    >
                        <img
                            src="//aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/close2.png"
                        />
                    </div>
                    <span>{{showText.blind_mobile_title}}</span>
                </div>
                <div class="close-c">
                    <div class="input-li">
                        <input
                            type="text"
                            :value="phoneVal"
                            @input="phoneValInput(1, $event.target.value)"
                            :placeholder="showText.put_mobile_title"
                            style="width:100%;"
                        />
                    </div>
                    <div class="input-li">
                        <input
                            type="text"
                            class="input-txt"
                            :placeholder="showText.get_code_title"
                            :value="messageVal"
                            @input="phoneValInput(2, $event.target.value)"
                        />
                        <div v-if="codeStatus" @click="sendMessge">
                            {{showText.get_code_title}}
                        </div>
                        <div class="input-a" v-else>{{ time }}s{{showText.get_code_again_title}}</div>
                    </div>
                    <div
                        class="button-a send_miao"
                        id="send_miao"
                        @click="bindPhoneBtn"
                    >
                        {{showText.blind_mobile_title}}
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import Vue from "vue";
import { Toast, Dialog } from "vant";
Vue.use(Toast);
// 倒计时函数
var timeCode;
import tncode from "./assets/js/codeDist.js";
export default {
    props: {
        showPoneJson: {
            type: JSON,
            default: {}
        },
        showText:{
            type: JSON,
            default:{
                blind_mobile_title: "绑定手机",
                put_mobile_title: "请输入手机号",
                get_code_again_title: "s后重新获取",
                shuruduanxinyanzhengma: "请输入验证码",
                get_code_title: "获取验证码",
                cihaomayibangding: "此手机号码已绑定，请重新输入",
                wangluofanmang: "网络繁忙，请稍后重试",
                shoujihaobunengweikong: "手机号不能为空",
                shoujihaoweishuzi: "手机号为11位数字",
                duanxinyanzhengmabunengweikong: "短信验证码不能为空"
            }
        }
    },
    data() {
        return {
            // 控制绑定手机号弹窗显示和隐藏
            mbStatus: true,
            // 发送验证码
            codeStatus: true,
            time: 60,
            phoneVal: "",
            messageVal: "",
            type: 4,
            codePopupStatus: false,
            codeNum: 0,
            phoneNum: 0,
            bindPhoneStatus: 1,
            glPhoneStatus: 1
        };
    },
    mounted() {},
    methods: {
        // 发送验证码接口
        sendMessge() {
            let that = this;
            if (!that.getWriteVal()) {
                return false;
            }
            that.codePopupStatus = true;
            if (that.codeNum == 0) {
                tncode.init("send_miao", 0,0, that.$route.query.username);
                that.codeNum++;
            } else {
                tncode.show();
            }

            // 选择将观察突变的节点
            var targetNode = document.getElementById("tncode_last_div");
            // 观察者的选项(要观察哪些突变)
            var config = {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true,
                characterDataOldValue: true,
                attributeOldValue: true
            };
            // 当观察到突变时执行的回调函数
            var callback = mutationsList => {
                mutationsList.forEach((item, index) => {
                    if (item.type == "childList" && that.phoneNum == 0) {
                        that.sendMessgeFun(tncode._mark_offset);
                        that.phoneNum++;
                        // 停止观测
                        observer.disconnect();
                        setTimeout(() => {
                            that.phoneNum = 0;
                        }, 1000);
                    }
                });
            };
            // 创建一个链接到回调函数的观察者实例
            var observer = new MutationObserver(callback);
            // 开始观察已配置突变的目标节点
            observer.observe(targetNode, config);
        },
        // 发送验证码接口
        sendMessgeFun(val) {
            let that = this;
            that.$F.Response({
                url: "dom/ajax_zhuce_code.php",
                param: {
                    username: that.$route.query.username,
                    userid: that.showPoneJson.userId,
                    type: that.type,
                    mobile: that.phoneVal,
                    wap: 1,
                    tn_r: parseInt(val)
                },
                success: res => {
                    if (res == 1) {
                        Toast({
                            message: that.showText.cihaomayibangding,
                            duration: 1200
                        });
                        return false;
                    }
                    if ($.trim(res) == "success") {
                        that.getCode();
                    } else {
                        Toast({
                            message: that.showText.wangluofanmang,
                            duration: 1200
                        });
                    }
                },
                error: err => {
                    if (
                        err &&
                        typeof err == "object" &&
                        err.responseText == "success"
                    ) {
                        that.getCode();
                    } else {
                        Toast({
                            message: that.showText.wangluofanmang,
                            duration: 1200
                        });
                    }
                }
            });
        },
        // 绑定手机号
        bindPhoneBtn() {
            let that = this;
            if (!this.getWriteVal(1)) {
                return false;
            }
            if (that.bindPhoneStatus == 0) {
                return false;
            }
            that.bindPhoneStatus = 0;
            that.$F.Response({
                url: "dom/ajax_mobile_blind.php",
                param: {
                    username: that.$route.query.username,
                    wap: 1,
                    type: 1,
                    mobile: that.phoneVal,
                    mobile_code: that.messageVal
                },
                success: data => {
                    if (data["status"] == 1 || data["status"] == 2) {
                        //验证码不正确
                        Toast({
                            message: data["message"],
                            duration: 1000
                        });
                        that.messageVal = "";
                    } else if (data["status"] == 3 || data["status"] == 4) {
                        // 手机号已被其他用户绑定||手机号已绑定
                        Dialog.confirm({
                            message: data["message"],
                        }).then(() => {
                            that.guanlianPhone();
                        })
                        .catch(() => {
                            // on cancel
                        });
                    } else if (data["status"] == 5) {
                        // 其他错误提示信息
                        Toast({
                            message: data["message"],
                            duration: 1000
                        });
                    } else {
                        // 绑定成功
                        Toast({
                            message: data["message"],
                            duration: 1000
                        });
                        that.mbStatus = false;
                        if (that.$listeners['bindSuccess']) {
                            that.$emit('bindSuccess');
                        }
                    }
                    that.bindPhoneStatus = 1;
                },
                error: err => {
                    that.bindPhoneStatus = 1;
                    Toast({
                        message: that.showText.wangluofanmang,
                        duration: 1000
                    });
                }
            });
        },
        // 关联手机号
        guanlianPhone() {
            let that = this;
            if (that.glPhoneStatus == 0) {
                return false;
            }
            that.glPhoneStatus = 1;
            that.$F.Response({
                url: "dom/ajax_mobile_blind.php",
                param: {
                    username: that.$route.query.username,
                    wap: 1,
                    type: 2,
                    mobile: that.phoneVal
                },
                success: data => {
                    that.glPhoneStatus = 1;
                    if (data["status"] * 1 > 0) {
                        Toast({
                            message: data["message"],
                            duration: 1000
                        });
                    } else {
                        that.mbStatus = false;
                        Toast({
                            message: data["message"],
                            duration: 1000
                        });
                        // window.location.reload();
                    }
                },
                error: err => {
                    that.glPhoneStatus = 1;
                    Toast({
                        message: that.showText.wangluofanmang,
                        duration: 1000
                    });
                }
            });
        },
        // 判断是否填写手机号验证码
        getWriteVal(type) {
            if (!this.ifHaveFun(this.phoneVal)) {
                Toast({
                    message: that.showText.shoujihaobunengweikong,
                    duration: 1000
                });
                return false;
            }
            if (!this.ifHaveFun(this.yzMobile(this.phoneVal))) {
                Toast({
                    message: that.showText.shoujihaoweishuzi,
                    duration: 1000
                });
                return false;
            }
            if (type == 1) {
                if (!this.ifHaveFun(this.messageVal)) {
                    Toast({
                        message: that.showText.duanxinyanzhengmabunengweikong,
                        duration: 1000
                    });
                    return false;
                }
            }
            return true;
        },
        /**
         * @Date: 2020-09-08 14:46:52
         * @LastEditors: zhouqi
         * @description: 显示绑定手机号弹窗
         */
        signAccept() {
            this.mbStatus = true;
        },
        /**
         * @Date: 2020-09-08 15:24:18
         * @LastEditors: zhouqi
         * @description: 蒙版点击事件
         */
        closeRadioMb() {
            this.mbStatus = false;
            this.time = 60;
            this.codeStatus = true;
            clearInterval(timeCode);
        },
        /**
         * @Date: 2020-10-09 17:48:20
         * @LastEditors: zhouqi
         * @description: 获取验证码
         */
        getCode() {
            let that = this;
            that.codeStatus = false;
            timeCode = setInterval(() => {
                that.time--;
                if (that.time == 0) {
                    that.type = 2;
                    that.codeStatus = true;
                    that.time = 60;
                    clearInterval(timeCode);
                }
            }, 1000);
        },
        // 获取input的值
        phoneValInput(type, val) {
            if (type == 1) {
                this.phoneVal = val;
            } else if (type == 2) {
                this.messageVal = val;
            }
        },
        /**
         * 检测一个值是否为空
         * @returns {boolean}
         */
        ifHaveFun(value) {
            if (
                JSON.stringify(value) == "{}" ||
                value == {} ||
                value == "" ||
                value == undefined ||
                value == null ||
                value === false ||
                value == 0
            ) {
                return false;
            } else {
                // 判断是否是空格
                if (
                    false &&
                    String(value).replace(/(^\s*)|(\s*$)/g, "").length == 0
                ) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 验证手机号
        yzMobile(tel) {
            var reg = /(^0{0,1}1[0-9]{1}[0-9]{9}$)/;
            if (reg.test(tel)) {
                tel = true;
                return tel;
            } else {
                tel = false;
                return tel;
            }
        }
    }
};
</script>

<style>
@import "./assets/css/phonePopup.scss";
</style>
