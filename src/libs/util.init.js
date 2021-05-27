import router from '@/router'
import store from '@/store'
import { Toast } from 'vant';
import { Dialog } from 'vant';
import util from "./util";

const init = {
    /**
     * 项目初始化
     * @param key
     * @returns {*|void}
     */
    siteInit(key) {
        let str = key.toLowerCase();
        switch (str) {
            case "chat":
                return util.chat.setRem();
                // return util.functions.setRem(750, 320);
            case "site":
            case "shop":
            case "404":
                window.addEventListener('resize', function(){
                    util.functions.setRem(750, 100);
                }, false);
                util.functions.setRem(750, 100);
                break;
        }
    }
};

export default init
