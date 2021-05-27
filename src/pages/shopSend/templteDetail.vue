<template>
  <div class="send_warper">
    <div class="sd_head mb_20 fixedTop">
      <div class="_title_box">
        <span class="_title">模版名称</span>
        <input type="text" placeholder="请输入运费模版名称"/>
      </div>
    </div>
    <div class="fixedHeight"></div>
    <div class="sd_body">
      <div class="model mb_20">
        <div class="p_plane">
          <div class="_title_box brder_b">
            <span class="_title fw">默认运费</span>
            <input class="fw" type="text" placeholder="0.00"/>
          </div>
          <div class="_title_box brder_b flex_rowBetwen">
            <span class="_title ">默认运费</span>
            <span class="flex_center ">
              <span class="sd_info" >按件数计算</span>
              <img :class="select ? 'tobottom' : 'toleft' " src="@/assets/images/shopSend/toleft.png" />
            </span>
          </div>
          <div class="p_contentBox">
            <div class="info">
              <input class="input" type="text" />件内
              <input class="input" type="text" />元
            </div>
            <div class="info">
              每增加<input class="input" type="text" />件，
              运费增加<input class="input" type="text" />元
            </div>
          </div>
        </div>
      </div>
      <div v-for="(item,index) in list" :key="index" class="model mb_20">
        <div class="p_plane">
          <!-- 选择地区 -->
          <div @click="showModel = true" class="_title_box brder_b flex_rowBetwen">
            <span class="_title fw">选择地区</span>
            <span class="flex_center ">
              <img :class="select ? 'tobottom' : 'toleft' " src="@/assets/images/shopSend/toleft.png" />
            </span>
          </div>
          <div @click="showPicker = true" class="_title_box brder_b flex_rowBetwen">
            <span class="_title ">默认运费</span>
            <span class="flex_center ">
              <span class="sd_info" >按件数计算</span>
              <img :class="select ? 'tobottom' : 'toleft' " src="@/assets/images/shopSend/toleft.png" />
            </span>
          </div>
          <div class="p_contentBox">
            <div class="info">
              <input class="input" type="text" />件内
              <input class="input" type="text" />元
            </div>
            <div class="info">
              每增加<input class="input" type="text" />件，
              运费增加<input class="input" type="text" />元
            </div>
          </div>
        </div>
        <div @click="del(index)" class="del flex_center">
          <img src="@/assets/images/shopSend/close2.png" >
        </div>
      </div>
    </div>  
    <div @click="addTemplete" class="p_btn sd_btn plain">
      <img class="_icon" src="@/assets/images/shopSend/add3.png" />
      添加指定地区运费
    </div>
    <!--  -->
    <div class="F">
      <div class="sn_fiexdH"></div>
      <div class="sd_btn sd_noradiusBtn flex_flex_rowBetwen ">
        <div  @click="del" v-if="is_edit" class="sd_btn sd_noradiusBtn">
          删除该模版
        </div>
        <div class="sd_btn sd_noradiusBtn p_save">
          保存选择
        </div>
      </div>
    </div>
    <!--  -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 选择地区弹窗 -->
    <div :class=" showModel ? 'sd_address fixedTop' : 'sd_address fixedTop translateY100 '  ">
      <div class="_headTop">
        <span @click="showModel = false">取消</span>
        <div>选择地区</div>
        <span @click="showModel = false">确定</span>
      </div>
      <div class="navHieght"></div>
      <div class="sd_content">
        <div v-for="(item,index) in mapJson" :key="index" class="p_child">
          <div @click="item.select = !item.select" class="p_row">
           <span> {{item.name}}</span>
           <div class="flex_center">
              <!-- 自己控制显示隐藏 -->
              <img class="gougou" src="@/assets/images/shopSend/5.png" />
           </div>
          </div>
          <div v-if="item.select" class="p_child">
            <van-radio-group  v-model="item.selectId">
              <div v-for="(iitem,iindex) in item.child" class="p_row">
                <div class="flex_center"> 
                  <van-radio icon-size="16" :name="iitem.id">{{iitem.name}}</van-radio>
                </div>
                <div class="flex_center">
                  <img class="gougou" src="@/assets/images/shopSend/5.png" />
                </div>
              </div>
            </van-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog , Picker ,Popup , Radio,RadioGroup } from 'vant';
