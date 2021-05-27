<template>
    <div class="box">
        <div class="ban">
            <div class="logo"><img src="../../../static/images/login/logo.jpg" alt=""></div>
            <div class="wave-box">
                <!-- <div v-for="i in 4"><img src="../../../static/images/login/wave.png" alt=""></div> -->
                <div class="wave wave-1"></div>
                <div class="wave wave-2"></div>
                <div class="wave wave-3"></div>
            </div>
        </div>
        <p class="company">
            <span>
                <hr /><font>登录商家助手</font><hr />
            </span>
        </p>
        <div class="form">
            <div class="form-ctrl">
                <van-icon name="user-circle-o" />
                <input type="text" name="username" v-model="username" placeholder="请输入用户名" />
            </div>
            <div class="form-ctrl">
                <van-icon name="more-o" />
                <input type="password" name="password" v-model="password" placeholder="请输入密码" />
            </div>
            <div class="form-btn">
                <a href="javascript:;" class="login" @click="Login">登录</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { login } from '@/api/shop/index'
    import Hint from '@/plugins/hint'
    import util from '@/libs/util'

    export default {
        name: "detail",
        data() {
            return {
                username: '',
                password: '',
                type: 0
            }
        },
        mounted() {
            let thisS = this;
            /* $(function () {
                $(".wave img").each(function (index, value) {
                    let ele = $(this);
                    ele.stop();
                    thisS.Wave(ele, (index + 1) * 5000)
                });
            }); */
        },
        methods: {
            /**
             * logo 下波浪效果
             * @param ele
             * @param speed
             * @constructor
             */
            Wave(ele, speed) {
                let
                    thisS = this,
                    wH = $(window).width()
                ;

                ele.animate({"margin-left": - ele.width() + wH}, speed, function () {
                    ele.animate({"margin-left": 0}, speed, function () {
                        thisS.Wave(ele, speed);
                    });
                });
            },

            /**
             * 登录商家助手
             * @returns {VanToast}
             * @constructor
             */
            Login() {
                if (!this.username) {
                    return Hint.Msg({
                        message: "请填写正确的用户名"
                    });
                }

                if (!this.password) {
                    return Hint.Msg({
                        message: "请填写正确的密码"
                    });
                }

                login({
                    username: this.username,
                    password: this.password,
                    type: this.type
                }).then(res => {
                    util.cookies.set(process.env.VUE_APP_TOKEN, res.token, {
                        expires: 24 * 3600 * 2,
                        path: '/'
                    });
                    util.cookies.set("username", res.username, {
                        expires: 24 * 3600 * 2,
                        path: '/'
                    });

                    this.$router.push({
                        path: "/shop/bac/video/index"
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .ban {
        width: 100%;
        position: relative;
    }

    .logo img {
        width: 100%;
    }

    .wave {
        height: 60px;
        position: absolute;
        bottom: 0;
        z-index: 1;
        width: 100%;
    }

    .wave div {
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
    }

    .company {
        font-size: 16px;
        line-height: 32px;
    }

    .company span {
        margin: 0 auto;
        width: 4rem;
        display: flex;
        justify-content: center;
    }

    span hr {
        height: 1px;
        width: 20%;
        background-color: #62A5F8;
        border: none;
        margin: 15px 0;
    }

    span font {
        width: 60%;
        text-align: center;
        color: #000;
    }

    .form {
        width: 100%;
        overflow: hidden;
    }

    .form-ctrl {
        width: 6rem;
        height: .9rem;
        margin: 0 auto;
        border-bottom: 1px solid #ededed;
        padding-top: .2rem;
    }

    .form-ctrl i {
        font-size: .4rem;
        font-weight: bold;
    }

    .form-ctrl input {
        border: 0;
        height: .6rem;
        width: 5.3rem;
    }

    .form-btn {
        width: 6rem;
        margin: 0 auto;
    }

    .login {
        display: block;
        color: #008fff;
        font-size: 16px;
        background-color: #FFF;
        border: 1px solid #008fff;
        border-radius: 25px;
        text-align: center;
        padding: 10px 0;
        margin-top: 1.2rem;
        -webkit-box-shadow: 0 5px 6px #c6edff;
        -moz-box-shadow: 0 5px 6px #c6edff;
        box-shadow: 0 5px 6px #c6edff;
    }

    @keyframes move_wave {
            0% {
                background-position: 0% 0%;
            }
            25% {
                background-position: 30% 5%;
            }
            50% {
                background-position: 50% 15%;
            }
            75% {
                background-position: 70% 5%;
            }
            100% {
                background-position: 100% 0%;
            }
        }
        .wave{
            background-image:url('images/wave.png');
            height: 60px;
            position: absolute;
            left: 0;
            width: 100%;
            bottom: 0;
            background-position: 0 bottom;
            background-repeat: no-repeat;
            animation-name: move_wave;
            animation-direction:alternate;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }
        .wave-1{
            background-position: 0 bottom;
            z-index: 2;
            animation-duration: 5s;
            animation-delay: 0;
        }
        .wave-2{
            background-position: -50% bottom;
            z-index: 3;
            animation-duration: 7s;
            animation-delay: .2s;
        }
        .wave-3{
            background-position: -100% bottom;
            z-index: 4;
            animation-duration: 11s;
            animation-delay: .1s;
        }
</style>
