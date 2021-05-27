<template>
    <div>
        <div class="link_shop">
            <a href="javascript:;" class="link_shop_T">
                <span><img :src="info.propicpath" alt=""></span>
                <p>
                    <em>{{info.proname}}</em>
                    <i>&yen;{{info.prounitprice}}</i>
                </p>
            </a>
            <a href="javascript:;" class="link_shop_B" @click="send">发送商品</a>
        </div>
    </div>
</template>

<script>
    import {sendGoods} from '@/api/shop/chat'
    import util from '@/libs/util'

    // 商品
    export default {
        name: "chat-ctrl-wap-goods",
        props: ["data"],
        data() {
            return {
                info: {},
                params: {}
            }
        },
        created() {
            let params = util.chat.params();
            this.params = {
                proid: this.data.proid,
                user_id: params.user_id,
                user_user_id: params.uid,
            };
            sendGoods({
                ...this.params
            }).then(res => {
                if (util.functions.Len(res)) {
                    this.info = res;
                }
            });
        },
        methods: {
            // 发送商品
            send() {
                util.chat.send({
                    method: 'goods',
                    data: {
                        ...this.params,
                        content: this.info
                    }
                });
            }
        }
    }
</script>
