<template>
<div class="BaiduGPS-wrap" v-if="Layer.show">
    <transition name="custom-classes-transition" enter-active-class="animated fadeInRightBig" leave-active-class="animated fadeOutRightBig">
        <div class="BaiduGPS-con" v-if="Layer.conShow">
            <em class="sjzs-icon s-icon-cross-1" @click="showHideLayer(0)"></em>
            <div class="baidu-map" ref="baiduMap" id="baiduMap"></div>
            <div class="address-list" ref="addressList">
                <div class="list-wrap">
                    <ul class="list-box">
                        <li v-for="(item, index) in BaiduData.addressList" :key="index" @click="selectAddress(item)">
                            <h4>{{item.title}}</h4>
                            <p>{{item.address}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    name: "BaiduGPS",
    props: ["setPoint"],
    data() {
        return {
            Selected: null,
            Layer: {
                show: false,
                conShow: false
            },
            BaiduData: {
                map: null,
                mk: null,
                addressList: []
            },
            point: null
        };
    },
    mounted() {
        let that = this;
        if(that.setPoint){
            that.point = {
                lng: that.setPoint.lng,
                lat: that.setPoint.lat
            };
            setTimeout(() => {
                that.createMap();
            }, 500);
        }else{
            if (that.$util.app.Platform()) {
                that.$util.app.Shop.GetLocation({
                    callback: function (res) {
                        if ("failure" == res) {
                            that.point = null;
                        } else {
                            res = JSON.parse(res);
                            that.point = {
                                lng: res.longitude,
                                lat: res.latitude
                            };
                            setTimeout(() => {
                                that.createMap();
                            }, 500);
                        }
                    }
                });
            } else {
                if (!that.point) {
                    let geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function (r) {
                        that.point = {
                            lng: r.point.lng,
                            lat: r.point.lat
                        };
                        setTimeout(() => {
                            that.createMap();
                        }, 500);
                    });
                }
            }
        }
    },
    methods: {
        /**
         * @Date: 2020-02-05 17:30:43
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 显示隐藏方法
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
         * @Date: 2020-02-05 17:41:24
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 创建地图
         * @param {type} 参数说明
         * @return: 返回值
         */
        createMap() {
            let that = this,
                addressListDom = that.$refs.addressList,
                BaiduData = that.BaiduData,
                getPoint = new BMap.Point(that.point.lng, that.point.lat);
            BaiduData.map = new BMap.Map("baiduMap", {
                minZoom: 1,
                maxZoom: 19
            });
            BaiduData.mk = new BMap.Marker(getPoint);
            BaiduData.map.centerAndZoom(getPoint, 11);
            BaiduData.map.enableScrollWheelZoom(true);
            BaiduData.map.addOverlay(BaiduData.mk);
            BaiduData.map.panTo(getPoint);
            BaiduData.map.setZoom(15);
            that.createList(getPoint);
        },
        /**
         * @Date: 2020-02-05 17:41:24
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 创建地址列表
         * @param {type} 参数说明
         * @return: 返回值
         */
        createList(point) {
            let that = this,
                BaiduData = that.BaiduData,
                Map = BaiduData.map,
                local = new BMap.LocalSearch(Map, {
                    pageCapacity: 30,
                    onSearchComplete: function (results) {
                        if(results){
                            results.forEach(v=>{
                                // app中
                                if (that.$util.app.Platform()) {
                                    if(v.Uq && v.Uq.length){
                                        v.Uq.forEach(v_=>{
                                            BaiduData.addressList.push(v_);
                                        })
                                    }
                                }else{//H5中
                                    // if(v.$q && v.$q.length){
                                    //     v.$q.forEach(v_=>{
                                    //         BaiduData.addressList.push(v_);
                                    //     })
                                    // }
                                    // if(v.Ar && v.Ar.length){
                                    //     v.Ar.forEach(v_=>{
                                    //         BaiduData.addressList.push(v_);
                                    //     })
                                    // }
                                    if(v.Br && v.Br.length){
                                        v.Br.forEach(v_=>{
                                            BaiduData.addressList.push(v_);
                                        })
                                    }
                                }
                            });
                        }
                        /* if (local) {
                            if (local.uf.length) {
                                BaiduData.addressList.length = 0;
                                local.uf.forEach(v => {
                                    BaiduData.addressList.push(v);
                                });
                            }
                        } */
                        if (local.Ma && local.Ma.content && local.Ma.content.length) {
                            let contents = local.Ma.content,
                                si = 0;
                            contents.forEach(v => {
                                for (let i in v) {
                                    let cv = v[i];
                                    if (cv.admin_info && cv.admin_info.area_name) {
                                        BaiduData.addressList[si].area = cv.admin_info.area_name;
                                        si++;
                                    }
                                }
                            });
                        }
                    }
                });
            // 关键字最多添加10个
            local.searchNearby(["区","路","园","楼","花园","餐馆","银行"], point, 600);
        },
        /**
         * @Date: 2020-02-05 22:37:45
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 选择地址列表
         * @param {type} 单击的列表项对象
         * @return: 返回值
         */
        selectAddress(item) {
            this.Selected = {};
            let Selected = this.Selected;
            for (let k in item) {
                Selected[k] = item[k];
            }
            this.showHideLayer(0, "c");
        }
    }
};
</script>

<style lang="scss">
.BaiduGPS-wrap {
    position: fixed;
    z-index: 20;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;

    .s-icon-cross-1 {
        position: absolute;
        z-index: 10;
        right: 0.2rem;
        top: 0.46rem;
        line-height: 0.8;
        font-size: 0.3rem;
        color: #999999;
    }

    .BaiduGPS-con {
        display: flex;
        height: 100%;
        flex-direction: column;

        &.animated {
            animation-duration: 0.2s;
            position: absolute;
        }
    }

    .BaiduGPS-con {
        background-color: #fff;
    }

    .baidu-map {
        height: 50%;
        overflow: hidden;
    }

    .address-list {
        height: 50%;
        display: flex;
        padding: 0.1rem;

        .list-wrap {
            width: 100%;
            height: 100%;
            flex-grow: 1;
            flex-shrink: 1;
            overflow-y: auto;
        }

        li {
            border-bottom: 1px solid #ccc;
            padding: 0.2rem;
        }

        h4 {
            font-size: 0.24rem;
            margin: 0.1rem 0;
            font-weight: 700;
            color: #222;
        }

        p {
            font-size: 0.22rem;
        }
    }
}
</style>