export default {
  name:"templteDetail",
  components:{
    'van-popup':Popup,
    'van-picker':Picker,
    'van-radio':Radio,
    'van-radio-group':RadioGroup
  },
  data() {
    return {
      select:false,
      is_edit:false,
      list:[1],
      mapJson:[
        {
          name:"北京",
          selectId:1,
          child:[
            {name:"朝阳",id:1},
            {name:"房山",id:2},
          ],
          select:false,id:1,
        },
        {
          name:"四川",
          selectId:2,
          child:[{
            name:"武侯区",
            id:2,
          }],
          select:false,id:2,
        },
      ],
      value:"",
      columns: ["按件数计费","按重量计费"],
      showModel:false,
      showPicker:false
    }
  },
  created() {
    this.is_edit = this.$route.query.id ? true : false ; 
  },
  mounted(){

  },
  methods: {
    // showModel
    del(index){
      Dialog.confirm({
        title: '提示',
        message: '确定删除该模板?'
      }).then(() => {
        this.list.splice(index,1)
        // on confirm
      }).catch(() => {
        // on cancel
      });
    },
    addTemplete(){
      this.list.push(1)
    },
    onConfirm(value){
      this.value = value;
      this.showPicker = false;
    }
  }
}

</script>
<style lang="scss" scoped>
  .send_warper{
    .gougou{
      width:0.3rem;
    }
    text-align: left;
    .fixedHeight{
      height: 1.4rem;
    }
    .flex_flex_rowBetwen{
      display: flex;
      justify-content: space-between;
      padding: 0px;
      .sd_btn{
        position: relative;
        width: 50%;
        flex:1;
        color: #333;
        background: #fff;
        &.p_save{
          background: #FF9900;
          color: #fff;
        }        
      }
    }
    .input{
      border:none;
      background: #F5F5F9;
      border-radius: 0.05rem;
      width: 1.26rem;
      height: 0.63rem;
      padding: 0px 0.1rem;
    }

    .brder_b{
      border-bottom: 1px solid #f1f1f1;
    }
    .sd_info{
      font-size: 0.24rem;
      padding-right: 0.2rem;
    }

    .p_btn{
      display: block;
      width: calc(100% - 0.5rem);
      background: #fff;
      margin:0px auto;
      margin-top: 0.2rem;
      border:none;
      border-radius: 0.06rem;
      ._icon{
        width: 0.28rem !important;
        height: 0.28rem !important;
        margin-right: 0.1rem;
      }
    }
    .F{
      .sd_btn{
        bottom: 0px;
      }
    }
  }
  .sd_head{
    padding:0.2rem 0.25rem;
    background: #fff;
  }
  .sd_body{
    margin-bottom: 0.2rem;
/*    height: calc(100vh - 1.0rem);
    overflow-y: scroll;*/
    .model{
      padding-left: 0.25rem;
      display: flex;
      background: #fff;
      .p_plane{
        flex:1;
        .p_contentBox{
          .info{
            font-size: 0.24rem;
            color: #555555;
            margin:0.3rem 0px;
            .input{
              margin:0px 0.1rem;
            }
          }
        }
      }
      .del{
        width:1.12rem;
        border-left: 1px solid #f1f1f1;
        img{
          width: 0.28rem;
        }
      }
    }
  }

  .sd_address{
    height: 100%;
    background: #fff;
    transition: 0.25s;
    transform: translateY(0%);
    overflow: hidden;
    z-index: 99;
    ._headTop{
      position: absolute;
      top: 0px;
      left: 0px;
      width:100%;
      display: flex;
      justify-content: space-between;
      height: 0.9rem;
      line-height:0.9rem;
      border-bottom: 1px solid #f1f1f1;
      padding: 0px 0.25rem;
      span{
        font-size: 0.24rem;
        color: #111;
        &:last-child{
          color:#FF9900;
        }
      }
      div{
        font-size: 0.34rem;
        color: #111;
        font-weight: 600;
      }
    }
    .navHieght{
      height: 0.9rem;
    }
    .sd_content{
      color: #111;
      font-size: 0.32rem;
      height:calc(100vh - 0.9rem );
      overflow-y: scroll;
      .p_row{
        height: 1.0rem;
        line-height: 1.0rem;
        padding-right: 0.25rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;
        .m_r{
          margin-right: 0.2rem;
        }
        .p_info{
          color: #A9A9A9;
        }
        .p_orange{
          color: #FF9900;
        }
      }
      .p_child{
        padding-left: 0.25rem;
        .p_child{
          padding-left: 0.5rem;
        }
      }
    }
  }
</style>
