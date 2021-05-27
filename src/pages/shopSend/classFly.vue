<template>
  <div class="send_warper">
    <div class="_head">
      <div v-for=" ( item , index ) in list" :key="index" class="_row sd_tree">
        <div @click="item.bolen  = !item.bolen" :class="!item.bolen ? 'title' :  'title _active'">
          <img class="iconBase p_r" v-if="item.bolen" src="@/assets/images/shopSend/del.png">
          <img class="iconBase p_r" v-else src="@/assets/images/shopSend/add.png">{{item.name}}
        </div>
        <div v-if="item.child && item.bolen" v-for="(iitem,iindex) in item.child" :key="index" class="child">
          <div class="sd_tree">
            <div @click="iitem.bolen  = !iitem.bolen" class="title flex_rowBetwen">
              <span>
                <img class="iconBase p_r" src="@/assets/images/shopSend/del.png">
                {{iitem.name}}
              </span>
              <div class="flex_center p_r">
                <van-checkbox icon-size="14" shape="square"  v-model="iitem.checkBox"></van-checkbox>
              </div>
            </div>
            <div v-if="item.child && iitem.bolen" v-for="(xitem,xindex) in iitem.child" :key="xindex" class="child">
              <div class="sd_tree">
                <div class="title flex_rowBetwen ">
                  <span>
                    <img class="iconBase p_r" src="@/assets/images/shopSend/del.png">{{xitem.name}}
                  </span>
                  <div @click.stop="setCheckBox(xitem,index)" class="flex_center p_r">
                    <van-checkbox icon-size="14" shape="square"  v-model="xitem.checkBox"></van-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="F">
      <div class="sn_fiexdH"></div>
      <div @click="save" class="sd_btn">保存选择</div>
    </div>
  </div>
</template>
<script>
import { Uploader, Tab, Tabs, Image, Icon, Switch, Checkbox, Collapse, CollapseItem } from 'vant';
export default {
  components: {
    'van-uploader': Uploader,
    'van-image': Image,
    'van-icon': Icon,
    'van-switch': Switch,
    'van-checkbox': Checkbox,
    "van-collapse-item": CollapseItem,
    'van-collapse': Collapse,
    'van-tabs': Tabs,
    'van-tab': Tab,
  },
  data() {
    return {
      list: [{
          live: 1,
          name: "一级",
          checkBox: false,
          bolen: true,
          child: [{
            live: 2,
            name: "二级",
            checkBox: false,
            bolen: false,
            child: [{
              live: 3,
              name: "三级",
              checkBox: false,
              bolen: false
            }]
          }]
        },
        {
          live: 1,
          name: "一级",
          checkBox: false,
          bolen: true,
          child: [{
            live: 2,
            name: "二级",
            checkBox: false,
            bolen: false,
            child: [{
              live: 3,
              name: "三级",
              checkBox: true,
              bolen: false
            }]
          }]
        },
      ]
    }
  },
  crated() {

  },
  moutend() {

  },
  methods: {

    show(item, i) {
      if (item.live !== 1) {
        this.list[item.live].child[i].bolen = !item.bolen
        // for (var i = 0; i < this.list.length; i++) {
        // 	// if(this.list[i].live == item.live){
        // 	// }
        // }
      } else {
        this.list[i].bolen = !item.bolen
      }
    },
    setCheckBox(item, i) {
      console.log(item)
      this.list[item.live].checkBox = !item.checkBox
    },
    save(){
      this.$emit("close",this.list)
    }
  },
}

</script>
<style lang="scss" scoped>
._head {
  background: #fff !important;
}

._row {
  color: #222;
  text-align: left;
  cursor: pointer;
}

._active {
  background: #f2f2f2;
}

.sd_tree {
  .title {
    border-bottom: 1px solid #f1f1f1;
    font-size: 0.32rem;
    padding-left: 0.2rem;
    height: 0.99rem;
    line-height: 0.99rem;
  }

  .sd_tree {
    padding-left: 0.45rem;
  }
}


</style>
