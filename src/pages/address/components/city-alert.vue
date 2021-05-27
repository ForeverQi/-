<template>
    <div class="cityAlert" :class="themes">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <div class="city">
            <div class="cityBox" v-if="City1" @click="closeCity">
                <!-- 城市选择 -->
                <div class="City">
                    <div class="alert_view2_tit" style="border:0;">
                        <div class="view2_tit_L">{{ clues.qingxuanzechengshi }}</div>
                        <div class="view2_tit_R" @click="closeCity">
                            <image
                                mode="widthFix"
                                src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/redesign_colse.jpg"
                            ></image>
                        </div>
                    </div>
                    <div class="City_top">
                        <div class="City_li" @click.stop="changeTitle(0)">
                            <div class="City_txt">{{ province ? province : clues.qingxuanzesheng }}</div>
                            <div
                                class="City_bor"
                                :class="cityStatus == 0 ? 'City_active' : ''"
                                :style="{ background: cityStatus == 0 ? bgcColor1 : '' }"
                            ></div>
                        </div>
                        <div class="City_li" v-if="province1" @click.stop="changeTitle(1)">
                            <div class="City_txt">{{ province1 ? province1 : clues.qingxuanzeshi }}</div>
                            <div
                                class="City_bor"
                                :class="cityStatus == 1 ? 'City_active' : ''"
                                :style="{ background: cityStatus == 1 ? bgcColor1 : '' }"
                            ></div>
                        </div>
                        <div class="City_li" v-if="province2" @click.stop="changeTitle(2)">
                            <div class="City_txt">{{ province2 ? province2 : clues.qingxuanzequ }}</div>
                            <div
                                class="City_bor"
                                :class="cityStatus == 2 ? 'City_active' : ''"
                                :style="{ background: cityStatus == 2 ? bgcColor1 : '' }"
                            ></div>
                        </div>
                        <div class="City_li" v-if="province3" @click.stop="changeTitle(3)">
                            <div class="City_txt">{{ province3 ? province3 : clues.qingxuanzejiedao }}</div>
                            <div class="City_bor" :class="cityStatus == 3 ? 'City_active' : ''"></div>
                        </div>
                        <div class="City_li" v-if="province4" @click.stop="changeTitle(4)">
                            <div class="City_txt">{{ province4 ? province4 : clues.qingxuanzexiaoqu }}</div>
                            <div class="City_bor" :class="cityStatus == 4 ? 'City_active' : ''"></div>
                        </div>
                    </div>
                    <div style="overflow-y: scroll;" class="City_bottom" v-if="cityStatus == 0">
                        <div
                            :class="item.is_check == 1 ? 'City_bottom_li ischeck' : 'City_bottom_li'"
                            v-for="(item, index) in cityArr"
                            :key="index"
                            @click.stop="changeCity(item.name, index)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                    <div style="overflow-y:scroll;" class="City_bottom" v-if="cityStatus == 1">
                        <div
                            :class="item.is_check == 1 ? 'City_bottom_li ischeck' : 'City_bottom_li'"
                            v-for="(item, index) in cityArr1"
                            :key="index"
                            @click.stop="changeCity(item.name, index)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                    <div style="overflow-y:scroll;" class="City_bottom" v-if="cityStatus == 2">
                        <div
                            :class="item.is_check == 1 ? 'City_bottom_li ischeck' : 'City_bottom_li'"
                            v-for="(item, index) in cityArr2"
                            :key="index"
                            @click.stop="changeCity(item.name, index)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                    <div style="overflow-y:scroll;" class="City_bottom" v-if="cityStatus == 3">
                        <div
                            :class="item.is_check == 1 ? 'City_bottom_li ischeck' : 'City_bottom_li'"
                            v-for="(item, index) in cityArr3"
                            :key="index"
                            @click.stop="changeCity(item.name, index)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                    <div style="overflow-y:scroll;" class="City_bottom" v-if="cityStatus == 4">
                        <div
                            :class="item.is_check == 1 ? 'City_bottom_li ischeck' : 'City_bottom_li'"
                            v-for="(item, index) in cityArr4"
                            :key="index"
                            @click.stop="changeCity(item.name, index)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const { log } = console;
