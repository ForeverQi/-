<template>
  <div class="fee_page send_warper">
    <div @click='select(item.id)' v-for=" (item,index) in list" :key="index" class="_row">
      <div class=" flex_center">
        <span :class="is_select == item.id ? 'sd_radio-active' : 'sd_radio' "></span>
      </div>
      <div class="p_right">
        <div class="_title">
          包邮
        </div>
        <div class="_info">
          商家承担商品运费
        </div>
      </div>
      <div @click="todetail(item.id)" v-if="item.id !== 1" class="flex_center">
        <img class="edit" src="@/assets/images/shopSend/eidt.png" />
      </div>
    </div>
    <div class="F">
      <div class="sn_fiexdH"></div>
      <div @click="todetail(null)" class="sd_btn">
        <img src="@/assets/images/shopSend/add.png" class="p_icon" />
        新建运费模板
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"feeTemplte",
  data() {
    return {
      is_select:1,
      list: [
        {name:"包邮",id:1,info:""},
        {name:"包邮",id:2,info:""},
        {name:"包邮",id:3,info:""},
      ]
    }
  },
  crated() {

  },
  moutend() {

  },
  methods: {
    select(id){
      this.is_select = id
    },
    todetail(id){
      this.$router.push({
        path:"templteDetail",
        query:{
          id
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  .fee_page{
    height:100%;
    background:#fff;
    padding:0px 0.2rem;
    text-align: left;
    .F {
      .sd_btn{
        bottom: 0px;
      }
    }
    .p_icon{
      width: 0.5rem;
      vertical-align: middle;
      margin-top: -0.05rem;
      margin-right: -0.05rem;
    }
    ._row{
      height: 1.3rem;
      display:flex;
      border-bottom: 1px solid #f1f1f1;
      .p_right{
        flex:1;
        padding-left: 0.3rem;
        ._title{
          font-size: 0.32rem;
          color:#222;
          font-weight: 600;
          margin-top: 0.3rem;
        }
        ._info{
          font-size: 0.24rem;
          margin-top: 0.07rem;
          color:#999999;
        }
      }
      .edit{
        width: 0.35rem;
      }
    }
  }
</style>
