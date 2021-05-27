<!--
 * @Author       : zhouqi
 * @description  : 评价填写信息
 * @Date         : 2020-12-06 19:54:55
 * @LastEditors  : zhouqi
 * @LastEditTime : 2020-12-23 10:31:27
 * @FilePath     : /vue-VFrontend/src/pages/order/views/orderRelated/evaluation.vue
-->
<template>
    <section class="evaluation-box">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <section class="evaluation" v-if="orderEva != ''">
            <Nav :numerical="10" :tips="orderEva.tips" />
            <div class="wrapper">
                <div class="wrapper_c">
                    <div class="wrapper_bg">
                        <div class="wrapper_bg_c"></div>
                    </div>
                    <div class="Max_Center">
                        <div class="order_list">
                            <div class="order_li">
                                <div class="order_top">
                                    <div class="shop_name">
                                        <div class="home_img" @click="shopMallFun">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_home.png"
                                            />
                                        </div>

                                        <div class="home_txt" @click="shopMallFun">{{ orderEva.shops_name }}</div>
                                        <div class="arrow1" v-if="orderEva.shops_user_id > 0">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow1.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="order_center">
                                    <div class="order_money">
                                        <div class="money">
                                            <span>{{ orderEva.currency_symbol }}</span
                                            >{{ orderEva.pro_info.shiji_money_left
                                            }}<span>.{{ orderEva.pro_info.shiji_money_right }}</span>
                                        </div>
                                        <div class="Number">{{ orderEva.pro_info.num_info }}</div>
                                    </div>
                                    <div class="order_name">
                                        <div class="shop_img"><img :src="orderEva.pro_info.pic" /></div>
                                        <div class="shop_link">
                                            <div class="shop_link_tit">{{ orderEva.pro_info.name }}</div>
                                            <div class="shop_link_txt">{{ orderEva.pro_info.param_info }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="level">
                                <!-- <div class="level_top">
            <div class="level_txt">评论官</div>
            <div class="level_txt1">完成商品评价可得6积分奖励哟</div>
          </div> -->
                                <div class="level_bottom">
                                    <div class="Stars_txt">{{ orderEva.tips.xingjipingjia }}</div>
                                    <div class="Stars">
                                        <div
                                            class="Stars_li"
                                            v-for="(item, index) in starArr"
                                            :key="index"
                                            @click="changeStare(index)"
                                        >
                                            <img :src="item.pic" />
                                        </div>
                                    </div>
                                    <div class="Stars_txt1">{{ starText }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="evaluate">
                            <div class="evaluate_c">
                                <div class="evaluate_img">
                                    <img
                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_evaluate_img.png"
                                    />
                                </div>

                                <div class="evaluate_txt">
                                    <textarea
                                        class="textarea_txt"
                                        :value="evaValue"
                                        @input="evaValueFun($event.target.value)"
                                        :placeholder="orderEva.tips.shifoumanzuqidai"
                                    ></textarea>
                                </div>
                            </div>
                            <div class="mode1_ul">
                                <div class="mode1_li">
                                    <div class="mode1_li_add">
                                        <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_add.png" />
                                        <input
                                            name="upFile"
                                            type="file"
                                            accept="image/*"
                                            class="upload-file"
                                            @change="coverUpload($event, 1)"
                                        />
                                    </div>
                                </div>
                                <div class="mode1_li" v-for="(item, index) in imagesList_back" :key="index">
                                    <div class="mode1_li_img"><img :src="item.path" /></div>
                                    <div class="delFather" @click.stop="deleteImg(index)">
                                        <div class="del" v-if="imagesList_back.length">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_del.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <div class="button_a" @click="submitBtn">{{ orderEva.tips.tijiaopingjia }}</div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
const { log } = console;
// vant组件
import Hint from "@/plugins/hint";
import util from "@/libs/util";
import { getEvaluateInfo,liveImgUpload } from "@/api/order/afterSales.js";

// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";
export default {
    components: {
        Nav
    },
    data() {
        return {
            orderEva: "",
            evaValue: "",
            starText: "非常好",
            imagesList: [],
            imagesList_back: [],
            isWho: "weixin",
            levelLength: 5,
            starArr: [
                {
                    id: 0,
                    before: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img2.png",
                    pic: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img1.png",
                    after: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img1.png"
                },
                {
                    id: 1,
                    before: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img2.png",
                    pic: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img1.png",
                    after: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img1.png"
                },
                {
                    id: 2,
                    before: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img2.png",
                    pic: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img1.png",
                    after: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img1.png"
                },
                {
                    id: 3,
                    before: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img2.png",
                    pic: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img1.png",
                    after: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img1.png"
                },
                {
                    id: 4,
                    before: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img2.png",
                    pic: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img1.png",
                    after: "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Stars_img1.png"
                }
            ],
            showLoading: true,
            orderId:'',
            req:'',
            detailId:'',
            is_add:'',
            evaList:'',
            orderValue:'',
            orderIdUp:'',
            orderDetail:'',
            aleryValue:'',
        };
    },
    mounted() {
        // this.$cookies.set("zz_userid","21940075")
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        let that = this;
        that.orderId = that.$route.query.orderId;
        that.detailId = that.$route.query.detailId;
        that.req = { type: 1 };
        that.is_add = that.$route.query.is_add;
        that.evaList = that.$route.query.evaList;
        that.orderValue = that.$route.query.orderValue;
        that.orderIdUp = that.$route.query.orderIdUp;
        that.orderDetail = that.$route.query.orderDetail;
        that.aleryValue = that.$route.query.aleryValue;
        that.state = that.$route.query.state;
        that.orderEvaFun(that.$route.query.orderId, that.$route.query.detailId, JSON.stringify(that.req));
    },
    methods: {
        // 评价接口
        orderEvaFun(orderId, detailId, req) {
            let that = this;
            that.showLoading = true;
            let paramJson = {
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                order_id: orderId,
                detail_id: detailId,
                req: req,
                 client_type: 1
            };
            getEvaluateInfo(paramJson)
                .then(res => {
                    that.showLoading = false;
                    that.starText = res.tips.feichanghao;
                    if (JSON.parse(req).type == 1) {
                        let orderEvaValue = res;
                        let val = String(orderEvaValue.pro_info.price);
                        let val_left = val.substring(0, val.indexOf("."));
                        let val_right = val.replace(/\d+\.(\d*)/, "$1");
                        orderEvaValue.pro_info.shiji_money_left = val_left;
                        orderEvaValue.pro_info.shiji_money_right = val_right;
                        that.orderEva = res;
                    } else if (JSON.parse(req).type == 2) {
                        //提交评价
                        if (util.functions.ifHaveFun(that.evaList)) {
                            if (util.functions.ifHaveFun(that.orderIdUp)) {
                                that.$router.push({
                                    path: "/order/orderRelated/evaluationList",
                                    query: {
                                        orderId: that.orderIdUp,
                                        username: that.$route.query.username,
                                        is_add: 1
                                    }
                                });
                                that.$cookies.set("evaluation_state",1);
                            } else {
                                that.$router.push({
                                    path: "/order/orderRelated/evaluationList",
                                    query: {
                                        username: that.$route.query.username,
                                        is_add: 1
                                    }
                                });
                                that.$cookies.set("evaluation_state",1);
                            }
                        }
                        if (util.functions.ifHaveFun(that.orderValue)) {
                            that.$router.push({
                                path: "/order/orderRelated/evaluationList",
                                query: {
                                    type: that.state,
                                    username: that.$route.query.username,
                                    is_add: 1
                                }
                            });
                            that.$cookies.set("evaluation_state",1);
                        }
                        if (util.functions.ifHaveFun(that.orderDetail)) {
                            that.$router.push({
                                path: "/order/orderRelated/orderDetail",
                                query: {
                                    username: that.$route.query.username,
                                    orderId: that.orderId
                                }
                            });
                        }
                        if (util.functions.ifHaveFun(that.aleryValue)) {
                            that.$router.push({
                                path: "/order/orderRelated/aleryEvaList",
                                query: {
                                    username: that.$route.query.username,
                                    orderId: that.orderId,
                                    detailId: that.detailId
                                }
                            });
                        }
                    }
                })
                .catch(err => {
                    that.showLoading = false;
                    if (err.code == 2100003 || err.code == 2100004 || err.code == 2100005) {
                        that.$router.push({
                            path: "/order/orderRelated/aleryEvaList",
                            query: {
                                username: that.$route.query.username,
                                orderId: that.orderId,
                                detailId: that.detailId
                            }
                        });
                    } else {
                        Hint.Alert({
                            message: err.msg
                        }).catch(() => {
                            window.history.back();
                        });
                    }
                });
        },
        // 星级选择
        changeStare(index) {
            const starValue = this.starArr;
            for (let i in starValue) {
                if (starValue[i].id > index) {
                    starValue[i].pic = starValue[i].before;
                } else {
                    starValue[i].pic = starValue[i].after;
                }
            }
            let num = starValue.filter(starValue => starValue.pic == starValue.after),
                starText;
            switch (num.length) {
                case 1:
                    starText = this.orderEva.tips.feichangcha;
                    break;
                case 2:
                    starText = this.orderEva.tips.cha;
                    break;
                case 3:
                    starText = this.orderEva.tips.yiban;
                    break;
                case 4:
                    starText = this.orderEva.tips.hao;
                    break;
                case 5:
                    starText = this.orderEva.tips.feichanghao;
                    break;
            }
            this.starArr = starValue;
            this.starText = starText;
            this.levelLength = num.length;
        },
        /**
         * @description: 上传封面
         * @param {event，type} : {获取的file对象}, {1：图片，2：文件}
         * @return:
         */
        coverUpload(event, type) {
            let that = this,
                file = event.srcElement, //当前file对象
                files = file.files[0];
            if(that.imagesList_back.length  == 8){
                Hint.Msg({
                    message: that.orderEva.tips.zuiduojizhang
                })
                return false;
            }
            if (type == 1) {
                if (files.type && !/png|jpeg|gif|jpg/.test(files.type.toLowerCase())) {
                    Hint.Msg({
                        message: that.orderEva.tips.jinzhichigeshi
                    });
                    return false;
                }
                if (files.size > 5242880) {
                    Hint.Msg({
                        message: that.orderEva.tips.jinzhichigeshi
                    });
                    return false;
                }
            }
            this.showLoading = true;
            liveImgUpload(file).then(res => {
                this.showLoading = false;
                if (type == 1) {
                    this.headImgSrc = res.path;
                }
                that.imagesList_back.push(res)
            }).catch(err =>{
                this.showLoading = false;
            })
        },
        // 评价内容输入事件
        evaValueFun(val) {
            this.evaValue = val;
        },

        // 删除图片
        deleteImg(index) {
            this.imagesList_back.splice(index, 1);
        },
        // 提交评价
        submitBtn() {
            // if (this.fasterNum == 0) {
            //   return false;
            // }
            let req = this.req;
            if (!util.functions.ifHaveFun(this.evaValue)) {
                Hint.Msg({
                    message: this.orderEva.tips.pinglunneirongbunengweikong
                });

                return false;
            }
            req.type = 2;
            req.level = this.levelLength;
            req.content = this.evaValue;
            req.is_add = this.is_add;
            if (this.imagesList_back.length) {
                let imgId = "";
                for (let i in this.imagesList_back) {
                    imgId = imgId.concat(this.imagesList_back[i].picId + ",");
                }
                req.pic = imgId.slice(0, imgId.length - 1);
            }
            this.orderEvaFun(this.orderId, this.detailId, JSON.stringify(req));
        },

        // 跳转商铺
        shopMallFun() {
            if (this.orderEva.shops_user_id > 0) {
                location.href =
                    "//" +
                    document.domain +
                    `/wap/shops/shop.php?username=${this.$route.query.username}&channel_id=${this.orderEva.shopsChannelId}&u_u_id=${this.orderEva.shops_user_id}&wap=1`;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/pages/order/assets/css/evaluation.scss";
</style>
