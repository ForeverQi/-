<template>
  <div class="send_warper">
    <div v-for=" (item,index) in list" :key="item.id" class="_rowBox">
      <div @click="change(index,'select') " class="_row paddl_r flex_rowBetwen">
        <span @click.stop="change(index,'checkBox')">
        	<span :class="item.checkBox ? 'sd_cBx-active m_r' :'sd_cBx m_r'"></span>{{item.name}}
        </span>
        <span>
          <img @click.stop="del(index)" class="p_icon" src="@/assets/images/shopSend/clear.png" />
          <img @click.stop="eidt(index)" class="p_icon" src="@/assets/images/shopSend/eidt.png" />
          <img :class="item.select ? 'tobottom' : 'toleft' " src="@/assets/images/shopSend/toleft.png" />
        </span>
      </div>
    	<transition name="fade" >
	      <div v-if="item.child.length > 0 && item.select" class="_child paddl_r  ">
	        <div class="divBox">
	          <span v-for="(iitem,iindex) in item.child" 
	          :key="iindex"  :class="iitem.select == 1 ? 'sd_btn _mini plain _radius' : 'sd_btn _mini _radius'">
	            {{iitem.name}}
							<img class="_colse" src="@/assets/images/shopSend/close.png" alt="">
	          </span>
	        </div>
	      </div>
    	</transition>
    	<transition name="fade" >
	      <div v-if="item.select" class="flex_rowBetwen inputBox paddt_b paddl_r">
	        <input class="input" v-model="childName" type="text" placeholder="请输入自定义规格参数" />
	        <span @click="addChild(index)" class="sd_btn _mini _radius">确 定</span>
	      </div>
			</transition>
    </div>
    <!-- 没有规格创建规格 -->
    <div v-if="list.length == 0" class="flex_center nomsg">
      <div>
        <img src="@/assets/images/shopSend/nospaec.png" />
        <p class="sd_info">没有可用规格，赶紧去创建吧</p>
        <div @click="addSpce" class="sd_btn _mid">
          <img class="_icon" src="@/assets/images/shopSend/optAdd.png" />新建规格
        </div>
      </div>
    </div>
    <!-- flexd button -->
    <div v-if="list.length !== 0" @click="addSpce" class="sd_btn sd_flexd plain">
      <img src="@/assets/images/shopSend/add.png" class="_icon" />
      新增规格
    </div>
    <!-- 保存 -->
    <div v-if="list.length !== 0" class="F">
      <div class="sn_fiexdH"></div>
      <div class="sd_btn">保存选择</div>
    </div>    <!-- model -->
    <transition name="fade" >
      <div v-show="showModel" class="sd_model">
        <div  class="sd_model_title">新增规格</div>
        <input type="text" v-model="spceName" placeholder="请输入规格名称">
        <div class="sd_model_button">
          <span @click="addSpce" class="_canle">取消</span>
          <span @click="sure" class="_sure">确定</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>

export default {
  mame: "specDetail",
  data() {
    return {
      showModel: false,
      list: [
	      // {
	      //   id: 1,
	      //   name: "颜色",
	      //   select:false,
	      //   checkBox:false,
	      //   child: [
	      //     { name: "S", id: 1, select: 1 },
	      //     { name: "M", id: 1, select: 0 },
	      //     { name: "L", id: 1, select: 0 },
	      //     { name: "XL", id: 1, select: 0 },
	      //   ]
	      // },
      ],
      spceName:"",//规格名称
      temp:"",    //编辑规格名称时存的值
      childName:"",//规格参数
    }
  },
  created() {

  },
  moutend() {

  },
  methods: {
		del(index){
			this.list.splice(index,1)
		},
		eidt(index){
			this.spceName = this.list[index].name
			this.temp ={
				index,
				query:this.list[index]
			} 
			this.showModel = true
		},
  	change(index,key){
  		this.list[index][key] = !this.list[index][key]
  	},
  	// 显示弹出层
    addSpce() {
      this.showModel = !this.showModel;
    },
    // 添加规格参数
    addChild(index){
    	if(this.childName == ''){
				layer.msg('请输入规格参数');
    		return
    	}
    	// 添加
    	this.list[index].child.push({
    		id:this.list[index].child.length+1,
    		name:this.childName,
    		select:0
    	})
    },
    // 新增规格
    sure() {
    	if(this.spceName == '' ){
				layer.msg('请输入规格名称');
    		return
    	}
    	// 编辑
    	if(this.temp){
    		this.list[this.temp.index].name = this.spceName
    		this.temp = ''
    	}else{
	      let temp = {
					 id:this.list.length + 1,
					 name:this.spceName,
		       select:false,
		       checkBox:false,
					 child:[]
	      }
	      this.list.push(temp)
    	}
      this.spceName = ''
      this.showModel = false
    }
  }
}

</script>
<style lang="scss" scoped>
input {
  border: none;
}

.send_warper {
  height: 100%;
  .paddl_r {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }

  .paddt_b {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  ._row {
    line-height: 0.99rem;
    color: #222;
    font-size: 0.32rem;
    background: #fff;
    border-top: 1px solid #f1f1f1;
  }

  .sd_info {
    margin-top: 0.45rem;
  }

  ._child {
    text-align: left;
    background: #fff;
    padding-top: .2rem;
    .divBox {
      border-bottom: 1px solid #EDEDED;
    }

    .sd_btn {
      margin-right: 0.3rem;
      margin-bottom: 0.2rem;
      width: 1.2rem;
    }
  }

  .inputBox {
    background: #fff;
    padding-bottom: 0.2rem;

    .input {
      font-size: 0.26rem;
      height: 0.55rem;
      line-height: 0.55rem;
      width: calc(100% - 2rem);
    }
  }
	.p_icon{
		width: 0.3rem;
		vertical-align:middle;
		margin-right: 0.2rem;
	}
  .nomsg {
    height: 100%;
    background: #fff;
    text-align: center;
    img {
      width: 4.27rem;
      height: auto;
    }

    .sd_btn {
      margin: 0 auto;
      margin-top: 0.39rem;
      min-width: 1.2rem;
      ._icon {
        width: 0.2rem;
        margin-right: 0.1rem;
      }
    }
  }

}
.F{
	.sd_btn {
	  position: fixed;
	  bottom: 0.4rem;
	  left: 0px;
	  width: 100%;
	}
}
.sd_flexd {
  position: fixed;
  bottom: 0rem;
  left: 0px;
  width: 100%;
  font-size: 0.28rem;
  border: none;
  color: #222;
  background: #fff;

  ._icon {
    width: 0.38rem !important;
    height: 0.38rem !important;
  }
}

</style>
