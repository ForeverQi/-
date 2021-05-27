import router from '@/router'
import store from '@/store'
import util from '@/libs/util'
import Hint from '@/plugins/hint'

const video = {
    /**
     * 检测登录
     * @param params
     * @returns {Promise<T | never>}
     */
    checkLogin(params = {}) {
        if (params.token) {
            util.cookies.set(process.env.VUE_APP_TOKEN, params.token, {
                expires: 24 * 3600 * 2,
                path: '/'
            });
        }

        if (!util.cookies.get(process.env.VUE_APP_TOKEN)) {
            return Hint.Alert({
                message: "登录超时"
            }).then(() => {
                router.push("/shop/bac/login")
            });
        }
    },

    /**
     * 底部高度
     */
    footerHeight() {
        util.app.PhoneInfomation({
            callback: function (res) {
                // paddingBottom = 80
                if (
                    util.functions.inArray(res, [
                        "iPhone X",
                        "iPhone X",
                        "iPhone XR",
                        "iPhone XS",
                        "iPhone XS Max",
                        "iPhone XS Max",
                        "iPhone 11",
                        "iPhone 11 Pro",
                        "iPhone 11 Pro Max",
                    ])
                ) {
                    this.$util.variable.Set({
                        key: "footerHeight",
                        val: "80px"
                    });
                }
            }
        });
    },

    /**
     * 商家助手用户名
     * @returns {*}
     */
    username(username) {
        if (!username) {
            username = util.functions.GetQueryString('username');
        }
        if (username === null) {
            username = util.cookies.get("app-username");
        } else {
            util.cookies.set("app-username", username, {
                expires: 24 * 3600 * 360,
                path: '/'
            });
        }

        return username;
    },

    /**
     * 视频详细页连接
     * @param id
     * @returns {string}
     */
    detailUrl(id) {
        return '/shop/video/index?app=' + util.app.Platform() + '&username=' + video.username() + '&id=' + id;
    }
};

export default video
