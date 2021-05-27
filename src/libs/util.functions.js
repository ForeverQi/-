import util from "./util";
import router from "@/router";
const functions = {
    /**
     * 复制文本
     * @param selector
     * @param f
     */
    copyText: function(selector, f) {
        selector.select();
        document.execCommand("copy");
        if (typeof f === "function" && f) {
            f(selector.val());
        }
    },

    /**
     * 获取主域
     * @returns {string}
     * @constructor
     */
    GetMainHost() {
        let key = `mh_${Math.random()}`,
            keyR = new RegExp(`(^|;)\\s*${key}=12345`),
            expiredTime = new Date(0),
            domain = document.domain,
            domainList = domain.split("."),
            urlItems = [];
        urlItems.unshift(domainList.pop());
        while (domainList.length) {
            urlItems.unshift(domainList.pop());
            let mainHost = urlItems.join(".");
            let cookie = `${key}=${12345};domain=.${mainHost}`;

            document.cookie = cookie;
            if (keyR.test(document.cookie)) {
                document.cookie = `${cookie};expires=${expiredTime}`;
                return mainHost;
            }
        }
    },

    /**
     * 获取对象keys
     * @param data
     * @returns {[]}
     * @constructor
     */
    Keys(data) {
        let keys = [];
        for (let i in data) {
            keys.push(i);
        }
        return keys;
    },

    /**
     * 获取对象长度
     * @param data
     * @returns {[]}
     * @constructor
     */
    Len(data) {
        return functions.Keys(data).length;
    },

    /**
     * in array []
     * @param search
     * @param array
     * @returns {boolean}
     * @constructor
     */
    InArray(search, array) {
        for (let i in array) {
            if (array[i] == search) {
                return true;
            }
        }
        return false;
    },

    /**
     * 重组
     * @param arr
     * @param column
     * @constructor
     */
    ArrayCombine(arr, column) {
        let data = {};
        for (let i in arr) {
            data[arr[i][column]] = arr[i];
        }

        return data;
    },

    /**
     * @param origin
     * @param data
     * @param key 插入的键值
     * @param type 类型 o 对象 a 数组
     * @constructor
     */
    RouterMerge(origin, data, key, type) {
        for (let n in origin) {
            for (let i in origin[n]) {
                if (i == key) {
                    if (type == "a") {
                        // 数组
                        origin[n][i] = [...origin[n][i], ...data];
                    } else {
                        // 对象
                        origin[n][i] = {
                            ...origin[n][i],
                            ...data
                        };
                    }
                }
            }
        }

        return origin;
    },

    /**
     * axios 数据转化
     * @param obj
     * @returns {URLSearchParams}
     * @constructor
     */
    FormatData: function(obj) {
        let params = new URLSearchParams();
        for (const variable in obj) {
            if (obj["" + variable] !== "" && obj["" + variable] !== undefined && obj["" + variable] !== null) {
                params.append("" + variable, obj["" + variable]);
            }
        }
        return params;
    },

    /**
     * 格式化日期 FormatDate(date, yyyy-MM-dd hh:mm);
     * @param date
     * @param fmt
     * @returns {string}
     * @constructor
     */
    FormatDate: function formatDate(date, fmt = "yyyy-MM-dd") {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        let o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + "";
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : functions.padLeftZero(str));
            }
        }
        return fmt;
    },

    /**
     * 填充00
     * @param str
     * @returns {string}
     */
    padLeftZero: function(str) {
        return ("00" + str).substr(str.length);
    },

    /**
     * 导出
     * @param worksheet
     * @param title
     * @param jsonData
     * @constructor
     */
    Excel: function(worksheet, title, jsonData) {
        //列标题
        let arr = [];
        for (let i in title) {
            arr.push(`
                <td>${title[i]}</td>
            `);
        }
        let str = `<tr>${str}</tr>`;

        for (let i = 0; i < jsonData.length; i++) {
            str += "<tr>";
            for (let n in jsonData[i]) {
                str += `<td>${jsonData[i][n] + "\t"}</td>`;
            }
            str += "</tr>";
        }

        // 下载的表格模板数据
        let template = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
                <head>
                    <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
                    <x:Name>worksheet</x:Name>
                    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
                    </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
                </head>
                <body><table>${str}</table></body>
            </html>
        `;

        // 下载模板
        window.open("data:application/vnd.ms-excel;base64," + functions.base64(template));
    },

    /**
     *
     * @param s
     * @returns {string}
     */
    base64(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
    },

    /**
     * 项目别名表示
     * @param name
     * @returns {string | string}
     */
    proKey(name) {
        let arr = name
            .replace(process.env.VUE_APP_FRONTEND_ALIAS, "")
            .replace(/^-/, "")
            .split("-");

        return arr[0] || "";
    },

    /**
     * 字体大小转换
     * @param pwidth
     * @param prem
     */
    setRem(pwidth, prem) {
        let html = document.getElementsByTagName("html")[0],
            width = document.body.clientWidth || document.documentElement.clientWidth;
        html.style.fontSize = (width / pwidth) * prem + "px";
    },

    /**
     * 星期
     * @param week
     * @returns {string}
     */
    week(week) {
        switch (week) {
            case 0:
                return "日";
            case 1:
                return "一";
            case 2:
                return "二";
            case 3:
                return "三";
            case 4:
                return "四";
            case 5:
                return "五";
            case 6:
                return "六";
        }
    },

    /**
     * 获取网站用户名
     * @returns {*|string}
     * @constructor
     */
    GetUName() {
        return util.cookies.get("username") || "";
    },

    /**
     * 返回上一层
     * @param sign
     * @param _router
     * @returns {boolean}
     * @constructor
     * @description 跳转商家助手首页 $util.functions.GoBack('top', $route)  返回上一层 $util.functions.GoBack()
     */
    GoBack(sign, _router) {
        // 首页跳转
        if (sign == "top") {
            let token = "";
            if (_router && _router.query.token) {
                token = _router.query.token;
            }

            if (!token) {
                token = util.cookies.get(process.env.VUE_APP_TOKEN);
            }

            // 显示底部
            util.app.Shop.ShowFooterMenu(1);

            if (location.host == "m.evyun.cn") {
                location.href = "https://sjzstest.dlszywz.cn?token=" + token;
            } else {
                location.href = "https://sjzs.dlszywz.cn?token=" + token;
            }

            return false;
        }

        if (history.length > 0) {
            history.back();
        }
    },

    /**
     * 获取URL参数
     * @param key
     * @param url
     * @returns {*}
     * @constructor
     */
    GetQueryString(key, url) {
        let r = (url || window.location).search.substr(1).match(new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"));

        if (r != null) {
            return decodeURI(r[2]);
        }

        return null;
    },

    /**
     * 检测是否是微信浏览器
     * @returns {boolean}
     * @constructor
     */
    IsWX() {
        return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger" ? true : false;
    },

    /**
     * 组装formdata
     * @param {*} fileDom
     */
    assembleForm(fileDom) {
        util.variable.ISFormData = true;
        let formData = new FormData(); // 创建form对象
        formData.append("file-size", fileDom.files[0].size);
        formData.append("extension", JSON.stringify(["jpg", "gif", "png", "jpeg", ""]));
        formData.append("unext", "1");
        /* formData.append('extension[1]', 'jpg');
        formData.append('extension[2]', 'gif');
        formData.append('extension[3]', 'png');
        formData.append('extension[4]', 'jpeg');
        formData.append('extension[5]', ''); */
        formData.append("name", fileDom.name);
        formData.append(fileDom.name, fileDom.files[0]);
        return formData;
    },
    /**
     * URI encdoe 时间
     * @return {string}
     */
    URITimestamp() {
        let date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1, //月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        return `${year}-${month}-${day}T${hour}%3A${min}%3A${sec}Z`;
    },
    /**
     * @Date: 2020-02-20 21:15:49
     * @LastEditors: qwguo
     * @LastEditTime: Do not edit
     * @description: 获取给数的比例
     * @param {type} 参数说明
     * @return: 返回值
     */
    getScale() {
        let getArr = Array.from(arguments);
        if (getArr.length < 2) {
            return getArr.length === 1 ? getArr[0] : "";
        }
        let factorFn = function(arr) {
                let gcd = function(a, b) {
                    return b === 0 ? a : gcd(b, a % b);
                };
                let arr_ = arr.concat();
                while (arr_.length > 1) {
                    arr_.push(gcd(arr_.pop(), arr_.pop()));
                }
                return arr_[0];
            },
            maxFactor = factorFn(getArr),
            str = "";
        getArr.forEach((v, i) => {
            str += v / maxFactor;
            str += i !== getArr.length - 1 ? ":" : "";
        });
        return str;
    },

    /**
     * 环境检测
     * @returns {string}
     */
    environment() {
        if (location.host.indexOf("localhost:") === 0 || location.host.indexOf("m.evyun.cn") === 0) {
            return "development";
        } else {
            return "production";
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
            if (false && String(value).replace(/(^\s*)|(\s*$)/g, "").length == 0) {
                return false;
            } else {
                return true;
            }
        }
    },

    /**
     * 判断是ios还是安卓
     * @returns {String}
     */
    appSource() {
        const u = navigator.userAgent;
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isiOS) {
            return "ios";
        } else {
            return "andriod";
        }
    },

    /**
     * @Date: 2020-09-09 16:41:05
     * @LastEditors: zhouqi
     * @description:  将价格的小数部分和整数部分分离出来
     * @param {price} 价格
     * @param {type} 1:不需要加.00，0：需要加.00,默认加.00
     * @return {Object}
     */

    separatePrice(price) {
        let val = String(price),
            priceJson = {};
        val = val.split(".");
        if (val[1] == undefined) {
            val[1] = "00";
        }
        priceJson.left = val[0];
        priceJson.right = val[1];
        return priceJson;
    },

    /**
     * @Date: 2020-11-10 16:07:16
     * @LastEditors: zhouqi
     * @description: 获取百度地图位置授权之后的详细地址，不包含省市区
     * @param {*} {res} 地图返回的json对象
     * @return {*}
     */

    getMapValue(res) {
        var regex = /^(北京|天津|重庆|上海|香港特别行政区|澳门特别行政区)/,
            addrInfo2 = {},
            that = this;
        var REGION_PROVINCE = [];
        var addressBean = {
            REGION_PROVINCE: null,
            REGION_COUNTRY: null,
            REGION_CITY: null,
            ADDRESS: null
        };

        function regexAddressBean(address, addressBean) {
            let addressSclice = address.substring(0, 3);
            // let addressSclice = address;
            if (addressSclice.indexOf("州") != -1) {
                regex = /^(.*?[市盟]|.*?地区|.*?特别行政区)(.*?[市区县旗])(.*?)$/g;
            } else {
                regex = /^(.*?[市州盟]|.*?地区|.*?特别行政区)(.*?[市区县旗])(.*?)$/g;
            }
            var addxress = regex.exec(address);
            if (addxress != null) {
                addressBean.ADDRESS = addxress[3] + "" + res.title;
            } else {
                regex = /^(.*?[市州盟]|.*?地区|.*?特别行政区|.*?市|.*?自治县|.*?县)(.*?)$/g;
                addxress = regex.exec(address);
                addressBean.ADDRESS = res.title;
            }
            addressBean.REGION_CITY = addxress[1];
            addressBean.REGION_COUNTRY = addxress[2];
            // 对海南省特殊的自治县特殊处理
            if (
                addressBean.REGION_CITY == "白沙黎族自治县" ||
                addressBean.REGION_CITY == "昌江黎族自治县" ||
                addressBean.REGION_CITY == "乐东黎族自治县" ||
                addressBean.REGION_CITY == "陵水黎族自治县" ||
                addressBean.REGION_CITY == "保亭黎族苗族自治县" ||
                addressBean.REGION_CITY == "五指山市" ||
                addressBean.REGION_CITY == "琼海市" ||
                addressBean.REGION_CITY == "儋州市" ||
                addressBean.REGION_CITY == "文昌市" ||
                addressBean.REGION_CITY == "万宁市" ||
                addressBean.REGION_CITY == "东方市" ||
                addressBean.REGION_CITY == "定安县" ||
                addressBean.REGION_CITY == "屯昌县" ||
                addressBean.REGION_CITY == "澄迈县" ||
                addressBean.REGION_CITY == "临高县"
            ) {
                addressBean.REGION_COUNTRY = "";
                that.hainanThree = addxress[2];
            }
        }

        if (!(REGION_PROVINCE = regex.exec(res.address))) {
            regex = /^(.*?(省|自治区))(.*?)$/;
            REGION_PROVINCE = regex.exec(res.address);
            addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
            regexAddressBean(REGION_PROVINCE[3], addressBean);
        } else {
            let addressValue;
            // addressValue = res.address.substring(3, res.address.length - 1);
            addressValue = res.address.substring(0, res.address.length - 1);
            addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
            regexAddressBean(addressValue, addressBean);
        }
        if (addrInfo) {
            addrInfo.address_city =
                addressBean.REGION_PROVINCE + " " + addressBean.REGION_CITY + " " + addressBean.REGION_COUNTRY;
            addrInfo.address = addressBean.ADDRESS;
        } else {
            var addrInfo = {
                address_city:
                    addressBean.REGION_PROVINCE + " " + addressBean.REGION_CITY + " " + addressBean.REGION_COUNTRY,
                address: addressBean.ADDRESS
            };
        }
        addrInfo2.province = addressBean.REGION_PROVINCE;
        addrInfo2.city = addressBean.REGION_CITY;
        addrInfo2.district = addressBean.REGION_COUNTRY;
        if (!that.ifHaveFun(addrInfo.address_city)) {
            addrInfo.address_city = "";
        }
        if (!that.ifHaveFun(addrInfo.address)) {
            addrInfo.address = "";
        }
        // 海南省的自治县特殊处理
        if (
            addressBean.REGION_CITY == "白沙黎族自治县" ||
            addressBean.REGION_CITY == "昌江黎族自治县" ||
            addressBean.REGION_CITY == "乐东黎族自治县" ||
            addressBean.REGION_CITY == "陵水黎族自治县" ||
            addressBean.REGION_CITY == "保亭黎族苗族自治县" ||
            addressBean.REGION_CITY == "五指山市" ||
            addressBean.REGION_CITY == "琼海市" ||
            addressBean.REGION_CITY == "儋州市" ||
            addressBean.REGION_CITY == "文昌市" ||
            addressBean.REGION_CITY == "万宁市" ||
            addressBean.REGION_CITY == "东方市" ||
            addressBean.REGION_CITY == "定安县" ||
            addressBean.REGION_CITY == "屯昌县" ||
            addressBean.REGION_CITY == "澄迈县" ||
            addressBean.REGION_CITY == "临高县"
        ) {
            addrInfo.address = (that.ifHaveFun(that.hainanThree) ? that.hainanThree : "") + addrInfo.address;
        }
        // that.cityValue = addrInfo.address_city;
        // that.addressValue = addrInfo.address;
        // that.addrInfo2 = addrInfo2;
        let valJson = {
            cityValue: addrInfo.address_city,
            addressValue: addrInfo.address,
            addrInfo2: addrInfo2
        };
        return valJson;
    },

    /**
     * @Date: 2020-11-17 15:43:09
     * @LastEditors: zhouqi
     * @description: 倒序排列对象
     * @param {obj} 传入的对象
     * @return {*}
     */

    sortObj(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push([obj[i], i]);
        }
        arr.reverse();
        var len = arr.length;
        var obj = {};
        for (var i = 0; i < len; i++) {
            obj[arr[i][1]] = arr[i][0];
        }
        return obj;
    },

    /**
     * @Date: 2020-11-24 14:42:57
     * @LastEditors: zhouqi
     * @description: 获取色系函数
     * @param {*} value:色系值
     * @return {*}
     */
    colorFun(value) {
        let theme = "";
        switch (value) {
            case "#469cb7":
                theme = "color1";
                break;
            case "#b64d4a":
                theme = "color2";
                break;
            case "#2f5e66":
                theme = "color3";
                break;
            case "#77a0a6":
                theme = "color4";
                break;
            case "#7f5935":
                theme = "color5";
                break;
            case "#a5663b":
                theme = "color6";
                break;
            case "#246b97":
                theme = "color7";
                break;
            case "#4f803f":
                theme = "color8";
                break;
            case "#941761":
                theme = "color9";
                break;
            case "#201712":
                theme = "color10";
                break;
            case "#73a65b":
                theme = "color11";
                break;
            case "#ca528f":
                theme = "color12";
                break;
            case "#1b919f":
                theme = "color13";
                break;
            case "#dd627e":
                theme = "color14";
                break;
            case "#40516d":
                theme = "color15";
                break;
            case "#c78de2":
                theme = "color16";
                break;
            case "#323e2a":
                theme = "color17";
                break;
            case "#2e073e":
                theme = "color18";
                break;
            case "#154d80":
                theme = "color19";
                break;
            case "#65212e":
                theme = "color20";
                break;
            case "#956652":
                theme = "color21";
                break;
            case "#ff4500":
                theme = "color22";
                break;
            case "#fea500":
                theme = "color23";
                break;
            case "#fe0000":
                theme = "color24";
                break;
            case "#1e90ff":
                theme = "color25";
                break;
            case "#7f8000":
                theme = "color26";
                break;
            case "#4682b4":
                theme = "color27";
                break;
            case "#2e8a57":
                theme = "color28";
                break;
            case "#000000":
                theme = "color29";
                break;
            case "#4169e2":
                theme = "color30";
                break;
            case "#ffd601":
                theme = "color31";
                break;
            case "#4b0081":
                theme = "color32";
                break;
            case "#8b4512":
                theme = "color33";
                break;
            case "#ce8540":
                theme = "color34";
                break;
            case "#d3691f":
                theme = "color35";
                break;
            case "#483d8b":
                theme = "color36";
                break;
            case "#ff1494":
                theme = "color37";
                break;
            case "#566b30":
                theme = "color38";
                break;
            case "#8c0000":
                theme = "color39";
                break;
            case "#006401":
                theme = "color40";
                break;
            case "#b8860b":
                theme = "color41";
                break;
            case "#2f4f4e":
                theme = "color42";
                break;
            case "#0000cc":
                theme = "color43";
                break;
            case "#191971":
                theme = "color44";
                break;
            case "#dc133d":
                theme = "color45";
                break;
            case "#81007f":
                theme = "color46";
                break;
        }
        return theme;
    },
    // 色系值改版，通过写在行内实现色系（和小程序一样）
    newColor(value) {
        switch (value) {
            case "#469cb7":
                return {
                    bgcColor1: "rgba(70, 157, 183, 1)",
                    bgcColor2: "rgba(70, 157, 183, 0.6)",
                    bgcColor3: "rgba(70, 157, 183, 0.3)",
                    bgcColor4: "rgba(70, 157, 183, 0.04)",
                    bgcColor5: "rgba(70, 157, 183, 0.1)"
                };
            case "#b64d4a":
                return {
                    bgcColor1: "rgba(183, 76, 74, 1)",
                    bgcColor2: "rgba(183, 76, 74, 0.6)",
                    bgcColor3: "rgba(183, 76, 74, 0.3)",
                    bgcColor4: "rgba(183, 76, 74, 0.04)",
                    bgcColor5: "rgba(183, 76, 74, 0.1)"
                };
            case "#2f5e66":
                return {
                    bgcColor1: "rgba(46, 94, 102, 1)",
                    bgcColor2: "rgba(46, 94, 102, 0.6)",
                    bgcColor3: "rgba(46, 94, 102, 0.3)",
                    bgcColor4: "rgba(46, 94, 102, 0.04)",
                    bgcColor5: "rgba(46, 94, 102, 0.1)"
                };
            case "#77a0a6":
                return {
                    bgcColor1: "rgba(118, 161, 168, 1)",
                    bgcColor2: "rgba(118, 161, 168, 0.6)",
                    bgcColor3: "rgba(118, 161, 168, 0.3)",
                    bgcColor4: "rgba(118, 161, 168, 0.04)",
                    bgcColor5: "rgba(118, 161, 168, 0.1)"
                };
            case "#7f5935":
                return {
                    bgcColor1: "rgba(126, 88, 52, 1)",
                    bgcColor2: "rgba(126, 88, 52, 0.6)",
                    bgcColor3: "rgba(126, 88, 52, 0.3)",
                    bgcColor4: "rgba(126, 88, 52, 0.04)",
                    bgcColor5: "rgba(126, 88, 52, 0.1)"
                };
            case "#a5663b":
                return {
                    bgcColor1: "rgba(165, 102, 58, 1)",
                    bgcColor2: "rgba(165, 102, 58, 0.6)",
                    bgcColor3: "rgba(165, 102, 58, 0.3)",
                    bgcColor4: "rgba(165, 102, 58, 0.04)",
                    bgcColor5: "rgba(165, 102, 58, 0.1)"
                };
            case "#246b97":
                return {
                    bgcColor1: "rgba(36, 106, 151, 1)",
                    bgcColor2: "rgba(36, 106, 151, 0.6)",
                    bgcColor3: "rgba(36, 106, 151, 0.3)",
                    bgcColor4: "rgba(36, 106, 151, 0.04)",
                    bgcColor5: "rgba(36, 106, 151, 0.1)"
                };
            case "#4f803f":
                return {
                    bgcColor1: "rgba(78, 129, 62, 1)",
                    bgcColor2: "rgba(78, 129, 62, 0.6)",
                    bgcColor3: "rgba(78, 129, 62, 0.3)",
                    bgcColor4: "rgba(78, 129, 62, 0.04)",
                    bgcColor5: "rgba(78, 129, 62, 0.1)"
                };
            case "#941761":
                return {
                    bgcColor1: "rgba(149, 22, 96, 1)",
                    bgcColor2: "rgba(149, 22, 96, 0.6)",
                    bgcColor3: "rgba(149, 22, 96, 0.3)",
                    bgcColor4: "rgba(149, 22, 96, 0.04)",
                    bgcColor5: "rgba(149, 22, 96, 0.1)"
                };
            case "#201712":
                return {
                    bgcColor1: "rgba(32, 22, 18, 1)",
                    bgcColor2: "rgba(32, 22, 18, 0.6)",
                    bgcColor3: "rgba(32, 22, 18, 0.3)",
                    bgcColor4: "rgba(32, 22, 18, 0.04)",
                    bgcColor5: "rgba(32, 22, 18, 0.1)"
                };
            case "#73a65b":
                return {
                    bgcColor1: "rgba(114, 167, 90, 1)",
                    bgcColor2: "rgba(114, 167, 90, 0.6)",
                    bgcColor3: "rgba(114, 167, 90, 0.3)",
                    bgcColor4: "rgba(114, 167, 90, 0.04)",
                    bgcColor5: "rgba(114, 167, 90, 0.1)"
                };
            case "#ca528f":
                return {
                    bgcColor1: "rgba(242, 77, 249, 1)",
                    bgcColor2: "rgba(242, 77, 249, 0.6)",
                    bgcColor3: "rgba(242, 77, 249, 0.3)",
                    bgcColor4: "rgba(242, 77, 249, 0.04)",
                    bgcColor5: "rgba(242, 77, 249, 0.1)"
                };
            case "#1b919f":
                return {
                    bgcColor1: "rgba(26, 145, 159, 1)",
                    bgcColor2: "rgba(26, 145, 159, 0.6)",
                    bgcColor3: "rgba(26, 145, 159, 0.3)",
                    bgcColor4: "rgba(26, 145, 159, 0.04)",
                    bgcColor5: "rgba(26, 145, 159, 0.1)"
                };
            case "#dd627e":
                return {
                    bgcColor1: "rgba(221, 99, 126, 1)",
                    bgcColor2: "rgba(221, 99, 126, 0.6)",
                    bgcColor3: "rgba(221, 99, 126, 0.3)",
                    bgcColor4: "rgba(221, 99, 126, 0.04)",
                    bgcColor5: "rgba(221, 99, 126, 0.1)"
                };
            case "#40516d":
                return {
                    bgcColor1: "rgba(64, 80, 108, 1)",
                    bgcColor2: "rgba(64, 80, 108, 0.6)",
                    bgcColor3: "rgba(64, 80, 108, 0.3)",
                    bgcColor4: "rgba(64, 80, 108, 0.04)",
                    bgcColor5: "rgba(64, 80, 108, 0.1)"
                };
            case "#c78de2":
                return {
                    bgcColor1: "rgba(199, 141, 227, 1)",
                    bgcColor2: "rgba(199, 141, 227, 0.6)",
                    bgcColor3: "rgba(199, 141, 227, 0.3)",
                    bgcColor4: "rgba(199, 141, 227, 0.04)",
                    bgcColor5: "rgba(199, 141, 227, 0.1)"
                };
            case "#323e2a":
                return {
                    bgcColor1: "rgba(50, 62, 42, 1)",
                    bgcColor2: "rgba(50, 62, 42, 0.6)",
                    bgcColor3: "rgba(50, 62, 42, 0.3)",
                    bgcColor4: "rgba(50, 62, 42, 0.04)",
                    bgcColor5: "rgba(50, 62, 42, 0.1)"
                };
            case "#2e073e":
                return {
                    bgcColor1: "rgba(46, 6, 62, 1)",
                    bgcColor2: "rgba(46, 6, 62, 0.6)",
                    bgcColor3: "rgba(46, 6, 62, 0.3)",
                    bgcColor4: "rgba(46, 6, 62, 0.04)",
                    bgcColor5: "rgba(46, 6, 62, 0.1)"
                };
            case "#154d80":
                return {
                    bgcColor1: "rgba(20, 76, 129, 1)",
                    bgcColor2: "rgba(20, 76, 129, 0.6)",
                    bgcColor3: "rgba(20, 76, 129, 0.3)",
                    bgcColor4: "rgba(20, 76, 129, 0.04)",
                    bgcColor5: "rgba(20, 76, 129, 0.1)"
                };
            case "#65212e":
                return {
                    bgcColor1: "rgba(100, 32, 46, 1)",
                    bgcColor2: "rgba(100, 32, 46, 0.6)",
                    bgcColor3: "rgba(100, 32, 46, 0.3)",
                    bgcColor4: "rgba(100, 32, 46, 0.04)",
                    bgcColor5: "rgba(100, 32, 46, 0.1)"
                };
            case "#956652":
                return {
                    bgcColor1: "rgba(149, 102, 82, 1)",
                    bgcColor2: "rgba(149, 102, 82, 0.6)",
                    bgcColor3: "rgba(149, 102, 82, 0.3)",
                    bgcColor4: "rgba(149, 102, 82, 0.04)",
                    bgcColor5: "rgba(149, 102, 82, 0.1)"
                };
            case "#ff4500":
                return {
                    bgcColor1: "rgba(255, 78, 0, 1)",
                    bgcColor2: "rgba(255, 161, 11, 1)",
                    bgcColor3: "rgba(255, 173, 119, 1)",
                    bgcColor4: "rgba(255, 248, 239, 1)",
                    bgcColor5: "rgba(255, 248, 239, 0.1)"
                };
            case "#fea500":
                return {
                    bgcColor1: "rgba(255, 165, 0, 1)",
                    bgcColor2: "rgba(255, 165, 0, 0.6)",
                    bgcColor3: "rgba(255, 165, 0, 0.3)",
                    bgcColor4: "rgba(255, 165, 0, 0.04)",
                    bgcColor5: "rgba(255, 165, 0, 0.1)"
                };
            case "#fe0000":
                return {
                    bgcColor1: "rgba(255, 0, 0, 1)",
                    bgcColor2: "rgba(255, 107, 37, 1)",
                    bgcColor3: "rgba(255, 0, 0, 0.3)",
                    bgcColor4: "rgba(255, 0, 0, 0.04)",
                    bgcColor5: "rgba(255, 0, 0, 0.1)"
                };
            case "#1e90ff":
                return {
                    bgcColor1: "rgba(0, 102, 255, 1)",
                    bgcColor2: "rgba(0, 102, 255, 0.7)",
                    bgcColor3: "rgba(30, 145, 255, 0.3)",
                    bgcColor4: "rgba(30, 145, 255, 0.04)",
                    bgcColor5: "rgba(30, 145, 255, 0.1)"
                };

            case "#7f8000":
                return {
                    bgcColor1: "rgba(126, 129, 0, 1)",
                    bgcColor2: "rgba(126, 129, 0, 0.6)",
                    bgcColor3: "rgba(126, 129, 0, 0.3)",
                    bgcColor4: "rgba(126, 129, 0, 0.04)",
                    bgcColor5: "rgba(126, 129, 0, 0.1)"
                };
            case "#4682b4":
                return {
                    bgcColor1: "rgba(70, 131, 181, 1)",
                    bgcColor2: "rgba(70, 131, 181, 0.6)",
                    bgcColor3: "rgba(70, 131, 181, 0.3)",
                    bgcColor4: "rgba(70, 131, 181, 0.04)",
                    bgcColor5: "rgba(70, 131, 181, 0.1)"
                };

            case "#2e8a57":
                return {
                    bgcColor1: "rgba(46, 139, 86, 1)",
                    bgcColor2: "rgba(46, 139, 86, 0.6)",
                    bgcColor3: "rgba(46, 139, 86, 0.3)",
                    bgcColor4: "rgba(46, 139, 86, 0.04)",
                    bgcColor5: "rgba(46, 139, 86, 0.1)"
                };
            case "#000000":
                return {
                    bgcColor1: "rgba(0, 0, 0, 1)",
                    bgcColor2: "rgba(0, 0, 0, 0.6)",
                    bgcColor3: "rgba(0, 0, 0, 0.3)",
                    bgcColor4: "rgba(0, 0, 0, 0.04)",
                    bgcColor5: "rgba(0, 0, 0, 0.1)"
                };

            case "#4169e2":
                return {
                    bgcColor1: "rgba(64, 104, 227, 1)",
                    bgcColor2: "rgba(64, 104, 227, 0.6)",
                    bgcColor3: "rgba(64, 104, 227, 0.3)",
                    bgcColor4: "rgba(64, 104, 227, 0.04)",
                    bgcColor5: "rgba(64, 104, 227, 0.1)"
                };

            case "#ffd601":
                return {
                    bgcColor1: "rgba(255, 215, 0, 1)",
                    bgcColor2: "rgba(255, 215, 0, 0.6)",
                    bgcColor3: "rgba(255, 215, 0, 0.3)",
                    bgcColor4: "rgba(255, 215, 0, 0.04)",
                    bgcColor5: "rgba(255, 215, 0, 0.1)"
                };
            case "#4b0081":
                return {
                    bgcColor1: "rgba(74, 0, 129, 1)",
                    bgcColor2: "rgba(74, 0, 129, 0.6)",
                    bgcColor3: "rgba(74, 0, 129, 0.3)",
                    bgcColor4: "rgba(74, 0, 129, 0.04)",
                    bgcColor5: "rgba(74, 0, 129, 0.1)"
                };

            case "#8b4512":
                return {
                    bgcColor1: "rgba(139, 68, 18, 1)",
                    bgcColor2: "rgba(139, 68, 18, 0.6)",
                    bgcColor3: "rgba(139, 68, 18, 0.3)",
                    bgcColor4: "rgba(139, 68, 18, 0.04)",
                    bgcColor5: "rgba(139, 68, 18, 0.1)"
                };

            case "#ce8540":
                return {
                    bgcColor1: "rgba(207, 133, 64, 1)",
                    bgcColor2: "rgba(207, 133, 64, 0.6)",
                    bgcColor3: "rgba(207, 133, 64, 0.3)",
                    bgcColor4: "rgba(207, 133, 64, 0.04)",
                    bgcColor5: "rgba(207, 133, 64, 0.1)"
                };

            case "#d3691f":
                return {
                    bgcColor1: "rgba(211, 104, 30, 1)",
                    bgcColor2: "rgba(211, 104, 30, 0.6)",
                    bgcColor3: "rgba(211, 104, 30, 0.3)",
                    bgcColor4: "rgba(211, 104, 30, 0.04)",
                    bgcColor5: "rgba(211, 104, 30, 0.1)"
                };

            case "#483d8b":
                return {
                    bgcColor1: "rgba(72, 60, 139, 1)",
                    bgcColor2: "rgba(72, 60, 139, 0.6)",
                    bgcColor3: "rgba(72, 60, 139, 0.3)",
                    bgcColor4: "rgba(72, 60, 139, 0.04)",
                    bgcColor5: "rgba(72, 60, 139, 0.1)"
                };

            case "#ff1494":
                return {
                    bgcColor1: "rgba(255, 20, 149, 1)",
                    bgcColor2: "rgba(255, 20, 149, 0.6)",
                    bgcColor3: "rgba(255, 20, 149, 0.3)",
                    bgcColor4: "rgba(255, 20, 149, 0.04)",
                    bgcColor5: "rgba(255, 20, 149, 0.1)"
                };

            case "#566b30":
                return {
                    bgcColor1: "rgba(86, 106, 48, 1)",
                    bgcColor2: "rgba(86, 106, 48, 0.6)",
                    bgcColor3: "rgba(86, 106, 48, 0.3)",
                    bgcColor4: "rgba(86, 106, 48, 0.04)",
                    bgcColor5: "rgba(86, 106, 48, 0.1)"
                };

            case "#8c0000":
                return {
                    bgcColor1: "rgba(141, 0, 0, 1)",
                    bgcColor2: "rgba(141, 0, 0, 0.6)",
                    bgcColor3: "rgba(141, 0, 0, 0.3)",
                    bgcColor4: "rgba(141, 0, 0, 0.04)",
                    bgcColor5: "rgba(141, 0, 0, 0.1)"
                };

            case "#006401":
                return {
                    bgcColor1: "rgba(0, 100, 0, 1)",
                    bgcColor2: "rgba(0, 100, 0, 0.6)",
                    bgcColor3: "rgba(0, 100, 0, 0.3)",
                    bgcColor4: "rgba(0, 100, 0, 0.04)",
                    bgcColor5: "rgba(0, 100, 0, 0.1)"
                };

            case "#b8860b":
                return {
                    bgcColor1: "rgba(185, 135, 10, 1)",
                    bgcColor2: "rgba(185, 135, 10, 0.6)",
                    bgcColor3: "rgba(185, 135, 10, 0.3)",
                    bgcColor4: "rgba(185, 135, 10, 0.04)",
                    bgcColor5: "rgba(185, 135, 10, 0.1)"
                };

            case "#2f4f4e":
                return {
                    bgcColor1: "rgba(46, 78, 78, 1)",
                    bgcColor2: "rgba(46, 78, 78, 0.6)",
                    bgcColor3: "rgba(46, 78, 78, 0.3)",
                    bgcColor4: "rgba(46, 78, 78, 0.04)",
                    bgcColor5: "rgba(46, 78, 78, 0.1)"
                };

            case "#0000cc":
                return {
                    bgcColor1: "rgba(0, 0, 205, 1)",
                    bgcColor2: "rgba(0, 0, 205, 0.6)",
                    bgcColor3: "rgba(0, 0, 205, 0.3)",
                    bgcColor4: "rgba(0, 0, 205, 0.04)",
                    bgcColor5: "rgba(0, 0, 205, 0.1)"
                };
            case "#191971":
                return {
                    bgcColor1: "rgba(24, 24, 112, 1)",
                    bgcColor2: "rgba(24, 24, 112, 0.6)",
                    bgcColor3: "rgba(24, 24, 112, 0.3)",
                    bgcColor4: "rgba(24, 24, 112, 0.04)",
                    bgcColor5: "rgba(24, 24, 112, 0.1)"
                };
            case "#dc133d":
                return {
                    bgcColor1: "rgba(221, 18, 60, 1)",
                    bgcColor2: "rgba(221, 18, 60, 0.6)",
                    bgcColor3: "rgba(221, 18, 60, 0.3)",
                    bgcColor4: "rgba(221, 18, 60, 0.04)",
                    bgcColor5: "rgba(221, 18, 60, 0.1)"
                };
            case "#81007f":
                return {
                    bgcColor1: "rgba(129, 0, 126, 1)",
                    bgcColor2: "rgba(129, 0, 126, 0.6)",
                    bgcColor3: "rgba(129, 0, 126, 0.3)",
                    bgcColor4: "rgba(129, 0, 126, 0.04)",
                    bgcColor5: "rgba(129, 0, 126, 0.1)"
                };
        }
    },
    // 获取问号后面的值
    getParameter(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    },

    //unit.js
    // 存储当前历史记录点,实现控制手机物理返回键的按钮事件
    pushHistory() {
        let state = { title: "", url: "" };
        window.history.pushState(state, state.title, state.url);
    },
    /**
     * 判断某个值是否在数组内
     * @param value
     * @param arr
     * @returns {boolean}
     */
    in_array(value, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (value == arr[i]) {
                return true;
            }
        }
        return false;
    },
    /**
     * @desc 由经纬度计算两点之间的距离，la为latitude缩写，lo为longitude
     * @param la1 第一个坐标点的纬度
     * @param lo1 第一个坐标点的经度
     * @param la2 第二个坐标点的纬度
     * @param lo2 第二个坐标点的经度
     * @return (int)s   返回距离(单位千米或公里)
     * @tips 注意经度和纬度参数别传反了，一般经度为0~180、纬度为0~90
     */
     distance(la1, lo1, la2, lo2) {
        var La1 = (la1 * Math.PI) / 180.0;
        var La2 = (la2 * Math.PI) / 180.0;
        var La3 = La1 - La2;
        var Lb3 = (lo1 * Math.PI) / 180.0 - (lo2 * Math.PI) / 180.0;
        var s =
        2 *
        Math.asin(
            Math.sqrt(
            Math.pow(Math.sin(La3 / 2), 2) +
                Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)
            )
        );
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        s = s.toFixed(2);
        return s;
    }
};

export default functions;
