<!--
 * @Author       : fengting
 * @description  : 编辑首页
 * @Date         : 2020-11-05 16:02:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-06 16:04:41
 * @FilePath     : /vue-test_qian/src/pages/distribution/views/editpage.vue
-->

<template>
    <!-- edit-center -->
    <div class="edit-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <!-- 头部开始 -->
                <slot-publicHead :linkreturn="linkreturn">
                    <div slot="headTit">编辑</div>
                </slot-publicHead>
                <!-- 头部结束 -->
                <div class="edit-content">
                    <div class="edit_ul">
                        <van-form>
                            <van-field v-model="text" label="分销商名称" />
                            <van-field v-model="text" label="电话号码" />
                            <van-field v-model="text" label="微信号" />
                        </van-form>
                    </div>
                    <div class="edit_ul">
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
                            <div class="editbutton">
                                <van-button round block type="info" native-type="submit">
                                提交
                                </van-button>
                            </div>
                        </van-form>
                    </div>
                </div>
            </article>
        </section>
    </div>
</template>
<script>
import publicHead from '@/components/distribution/publicHead'
export default {
    components: {
        'slot-publicHead': publicHead
    },
    data() {
        return {
            linkreturn:'index',
            text: '',//分销商名称
            value: '',//自定义单选
            columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],//自定义单选项
            showPicker: false,//自定义单选状态
            uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],//自定义图片上传
        };
    },
    methods: {
        /**
         * @Date: 2020-11-05 18:22
         * @LastEditors: fengting
         * @description: 自定义单选项
         */
        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
        },
    }
};
</script>
<style lang="scss">
@import "@/pages/distribution/assets/css/distribution.scss";
</style>
