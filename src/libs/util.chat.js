import router from '@/router'
import store from '@/store'
import util from '@/libs/util'
import Hint from '@/plugins/hint'

const chat = {
    /**
     * 聊天接口域名
     * @returns {string}
     */
    api() {
        if (location.host.indexOf("localhost:") === 0) {
            return "ws://123.57.58.99:12306";
        }

        return "ws://123.57.58.99:12306";
    },

    /**
     * 登录信息
     */
    login() {
        return {
            ev_userid: util.cookies.get("ev_userid"),
            zz_userid: util.cookies.get("zz_userid"),
            user_type: 3,
            type: 'customer',
        };
    },

    /**
     * 初始化
     * @param callback
     * @param thisS
     */
    init(callback, thisS) {
        if (!thisS.$route.query.username) {
            return Hint.Alert({
                title: '提示',
                message: '用户名参数错误'
            }).then(() => {
                location.href = '/dom/denglu.php?username=shenyue&wap=1';
            });
        }

        if (!chat.login().ev_userid || !chat.login().zz_userid) {
            return Hint.Alert({
                title: '提示',
                message: '身份信息已过期，请重新登录'
            }).then(() => {
                location.href = '/dom/denglu.php?username=shenyue&wap=1';
            });
        }

        try {
            if (!store.getters.chat.connection || store.getters.chat.connection.readyState !== 1) {
                store.dispatch("chat/SetConnection", {
                    // 连接对象
                    connection: new WebSocket(chat.api()),
                    callback() {
                        // 连接成功
                        store.getters.chat.connection.onopen = () => {
                            // 第一次连接成功以后 发送身份标识 (客户)
                            chat.identity();
                        };

                        // 接收消息
                        store.getters.chat.connection.onmessage = event => {
                            chat.onmessage(event);
                        };

                        // error
                        store.getters.chat.connection.error = ev => {
                            console.log('通信错误', ev)
                        };

                        // 连接错误 关闭连接
                        store.getters.chat.connection.onclose = () => {
                            Hint.Confirm({
                                title: '提示',
                                message: '您与服务器已断开，点击确定重新连接'
                            }).then(() => {
                                chat.init({}, thisS);
                            })
                        };

                        //
                        "function" === typeof callback && callback()
                    }
                })
            }
        } catch (e) {
            Hint.Confirm({
                title: '提示',
                message: '您的设备不支持websocket，请您将系统升级到更高的版本'
            }).then(() => {
                router.push("/");
            })
        }
    },

    /**
     * params
     * @param param
     * @returns {{uid: *, user_type: number, receiver_user_type: (number|string), receiver_uid: (number|string), user_id: *, type: string, receiver_type: string}}
     */
    params(param = {}) {
        return {
            // 当前 客户身份
            type: chat.login().type,
            user_type: chat.login().user_type,
            uid: chat.login().zz_userid,
            user_id: chat.login().ev_userid,

            // 接收者
            receiver_uid: param.receiver_uid || store.getters.chat.server.uid,
            // 接收者 客户身份 app 默认客户
            receiver_user_type: param.receiver_user_type || store.getters.chat.server.user_type,
            receiver_type: "server",
        };
    },

    /**
     * 发送消息
     * @param param
     * @returns {*|boolean}
     */
    send(param) {
        if (!param.method) {
            return Hint.Msg({message: '参数错误'});
        }

        param.data = param.data ? param.data : {};

        let tmp = chat.params(param);
        param.data = {
            ...param.data,
            ...tmp
        };

        // content
        param.data.content = "string" === typeof param.data.content
            ? util.chat.MessageFilter(param.data.content || '')
            : param.data.content
        ;

        store.getters.chat.connection.send(
            JSON.stringify({
                data: param.data || {},
                method: param.method,
                user_id: chat.login().ev_userid,
                timestamp: (new Date()).valueOf() / 1000
            })
        );
    },

    /**
     * 当前登陆者身份信息
     */
    identity() {
        chat.send({
            // 除此建立连接
            method: 'connection'
        });
    },

    /**
     * 接收消息
     * @param event
     */
    onmessage(event) {
        let
            data = JSON.parse(event.data),
            method = data.method,
            code = data.method
        ;

        "function" === typeof store.getters.chat.eventMessage[method] && store.getters.chat.eventMessage[method](data)
    },

    /**
     * 客服分配
     */
    issue() {
        chat.send({
            method: 'issue'
        });

        /*const interval = setInterval(function () {
            chat.send({
                method: 'issue'
            });
        }, 2000);

        store.dispatch("chat/SetIssueInterval", {
            interval: interval
        });*/
    },

    /**
     * 设置心跳
     */
    heartBeat() {
        if (store.getters.chat.connection.readyState === 1) {
            /*store.getters.chat.connection.send({
                method: "heart-beat"
            });*/
            chat.send({
                method: "heart-beat"
            });
        }
    },

    // 设置rem
    setRem() {
        (function (x, min, max) {
            min = min || 320;
            var docEl = document.documentElement,
                clientWidth = null,
                countFun = function () {
                    clientWidth = Math.max(docEl.clientWidth, min);
                    clientWidth = max ? Math.min(clientWidth, max) : clientWidth;
                    if (clientWidth) {
                        docEl.style.fontSize = 100 * (clientWidth / x) + 'px';
                    }
                };
            window.addEventListener('resize', countFun, false);
            countFun();
        })(750, 320, 750)
    },

    /**
     * 检测文字消息
     * @param str
     * @returns {number}
     * @constructor
     */
    MsgType(str) {
        if (str.search(/<img /i) >= 0) {
            // 图文消息
            return 2;
        }

        // 文字或者表情消息
        return 0;
    },

    /**
     * 替换消息内容
     * @param content
     * @returns {void | string}
     * @constructor
     */
    MessageFilter(content) {
        content = content.replace(/<div><br><\/div>/g, function (match, pos, orginText) {
            return "\r\n";
        });

        return content.replace(/(^((\r\n)|(\r)|(\n))|((\r\n)|(\r)|(\n))$)/g, '');
    },

    /**
     * 会话记录时间
     * @param list
     * @param userinfo
     * @returns {[]}
     * @constructor
     */
    HistoryDateMerge(list, userinfo = {customer: {}, server: {}}) {
        let
            data = {},
            day = 24 * 3600 * 1000,
            today = util.functions.FormatDate(new Date, "yyyy-MM-dd"),
            yesterday = util.functions.FormatDate(new Date((new Date).valueOf() - day), "yyyy-MM-dd"),
            beforeYesterday = util.functions.FormatDate(new Date((new Date).valueOf() - day * 2), "yyyy-MM-dd")
        ;

        list.forEach(function (value, index) {
            let date = util.functions.FormatDate(new Date(value.date), "yyyy-MM-dd");
            if (!data[date]) {
                data[date] = [];
            }

            data[date].push(value);
        });

        for (let i in data) {
            let tmp = 0;
            data[i].forEach(function (item, key) {
                let str = '';
                if (i == today) {
                    str = "今天";
                } else if (i == yesterday) {
                    str = "昨天";
                } else if (i == beforeYesterday) {
                    str = "昨天";
                } else {
                    if (Math.ceil((new Date(i)).valueOf() - (new Date(today)) / day) <= 7) {
                        str = '星期' + util.functions.week((new Date(i)).getDay())
                    } else {
                        str = i;
                    }
                }

                let
                    arr = item.date.split(" "),
                    timestamp = (new Date(item.date)).valueOf()
                ;

                item.timer = '';
                if (!tmp) {
                    item.timer = str + " " +  arr[1];
                    tmp = timestamp;
                } else {
                    // 按小时显示时间
                    // console.log(Math.abs(tmp - timestamp) <= 3600000)
                    if (Math.abs(tmp - timestamp) >= 3600000) {
                        item.timer = arr[1];
                        tmp = timestamp;
                    }
                }
            });
        }

        let res = [];
        for (let i in data) {
            for (let n in data[i]) {
                let item = data[i][n];
                // 用户头像
                item.head = (item.type == 'customer'
                        ? userinfo.customer.head
                        : userinfo.server.head
                ) || '../../../../assets/image/chat/user_photo.png';
                res.push(item);
            }
        }

        return res;
    }
}

export default chat
