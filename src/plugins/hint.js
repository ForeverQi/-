import util from "../libs/util";
import { Toast } from 'vant';
import { Dialog } from 'vant';

export default {
    /**
     * alert
     * @param data
     * @returns {Promise<DialogAction>}
     * @constructor
     */
    Alert(data = {title: "提示", message: ""}) {
        return Dialog.alert({
            title: data.title,
            message: data.message
        });
    },

    /**
     * 确认弹窗
     * @returns {Promise<DialogAction>}
     * @constructor
     */
    Confirm(data = {title: "提示", message: "",confirmButtonText:"",cancelButtonText:"",className:""}) {
        return Dialog.confirm({
            title: data.title,
            message: data.message,
            confirmButtonText:data.confirmButtonText,
            cancelButtonText:data.cancelButtonText,
            className:data.className
        });
    },

    /**
     * 轻提示
     * @param data
     * @returns {VanToast}
     * @constructor
     */
    Msg(data = {message: '参数错误'}) {
        return Toast(data.message);
    }
}
