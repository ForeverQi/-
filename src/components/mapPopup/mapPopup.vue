<!--
 * @Author       : zhouqi
 * @description  : 达达配送地图组件
 * @Date         : 2021-04-20 14:51:20
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-06-03 16:47:08
 * @FilePath     : /vue-VFrontend/src/components/mapPopup/mapPopup.vue
-->

<template>
  <!-- <div v-if="location == 1"> -->
  <bm-overlay
    ref="customOverlay"
    :class="{ sample: location == 1, sample2: location == 2 }"
    pane="labelPane"
    @draw="draw"
  >
    <div>
      <img
        v-if="location == 1"
        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/userLocation.png"
        alt=""
      />
      <!-- 配送员样式 -->
      <div v-if="location == 2">
        <div class="customCallout">
          <div class="map_icon">
            <img
              src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/qsPortrait.png"
              alt=""
            />
          </div>
          <div class="map_content">
            <span>骑手距您</span>
            <div style="color: #f00">
              {{
                distanceData >= 1
                  ? distanceData + "KM"
                  : distanceData * 1000 + "M"
              }}
            </div>
          </div>
          <div class="map_dot">
            <div class="map_dotChild"></div>
          </div>
        </div>
      </div>
    </div>
  </bm-overlay>
  <!-- </div> -->
</template>

<script>
export default {
  props: ["text", "position", "active", "location", "optionsVal","distanceData"],
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload();
      },
      deep: true
    },
    optionsVal:{
      handler(val) {
        this.optionsVal =val;
      },
      deep: true
    }
  },
  data() {
    return {
      dadaInterVal: 0
    };
  },
  mounted() {
    
  },
  methods: {
    draw({ el, BMap, map }) {
      const { lng, lat } = this.position;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
  }
};
</script>

<style>
.sample,
.sample2 {
  position: absolute;
}
.sample img,
.sample2 img {
  width: 50px;
  height: 60px;
}
.customCallout {
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 0.60rem;
  height: 0.80rem;
  padding: 0 0.20rem 0 0.10rem;
  display: flex;
  align-items: center;
  box-shadow: 0.04rem 0rem 0.14rem #ccc;
  position: relative;
  z-index: 100;
}
.customCallout:before {
  content: "";
  position: absolute;
  z-index: 10;
  bottom: -0.04rem;
  left: 50%;
  transform: translateX(-50%);
  border-top: 0.05rem solid #fff;
  border-left: 0.05rem solid transparent;
  border-right: 0.05rem solid transparent;
}
.map_dot {
  position: absolute;
  z-index: 1;
  bottom: -0.2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  width: 0.20rem;
  height: 0.20rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.map_dotChild {
  width: 90%;
  height: 90%;
  background: #f00;
  border-radius: 50%;
}
.map_icon{
  width: 0.70rem;
  height: 0.60rem;
}
.map_icon img{
    width: 100%;
    height: 100%;
    vertical-align: super;
}

.map_content {
  flex: 0 1 auto;
  margin-left: 0.10rem;
  font-size: 0.26rem;
  display: flex;
  white-space: nowrap;
  align-items: center;
}
</style>