import util from "@/libs/util";
import { addressInfo } from "@/api/address/addressList.js";
export default {
    props: {
        theme: {
            type: String,
            default: "#f00"
        },
        cluesStr: {
            type: Object
        },
        bgcColor1: {
            type: String
        }
    },
    data() {
        return {
            cityStatus: 0,
            clues: {},
            city:
                '{"provinces":["北京","天津","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省","上海","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西壮族自治区","海南省","重庆","四川省","贵州省","云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔自治区"],"cities":["北京市"],"areas":["东城区","西城区","朝阳区","丰台区","石景山区","海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","怀柔区","平谷区","密云区","延庆区"]}',
            cityArr: [],
            City1: false,
            province: false,
            province1: false,
            province2: false,
            province3: false,
            province4: false,
            // 颜色
            themes: "color1",
            showLoading: false,
            cityArr2: [],
            areaName:0
        };
    },
    mounted() {
        let that = this;
        that.themes = that.theme;
        that.clues = that.cluesStr;
    },
    methods: {
        cityOne() {
            let that = this;
            that.province = false;
            that.province1 = false;
            that.province2 = false;
            that.cityArr2 = [];
            that.cityStatus = 0;
            that.showLoading = true;
            let cityParam = JSON.parse(this.city),
                cityArr = [];
            let req = {
                system: 1,
                pid: 0
            };
            let paramsJson = {
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                type: 5
            };
            paramsJson.req = JSON.stringify(req);
            addressInfo(paramsJson).then(res => {
                that.showLoading = false;
                let list = res;
                for (let i in list) {
                    list[i].is_check = 0;
                }
                that.cityArr = [...list];
            });
        },
        // 显示弹窗
        showCity() {
            // this.cssColor = "#f00";
            this.City1 = true;
        },
        // 关闭弹窗
        closeCity() {
            // 获取城市的值
            let cityValue = "",
                addrInfo2 = {};
            // 省
            if (this.$util.functions.ifHaveFun(this.cityArr)) {
                cityValue = cityValue + this.getIsCheck(this.cityArr) + " ";
            }
            // 市
            if (this.$util.functions.ifHaveFun(this.cityArr1)) {
                cityValue = cityValue + this.getIsCheck(this.cityArr1) + " ";
            }
            // 区
            if (this.$util.functions.ifHaveFun(this.cityArr2)) {
                cityValue = cityValue + this.getIsCheck(this.cityArr2);
            }
            this.addrInfo2 = addrInfo2;
            this.City1 = false;
            // 必须选到区才更新数据
            if (this.getIsCheck(this.cityArr2) == "" && this.areaName === 0) {
                cityValue = "";
            } else {
                // 在退换货页面不需要更新缓存
                // if (this.properties.returnAfter == 1) {
                //     this.$emit("passCity", cityValue);
                //     return false;
                // }
                if((typeof this.$cookies.get("supplyCity")) == 'string'){
                    this.$cookies.set("supplyCity",1)
                }
                let supplyJson =
                    this.$util.functions.ifHaveFun(this.$cookies.get("supplyCity")) &&
                    this.$cookies.get("supplyCity") != 1
                        ? this.$cookies.get("supplyCity")
                        : {};
                supplyJson[0] = cityValue;
                this.$cookies.set("supplyCity", supplyJson);
            }
            this.$emit("passCity", cityValue);
        },
        // 获取ischeck为1的值
        getIsCheck(value) {
            let num = 0;
            if (value && value.length) {
                for (let i in value) {
                    if (value[i].is_check == 1) {
                        num++;
                        return value[i].name;
                    }
                }
                if (num == 0) {
                    return "";
                }
            } else {
                return "";
            }
        },

        // 选择省市区
        changeCity(name, index) {
            let that = this;
            // 点击省->市
            if (this.cityStatus == 0) {
                that.showLoading = true;
                for (let i in this.cityArr) {
                    i == index ? (this.cityArr[i].is_check = 1) : (this.cityArr[i].is_check = 0);
                }
                that.cityArr = this.cityArr;
                that.province = name;
                let req = {
                    system: 1,
                    pid: this.cityArr[index].id
                };
                let paramsJson = {
                    username: that.$route.query.username,
                    zz_userid: that.$cookies.get("zz_userid"),
                    type: 5
                };
                paramsJson.req = JSON.stringify(req);
                addressInfo(paramsJson)
                    .then(res => {
                        that.showLoading = false;
                        let cities = res,
                            citiesArr = [];
                        for (let i in cities) {
                            cities[i].is_check = 0;
                        }
                        that.cityStatus = 1;
                        that.cityArr1 = [...cities];
                        that.province1 = that.clues.qingxuanzeshi;
                        that.province2 = "";
                        that.cityArr2 = [];
                    })
                    .catch(err => {
                        that.showLoading = false;
                    });
            }
            // 点击市-> 区
            if (this.cityStatus == 1) {
                that.showLoading = true;
                for (let i in this.cityArr1) {
                    i == index ? (this.cityArr1[i].is_check = 1) : (this.cityArr1[i].is_check = 0);
                }
                that.cityArr1 = this.cityArr1;
                that.province1 = name;
                let req = {
                    system: 1,
                    pid: this.cityArr1[index].id
                };
                let paramsJson = {
                    username: that.$route.query.username,
                    zz_userid: that.$cookies.get("zz_userid"),
                    type: 5
                };
                paramsJson.req = JSON.stringify(req);
                addressInfo(paramsJson)
                    .then(res => {
                        that.showLoading = false;

                        if (res[0].name == "") {
                            that.province2 = '';
                            that.cityArr2 = [];
                            that.areaName = 1;
                            that.closeCity();
                        } else {
                            let areas = res,
                                areasArr = [];
                            for (let i in areas) {
                                areas[i].is_check = 0;
                            }
                            that.cityStatus = 2;
                            that.cityArr2 = areas;
                            that.province2 = that.clues.qingxuanzequ;
                        }
                    })
                    .catch(err => {
                        that.showLoading = false;
                    });
            }
            // 点击区
            if (this.cityStatus == 2) {
                for (let i in this.cityArr2) {
                    i == index ? (this.cityArr2[i].is_check = 1) : (this.cityArr2[i].is_check = 0);
                }
                that.province2 = name;
                that.cityArr2 = this.cityArr2;
                that.closeCity();

                // let req = {
                //     system: 1,
                //     pid: this.cityArr2[index].id
                // };
                // let paramsJson = {
                //     username: that.$route.query.username,
                //     zz_userid: that.$cookies.get("zz_userid"),
                //     type: 5
                // };
                // paramsJson.req = JSON.stringify(req);
                // addressInfo(paramsJson).then(res => {
                //     that.showLoading = false;
                //     if (res.length) {
                //         let xiaoqu = res,
                //             areasArr = [];
                //         for (let i in areas) {
                //             xiaoqu[i].is_check = 0;
                //         }
                //         that.cityStatus = 3;
                //         that.cityArr3 = xiaoqu;
                //         that.province3 = that.clues.qingxuanzexiaoqu;
                //     }else{
                //         that.closeCity();
                //     }
                // }).catch(err=>{
                //      that.showLoading = false;
                //      that.closeCity();
                // });
            }
            // 点击小区
            // if (this.cityStatus == 3) {
            //     for (let i in this.cityArr3) {
            //         i == index ? (this.cityArr3[i].is_check = 1) : (this.cityArr3[i].is_check = 0);
            //     }
            //     that.province2 = name;
            //     that.cityArr3 = this.cityArr3;
            //     // this.closeCity();

            //     let req = {
            //         system: 1,
            //         pid: this.cityArr1[index].id
            //     };
            //     let paramsJson = {
            //         username: that.$route.query.username,
            //         zz_userid: that.$cookies.get("zz_userid"),
            //         type: 5
            //     };
            //     paramsJson.req = JSON.stringify(req);
            //     addressInfo(paramsJson).then(res => {
            //         that.showLoading = false;
            //         if(res.length){
            //             let xiaoqu = res,
            //                 areasArr = [];
            //             for (let i in areas) {
            //                 xiaoqu[i].is_check = 0;
            //             }
            //             that.cityStatus = 4;
            //             that.cityArr3 = xiaoqu;
            //             that.province3 = that.clues.qingxuanzexiaoqu;
            //         }else{
            //             this.closeCity();
            //         }
            //     });
            // }
        },
        // 选择省市区顶部导航
        changeTitle(num) {
            this.cityStatus = num;
        },
        // 添加选中状态
        proFun(value, cindex) {
            for (let i in value) {
                if (i == cindex) {
                    value[i].is_check = 1;
                } else {
                    value[i].is_check = 0;
                }
            }
            return value;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "@/pages/order/assets/css/color.scss";
</style>
<style lang="scss" scoped>
.City {
    height: 8.79rem;
    background: white;
    border-radius: 0.25rem 0.25rem 0rem 0rem;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 12;
    overflow: hidden;
}

.City_top {
    border-bottom: 0.01rem solid #ededed;
    overflow-x: scroll;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.City_li {
    margin: 0rem 0.4rem 0rem 0.4rem;
    /* float: left; */
    white-space: nowrap;
}

.City_li:first-child {
    margin-left: 0.25rem;
}

.City_li:last-child {
    padding-right: 0.25rem;
}

.City_txt {
    text-align: center;
    display: block;
    font-size: 0.26rem;
    color: #222;
}

.City_bor {
    width: 0.49rem;
    height: 0.05rem;
    background: transparent;
    margin: 0 auto;
    margin-top: 0.13rem;
    display: block;
}

.cur .City_bor {
    background: #fc273c;
}

.City_bottom {
    padding-top: 0.22rem;
    height: 7.05rem;
}

.City_bottom_li {
    height: 0.8rem;
    padding: 0rem 0.2rem;
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #222;
}

.City_bottom_li:active {
    background: #fafafa;
}

/* switch开关 */
.marquee {
    width: 0.8rem;
    height: 0.38rem;
    border-radius: 0.28rem;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    margin-left: 0.29rem;
    transition: all 0.4s ease-in-out 0s;
    position: relative;
}

.marqueeButton {
    position: absolute;
    left: 0;
    top: 1px;
    width: 0.34rem;
    height: 0.34rem;
    box-shadow: 0.02rem 0.03rem 0.08rem 0 rgba(2, 2, 2, 0.2);
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.4s ease-in-out 0s;
}

.marqueeSelect {
    background: #ff9c00;
    border: 1px solid #ff9c00;
}

.marqueeButtonSelect {
    left: 54% !important;
}

.ischeck {
    background: #fafafa;
    /* background: #f00; */
}

.cityBox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.3);
}

.alert_view2_tit {
    border-bottom: 0.01rem solid #ededed;
    height: 1.03rem;
    overflow: hidden;
    margin-left: 0.25rem;
}

.view2_tit_L {
    font-size: 0.34rem;
    color: #222;
    line-height: 1.03rem;
    float: left;
}

.view2_tit_R {
    width: 0.29rem;
    height: 0.28rem;
    float: right;
    margin-right: 0.25rem;
    margin-top: 0.4rem;
}

.view2_tit_R image {
    display: block;
    width: 100%;
}

.scroll_view1 {
    padding-top: 0.15rem;
    height: 5.4rem;
    overflow: hidden;
}

.scroll_view1_li {
    padding: 0.25rem 0;
    margin: 0rem 0.25rem;
    overflow: hidden;
}

.scroll_view1_L {
    font-size: 0.28rem;
    color: #222;
    float: left;
    line-height: 0.4rem;
}

.scroll_view1_R {
    width: 0.4rem;
    height: 0.4rem;
    overflow: hidden;
    float: left;
    border: 0.02rem solid #cccccc;
    box-sizing: border-box;
    border-radius: 0.06rem;
    margin-right: 0.2rem;
}

.scroll_view1_R image {
    width: 0.2rem;
    height: 0.15rem;
    margin: 0 auto;
    margin-top: 0.12rem;
    display: block;
}

.cur .scroll_view1_R {
    border: 0.02rem solid #fc273c;
    background: #fc273c;
}

.OK {
    height: 0.9rem;
    background: white;
    box-shadow: 0rem -0.03rem 0.15rem 0rem rgba(220, 213, 206, 0.3);
    font-size: 0.28rem;
    color: #fc273c;
    text-align: center;
    line-height: 0.9rem;
}
// vant的样式
.van-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000001;
}
.van-overlay {
    position: fixed;
    z-index: 1000000;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
}
.van-dialog {
    border-radius: 8px;
    top: 50% !important;
    z-index: 1000005;
}
</style>
