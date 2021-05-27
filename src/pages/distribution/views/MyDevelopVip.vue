<!--
 * @Author: fengting
 * @Date: 2020-11-09 14:33:40
 * @LastEditTime: 2020-11-09 14:49:37
 * @LastEditors: Please set LastEditors
 * @Description: 我发展的会员
 * @FilePath: \vue_test_qian\src\pages\distribution\views\MyDevelopVip.vue
-->
 
 <template>
    <!-- MyDevelopVip-center -->
    <div class="MyDevelopVip-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <!-- 头部开始 -->
                <slot-publicHead :linkreturn="linkreturn">
                    <div slot="headTit">我发展的会员(9999)</div>
                </slot-publicHead>
                <!-- 头部结束 -->
                <div class="MyDevelopVip-content">
                    <div class="DevelopVip-server"><van-search shape="round" left-icon="" right-icon="search" v-model="value" placeholder="请输入商品名称" /></div>
                    <div class="MyDevelopVip-ul">
                        <div class="MyDevelopVip-li">
                            <div class="MyDevelopVip-r"><van-button round type="default">查看订单</van-button></div>
                            <div class="MyDevelopVip-l">
                                <div class="onedistribution-img">
                                    <img src="../assets/images/superiorImg.png">
                                </div>
                                <div class="onedistribution-text">
                                    <span>分销商名称</span>
                                    <p>等级等级</p>
                                </div>
                            </div>
                        </div>
                        <div class="MyDevelopVip-li">
                            <div class="MyDevelopVip-r"><van-button round type="default">查看订单</van-button></div>
                            <div class="MyDevelopVip-l">
                                <div class="onedistribution-img">
                                    <img src="../assets/images/superiorImg.png">
                                </div>
                                <div class="onedistribution-text">
                                    <span>分销商名称</span>
                                    <p>等级等级</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
        };
    },
    methods: {
        /**
         * @Date: 2020-11-06 16:01
         * @LastEditors: fengting
         * @description: 
         */
        
    }
};
</script>
<style lang="scss">
    @import "@/pages/distribution/assets/css/distribution.scss";
</style>





 
