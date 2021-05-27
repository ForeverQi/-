<template>
  <div class="pub-wrapper list">
    <div class="wrapper_c">
      <div class="max_color"><div class="max_color_c"></div></div>
      <div class="Max_cart">
        <div class="head-tit">
          <a class="return" :href="url1"
            ><img src="../static/images/return.jpg" alt=""
          /></a>
          <span>购买记录</span>
          
        </div>
        <div class="max-list" v-if="list.length">
          <div class="list-li" v-for="(item,index) in list" :key="index">
            <div class="list-tit">
              <span>{{item.cur_vip}}</span>
              <div class="mony">
                <em>&yen;</em>
                <p>{{item.price}}</p>
              </div>
            </div>
            <div class="list-con">
              <div class="list-con-txt">
                <span>订单号：</span>
                <p>{{item.id}}</p>
              </div>
              <div class="list-con-txt">
                <span>有效期：</span>
                <p>{{item.end_date}}</p>
              </div>
              <div class="list-con-txt">
                <span>升级前等级：</span>
                <p>{{item.before_vip}}</p>
              </div>
              <div class="list-con-txt">
                <span>支付方式：</span>
                <p>{{item.payment_text}}</p>
              </div>
              <div class="list-con-txt">
                <span>支付时间：</span>
                <p>{{item.zf_time}}</p>
              </div>
              <div class="list-con-txt">
                <span>支付交易号：</span>
                <p>{{item.zf_order_id}}</p>
              </div>
            </div>
            <div class="list-con">
              <div class="list-con-txt">
                <span>赠送信息：</span>
                <p>{{item.zs_message}}</p>
              </div>
              <div class="list-con-txt">
                <span>备注：</span>
                <p>{{item.remarks}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="max-list" v-else>
          <div class="no-data">
            <span><img src="../static/images/no-data.png" alt="" /></span>
            <p>没有任何记录～</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList } from "@/api/vipCartMarketing/MarketingIndex.js";
export default {
    data(){
        return{
            list:[],
            url1:''
        }
    },
  mounted() {
    this.url1 = `/VFrontend/vipCartmarketing/views/marketingindex?username=${this.$route.query.username}`;
    this.getOrderListFun();
  },
  methods: {
    getOrderListFun() {
      let that = this;
      let paramJson = {
        username: that.$route.query.username,
         zz_userid: that.$cookies.get("zz_userid"),
        zz_shellCode: that.$cookies.get("zz_shellCode"),
            page:1
      };
      getOrderList(paramJson)
        .then((res) => {
          that.list = res.list;
        })
        .catch((err) => {
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/pages/vipCartMarketing/static/css/vipCart-style.scss";
.head-tit {
  width: 100%;
  height: 0.88rem;
  background: #fff;
  border-bottom: 1px solid #ededed;
}
.head-tit span {
  font-size: 0.32rem;
  color: #222;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  line-height: 0.88rem;
  text-align: center;
  top: 0;
  width: 50%;
}
.return {
  display: block;
  width: 0.21rem;
  height: 0.38rem;
  padding: 0.24rem 0.25rem; box-sizing: initial;
}
.return img {
  display: block;
  width: 0.21rem;
  height: 0.38rem;
}
.max_color {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.max_color_c {
  background: #f6f7f9;
  width: 100%;
  height: 100%;
}
.max-list {
  padding: 0rem 0.24rem;
}
.list-li {
  margin-top: 0.2rem;
  border-radius: 0.2rem;
  background: #fff;
  padding: 0rem 0.4rem;
}
.list-tit {
  height: 0.9rem;
  overflow: hidden;
  span {
    font-size: 0.32rem;
    color: #222;
    float: left;
    line-height: 0.9rem;
  }
  .mony {
    color: #222;
    float: right;
    em {
      font-size: 0.24rem;
      float: left;
      font-style: inherit;
      line-height: 1rem;
    }
    p {
      font-size: 0.38rem;
      float: left;
      font-weight: 700;
      margin: 0;
      line-height: 0.9rem;
    }
  }
}

.list-con {
  padding: 0.25rem 0;
  border-top: 1px solid #ededed;
}
.list-con-txt {
  margin-bottom: 0.25rem;
}
.list-con-txt span,
.list-con-txt p {
  display: block;
  font-size: 0.28rem;
  margin: 0;
}
.list-con-txt span {
  color: #888;
  float: left;
      width: 1.7rem;
    text-align: right;
}
.list-con-txt p {
  color: #222;
  overflow: hidden;
  word-break: break-all;
}
.list-con-txt:last-child {
  margin-bottom: 0;
}
.no-data{
  width: 100%;
  padding-top: 1rem;
  span{
    display: block;
    width: 1.81rem;
    height: 1.81rem;
    margin: 0 auto;
    margin-bottom: 0.23rem;
    img{
      width: 1.81rem;
      height: 1.81rem;
    }
  }
  p{display: block;text-align: center;font-size: 0.28rem;color: #999;}
}
</style>