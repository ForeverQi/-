String.prototype.gblen = function () {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
};
import cookies from './util.cookies'
import pattern from './util.pattern'
import functions from "./util.functions";
import chat from "./util.chat";
import shopVideo from "./util.shopVideo";
import aliyun from "./util.aliyun";
import app from "./util.app";
import pay from "./util.pay";
import init from "./util.init";
import variable from "./util.variable";
import wechat from "./util.wechat";
import storage from "./util.localStorage";
import areas from "./util.areas";

export default {
    cookies,
    pattern,
    functions,
    chat,
    shopVideo,
    aliyun,
    init,
    pay,
    app,
    variable,
    wechat,
    storage,
    areas
}
