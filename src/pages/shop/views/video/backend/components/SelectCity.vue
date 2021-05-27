<template>
<div class="select-layer select-city-layer" v-if="Layer.show">
    <div class="bg" @click="showHideLayer(0)"></div>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
        <div class="layer-con-wrap" v-if="Layer.conShow">
            <!-- 标签切换区域 -->
            <div class="tab-box">
                <!-- 标签标题 -->
                <div class="tab-h">
                    <h5>选择城市</h5>
                    <i class="sjzs-icon s-icon-cross-1" @click="showHideLayer(0)"></i>
                    <ul>
                        <li v-for="(item, index) in Selected" :key="index" @click="switchTab(index)" :class="{active: Tab.active === index}" v-show="index === 0 || item.name">
                            <span v-if="!item.code">{{item.name}}</span>
                            <b v-else>{{item.name}}</b>
                        </li>
                    </ul>
                </div>
                <!-- 标签内容 -->
                <div class="tab-b">
                    <div class="city-wrap">
                        <transition name="custom-classes-transition" :enter-active-class="`animated ${Province.enterClass}`" :leave-active-class="`animated ${Province.leaveClass}`">
                            <div class="list-box" v-show="Tab.active === 0">
                                <ul>
                                    <li v-for="item in Province.list" :key="item.code" @click="SProvince" :data-code="item.code" :class="{'selected': item.code === Selected[0].code}">{{item.name}}</li>
                                </ul>
                            </div>
                        </transition>
                        <transition name="custom-classes-transition" :enter-active-class="`animated ${City.enterClass}`" :leave-active-class="`animated ${City.leaveClass}`">
                            <div v-show="Tab.active === 1" class="list-box">
                                <ul>
                                    <li v-for="item in City.list" :key="item.code" @click="SCity" :data-code="item.code" :class="{'selected': item.code === Selected[1].code}">{{item.name}}</li>
                                </ul>
                            </div>
                        </transition>
                        <transition name="custom-classes-transition" :enter-active-class="`animated ${Area.enterClass}`" :leave-active-class="`animated ${Area.leaveClass}`">
                            <div v-show="Tab.active === 2" class="list-box">
                                <ul>
                                    <li v-for="item in Area.list" :key="item.code" @click="SArea" :data-code="item.id" :class="{'selected': item.id === Selected[2].code*1}">{{item.name}}</li>
                                </ul>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import {
    useStoreCity
} from "@/api/shop/video.bac";
export default {
    name: "SelectCity",
    props: ["selectedCity"],
    data() {
        return {
            Selected: [{
                    code: "",
                    name: "请选择省"
                },
                {
                    code: "",
                    name: ""
                },
                {
                    code: "",
                    name: ""
                }
            ],
            Province: {
                list: [],
                enterClass: "fadeInLeftBig",
                leaveClass: "fadeOutLeftBig",
                show: true,
                loading: false
            },
            City: {
                list: [],
                enterClass: "fadeInRightBig",
                leaveClass: "fadeOutLeftBig",
                show: true,
                loading: false
            },
            Area: {
                list: [],
                enterClass: "fadeInRightBig",
                leaveClass: "fadeOutRightBig",
                show: true,
                loading: false
            },
            Tab: {
                active: 0
            },
            Layer: {
                show: false,
                conShow: false
            }
        };
    },
    created() {
        let that = this,
            selectedCity = that.selectedCity,
            Selected = that.Selected;
        that.getProvinceData();
        if (selectedCity && selectedCity.length) {
            selectedCity.forEach((v, i) => {
                Selected[i].code = v.code || Selected[i].code;
                Selected[i].name = v.name || Selected[i].name;
                if (v.code) {
                    that.Tab.active = i;
                }
                if (i === 1 && Selected[i].code) {
                    that.getCityData();
                }
                if (i === 2 && Selected[i].code) {
                    that.getAreaData();
                }
            });
        }
    },
    mounted() {
        // let that = this;
    },
    methods: {
        /**
         * @Date: 2020-02-04 19:18:21
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 显示隐藏弹窗
         * @param {type} 参数说明
         * @return: 返回值
         */
        showHideLayer(action, changeType) {
            var that = this;
            action = !!action;
            if (action) {
                that.Layer.show = action;
                setTimeout(() => {
                    that.Layer.conShow = action;
                }, 100);
            } else {
                that.Layer.conShow = action;
                if (changeType) {
                    that.$emit("backFunction", that.Selected);
                } else {
                    that.$emit("backFunction");
                }
                setTimeout(() => {
                    that.Layer.show = action;
                }, 100);
            }
        },
        /**
         * @Date: 2020-02-03 20:45:22
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 切换标签方法
         * @param {type} 参数说明显示第几个，数字
         * @return: 返回值
         */
        switchTab(n) {
            this.Tab.active = n;
        },
        /**
         * @Date: 2020-02-04 16:24:09
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 更改过度动画class
         * @param {type} 参数说明
         * @return: 返回值
         */
        changeAnamateClass() {
            let that = this,
                Tab = that.Tab,
                Province = that.Province,
                City = that.City,
                Area = that.Area;
            switch (Tab.active) {
                case 0:
                    Province.enterClass = "fadeInLeftBig";
                    Province.leaveClass = "fadeOutLeftBig";
                    City.enterClass = "fadeInRightBig";
                    City.leaveClass = "fadeOutRightBig";
                    Area.enterClass = "fadeInLeftBig";
                    Area.leaveClass = "fadeOutLeftBig";
                    break;
                case 1:
                    Province.enterClass = "fadeInLeftBig";
                    Province.leaveClass = "fadeOutLeftBig";
                    City.enterClass = "fadeInRightBig";
                    City.leaveClass = "fadeOutRightBig";
                    break;
                case 2:
                    City.enterClass = "fadeInLeftBig";
                    City.leaveClass = "fadeOutLeftBig";
                    Area.enterClass = "fadeInRightBig";
                    Area.leaveClass = "fadeOutRightBig";
                    break;
            }
        },
        /**
         * @Date: 2020-02-03 20:41:22
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取省数据
         * @param {type} 参数说明
         * @return: 返回值
         */
        getProvinceData() {
            let that = this,
                Selected = that.Selected,
                Province = that.Province;
            Province.loading = true;
            useStoreCity({
                    type: 1
                })
                .then(res => {
                    Province.list = res.list;
                    Province.loading = false;
                    /* if(Selected[0].code){
                        if(isNaN(Selected[0].code)){
                            let cur = Province.list.find(v=>{
                                return v.name.indexOf(Selected[0].code.substr(0,2)) !== -1;
                            });
                            cur && (Selected[0].code = cur.code);
                        }
                        that.getCityData();
                    } */
                });
        },
        /**
         * @Date: 2020-02-03 20:43:16
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取市数据
         * @param {type} 参数说明
         * @return: 返回值
         */
        getCityData() {
            let that = this,
                SelProvince = that.Selected[0];
            if (SelProvince.code) {
                let that = this,
                    City = that.City;
                City.loading = true;
                useStoreCity({
                        type: 2,
                        code: SelProvince.code
                    })
                    .then(res => {
                        City.list = res.list;
                        City.loading = false;
                    });
            }
        },
        /**
         * @Date: 2020-02-03 20:43:40
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取区县
         * @param {type} 参数说明
         * @return: 返回值
         */
        getAreaData() {
            let that = this,
                SelCity = that.Selected[1];
            if (SelCity.code) {
                let that = this,
                    Area = that.Area;
                Area.loading = true;
                useStoreCity({
                        type: 3,
                        code: SelCity.code
                    })
                    .then(res => {
                        Area.list = res.list;
                        Area.loading = false;
                    });
            }
        },
        /**
         * @Date: 2020-02-03 20:44:04
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 选择省方法
         * @param {type} 参数说明
         * @return: 返回值
         */
        SProvince(event) {
            let that = this,
                Tab = that.Tab,
                tagDom = event.target,
                tagCode = tagDom.dataset.code,
                tagName = tagDom.innerText,
                Selected = that.Selected;
            Tab.active = 1;
            if (tagCode !== Selected[0].code) {
                Selected[0].code = tagCode;
                Selected[0].name = tagName;
                that.City.list.length = 0;
                that.Area.list.length = 0;
                Selected[1].code = "";
                Selected[1].name = "请选择市";
                Selected[2].code = "";
                Selected[2].name = "";
                that.getCityData();
            }
        },
        /**
         * @Date: 2020-02-03 20:44:31
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 选择市方法
         * @param {type} 参数说明
         * @return: 返回值
         */
        SCity(event) {
            let that = this,
                Tab = that.Tab,
                tagDom = event.target,
                tagCode = tagDom.dataset.code,
                tagName = tagDom.innerText,
                Selected = that.Selected;
            Tab.active = 2;
            if (tagCode !== Selected[1].code) {
                Selected[1].code = tagCode;
                Selected[1].name = tagName;
                that.Area.list.length = 0;
                Selected[2].code = "";
                Selected[2].name = "请选择县/区";
                that.getAreaData();
            }
        },
        /**
         * @Date: 2020-02-03 20:44:45
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 选择县方法
         * @param {type} 参数说明
         * @return: 返回值
         */
        SArea(event) {
            let that = this,
                tagDom = event.target,
                tagCode = tagDom.dataset.code,
                tagName = tagDom.innerText,
                Selected = that.Selected;
            Selected[2].code = tagCode;
            Selected[2].name = tagName;
            that.showHideLayer(0, 'c');
        }
    }
};
</script>

<style lang="scss">
@import "../css/selectCityLayer";
</style>
