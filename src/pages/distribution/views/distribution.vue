<!--
 * @Author: fengting
 * @Date: 2020-11-12 14:39:01
 * @LastEditTime: 2020-11-23 17:10:48
 * @LastEditors: Please set LastEditors
 * @Description: 成为分销商、申请成为分销商、成为分销商
 * @FilePath: \vue_test_qian\src\pages\distribution\views\distribution.vue
-->
<template>
    <!-- distribution-center -->
    <div class="distribution-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <!-- 头部开始 -->
                <slot-publicHead :linkreturn="linkreturn">
                    <div slot="headTit">海报物料</div>
                </slot-publicHead>
                <!-- 头部结束 -->
                <div class="distribution-content">
                    <!-- 成为分销商开始 -->
                    <!-- <div class="distribution-one">
                        <p><img src="../assets/images/distribution-img.png" ></p>
                        <strong>购物消费满<i>￥999.99</i>即可成为分销商</strong>
                        <div class="distribution-one-but">
                            <van-button round type="danger">
                                去逛逛
                            </van-button>
                        </div>
                    </div> -->
                    <!-- 成为分销商结束 -->
                    <!-- 申请成为分销商开始 -->
                    <div class="distribution-two">
                        <div class="distribution_ul">
                            <van-form>
                                <van-field v-model="text" label="分销商名称" />
                                <van-field v-model="text" label="电话号码" />
                                <van-field v-model="text" label="微信号" />
                            </van-form>
                        </div>
                        <div class="distribution_ul">
                            <van-form>
                                <van-field v-model="text" required label="自定义文本" placeholder="请输入"/>

                                <van-field readonly clickable name="picker" :value="value" label="自定义单选" placeholder="请选择" @click="showPicker = true"/>
                                <van-popup v-model="showPicker" position="bottom">
                                <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false"/>
                                </van-popup>

                                <van-field name="uploader" label="自定义图片上传">
                                    <template #input>
                                        <van-uploader v-model="uploader" />
                                    </template>
                                </van-field>
                                <div class="treaty" @click="alertTreaty">
                                    <span></span>
                                    <p>阅读并同意<i>《分销商阅读协议》</i></p>
                                </div>
                                <div class="distribution-button">
                                    <van-button round block type="info" native-type="submit">
                                    提交
                                    </van-button>
                                </div>
                            </van-form>
                        </div>
                    </div>
                    <!-- 申请成为分销商结束 -->
                    <!-- 未通过开始 -->
                    <!-- <div class="distribution-two">
                        <div class="distribution-data">
                            <van-empty description="您的审核未通过" :image="require('../assets/images/no-data1.png')">
                                <div class="wait-txt">请耐心等待...</div>
                            </van-empty>
                        </div>
                        <div class="distribution-data">
                            <van-empty description="您的审核未通过" :image="require('../assets/images/no-data1.png')">
                                <van-button round type="danger">
                                    重新申请
                                </van-button>
                            </van-empty>
                        </div>
                    </div> -->
                    <!-- 未通过结束 -->
                </div>
                <!-- 协议弹窗开始 -->
                <van-dialog v-model="show" title="分销商阅读协议" show-cancel-button>
                    <div class="treaty-txt">asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的asdasasdas按时打折打折的</div>
                </van-dialog>
                <!-- 协议弹窗结束 -->
            </article>
        </section>
    </div>
</template>
<script>
import publicHead from '@/components/distribution/publicHead';
import Vue from 'vue';

export default {
    components: {
        'slot-publicHead': publicHead
    },
    data() {
        return {
            linkreturn:'index',//头部跳转链接
            text: '',//分销商名称
            value: '',//自定义单选
            columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],//自定义单选项
            showPicker: false,//自定义单选状态
            uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],//自定义图片上传
            show: false,
        };
    },

    methods: {
        /**
         * @Date: 2020-11-12 16:22
         * @LastEditors: fengting
         * @description: 自定义单选项
         */
        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
        },
        /**
         * @Date: 2020-11-12 17:25
         * @LastEditors: fengting
         * @description: 协议弹窗
         */
        alertTreaty(){
            this.show = true;
        }
       
    }
};
</script>
<style lang="scss">
    @import "@/pages/distribution/assets/css/distribution.scss";
</style>
