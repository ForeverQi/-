<template>
    <div class="register_window fadeIn animated">
        <div class="register_one">
            <div class="register_tit">
                <p></p>
                <em>登陆</em>
            </div>
            <div class="register_user ctrl">
                <span class="register_img"><img src="@/assets/images/signin/icon1.png" alt=""></span>
                <p><input type="text" v-model="username" autocomplete="off" placeholder="请输入用户名"></p>
            </div>
            <div class="register_user ctrl">
                <span class="register_img"><img src="@/assets/images/signin/icon2.png" alt=""></span>
                <p>
                    <input type="password" v-model="password" autocomplete="off" placeholder="请输入密码">
                </p>
            </div>
            <div class="register_user ctrl">
                <span class="register_img"><img src="@/assets/images/signin/icon3.png" alt=""></span>
                <p><input type="text" v-model="mobile" placeholder="您的手机号"></p>
            </div>
            <div class="register_pwd ctrl">
                <span class="register_img"><img src="@/assets/images/signin/icon4.png" alt=""></span>
                <p><input type="text" v-model="code" placeholder="验证码"></p>
                <a v-if="Verify.count <= 0" href="javascript:;" @click="GetPhoneCode()">获取短信验证码</a>
                <a v-else class="a_time ">{{Verify.count}}s后重新获取</a>
            </div>

            <a href="javascript:;" @click="Submit" class="register_but">登陆</a>
        </div>
    </div>
</template>

<script>
    import {Login, Msg} from '@/api/signin'
    import { Message } from 'element-ui'
    import util from '@/libs/util'
    import {GeetestVerify} from '@/plugins/geetest'

    export default {
        name: "user",
        data() {
            return {
                username: "",
                password: "",
                mobile: "",
                code: "",
                Verify: {
                    show: false,
                    count: 0,
                    key: 'count-down',
                    success: {
                        username: false,
                        password: false,
                        mobile: false,
                        code: false,
                    },
                    interval: null,
                    sign: false
                },
            }
        },

        methods: {
            /**
             * 提交
             * @constructor
             */
            Submit() {
                if (!this.username) {
                    return Message("请填写用户名");
                }
                if (!this.password) {
                    return Message("请填写密码");
                }
                if (!this.$util.pattern.mobile.test(this.mobile)) {
                    return Message("请填写正确的手机号码");
                }
                if (!this.code) {
                    return Message("请填写短信验证码");
                }

                let thisS = this;

                // 提交
                Login({
                    username: thisS.username,
                    password: thisS.password,
                    mobile: thisS.mobile,
                    code: thisS.code,
                }).then(data => {
                    for (var i in data) {
                        util.cookies.set(
                            i,
                            data[i],
                            {expires: 24 * 3600 * 2}
                        );
                    }

                    location.href = '/admin/manage_ev123.php';
                });
            },

            /**
             * 获取短信验证码
             * @constructor
             */
            GetPhoneCode() {
                if (!this.username) {
                    return Message("请填写用户名");
                }
                if (!this.password) {
                    return Message("请填写密码");
                }
                if (!this.$util.pattern.password.test(this.mobile)) {
                    return Message("请填写正确的手机号码");
                }
                let thisS = this;

                GeetestVerify({
                    GeetestInit: (captchaObj) => {
                        captchaObj.reset();
                    },
                    Unique: (new Date()).valueOf() + Math.random() + 'login',
                    VerifySuccess: (data) => {
                        Msg({
                            ...data,
                            mobile: thisS.mobile,
                        }).then(data => {
                            if (!data) {
                                return false;
                            }
                            Message("发送成功");
                            thisS.CountDown();
                        });
                    }
                });
            },

            /**
             * 倒计时
             * @constructor
             */
            CountDown() {
                let
                    thisS = this,
                    interVal = setInterval(function() {
                        thisS.Verify.count = util.cookies.get(thisS.Verify.key) || 60;
                        if (thisS.Verify.count <= 0) {
                            util.cookies.remove(thisS.Verify.key);
                            clearInterval(interVal);
                            return false;
                        }

                        thisS.Verify.count -= 1;
                        util.cookies.set(thisS.Verify.key, thisS.Verify.count, {
                            expires: thisS.Verify.count
                        });
                    }, 1000)
            }
        }
    }
</script>
