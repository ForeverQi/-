<template>
  <div>
    <!-- 蒙版 -->
    <div class="mengban" v-if="timeType != 0" @click="mengbanClick"></div>
    <!-- 弹窗 -->
    <div :class="timeType == 0 ? 'classification_box' : 'classification_box transformCation'">
      <div class="timeTitle">
        <div class="timeTitle_left">
          <span @click="changeTitle(0)" :class="{isCheck : checkStatus == 0}">{{ yearValue }}</span>
          <span @click="changeTitle(1)" :class="{isCheck : checkStatus == 1}">{{beginTime2}}</span>
          <span>至</span>
          <span @click="changeTitle(2)" :class="{isCheck : checkStatus == 2}">{{afterTime2}}</span>
        </div>
        <div class="timeTitle_right">
          <span v-if="checkStatus == 0" style="color:#222222;">现在</span>
          <span v-if="checkStatus != 0" class="determine" @click="determineBtn">确定</span>
        </div>
      </div>

      <!-- 年月日选择 -->
      <div
        class="changeData"
        :class="yearShow == false ?  checkStatus == 2 ? 'moveTitle2' : 'moveTitle' : ''"
      >
        <div class="timeContent">
          <van-calendar
            title="年月日"
            :poppable="false"
            :show-confirm="false"
            :style="{ height: '5.6rem'}"
            :show-mark="false"
            @confirm="onConfirm"
            v-model="yearShow"
          />
        </div>
        <!-- 时间选择1 -->
        <van-datetime-picker
          v-model="beginTime"
          type="time"
          :min-hour="0"
          :max-hour="23"
          :swipe-duration="500"
          @change="beginTimeFun"
        />
        <!-- 时间选择2 -->
        <van-datetime-picker v-model="afterTime" @change="afterTimeFun" type="time" :min-hour="0" :max-hour="23" :swipe-duration="500"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timeType: {
      type: Number
    }
  },
  data() {
    return {
      yearShow: true,
      yearValue: "",
      checkStatus: 0,
      currentTime: "12:00",
      beginTime: "12:00",
      afterTime: "12:00",
      beginTime2:'',
      afterTime2:''
    };
  },
  mounted() {
    let date = new Date();
    this.yearValue = this.formatDate(date);
    this.beginTime = this.dateHours(date);
    this.afterTime = this.dateHours(date);
    this.beginTime2 = this.dateHours(date);
    this.afterTime2 = this.dateHours(date);
  },
  methods: {
    mengbanClick() {
      this.$emit("timeTypeFun", 0);
    },
    formatDate(date) {
      return `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日`;
    },
    dateHours(date){
        return date.getHours()+':'+date.getMinutes();
    },
    onConfirm(date) {
      this.yearValue = this.formatDate(date);
    },
    // 切换日期
    changeTitle(num) {
      this.checkStatus = num;
      this.yearShow = num != 0 ? false : true;
    },
    beginTimeFun(){
        this.beginTime2 = this.beginTime
    },
    afterTimeFun(){
        this.afterTime2 = this.afterTime
    },
    // 确认时间
    determineBtn() {}
  }
};
</script>
<style lang="scss" scoped>
.mengban {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  z-index: 100;
}
.classification_box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 7.09rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.26 0.26 0px 0px;
  transform: translateY(100%);
  transition: all 0.3s ease-in-out 0s;
  z-index: 110;
  border-top-left-radius: 0.26rem;
  border-top-right-radius: 0.26rem;
  overflow: hidden;
  .timeTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.42rem 0.44rem 0.5rem 0.3rem;
    .timeTitle_left {
      font-size: 0.28rem;
      color: #666666;
      span {
        margin-right: 0.2rem;
        position: relative;
        &:first-child {
          margin-right: 0.41rem;
        }
      }
    }
    .timeTitle_right {
      height: 0.5rem;
      overflow: hidden;
      .determine {
        width: 0.96rem;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        background: rgba(0, 122, 255, 1);
        border-radius: 0.25rem;
        display: inline-block;
        color: #fff;
      }
    }
  }
}
.transformCation {
  transform: translateY(0) !important;
  transition: all 0.3s ease-in-out 0s;
}
.isCheck {
  color: #222;
  font-weight: bold;
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 0.05rem;
    background: #007aff;
    border-radius: 0.03rem;
    left: 0;
    bottom: -0.11rem;
  }
}
.moveTitle {
  transform: translateX(-100%);
  transition: all 0.3s ease-in-out 0s;
}
.moveTitle2 {
  transform: translateX(-200%);
  transition: all 0.3s ease-in-out 0s;
}
.changeData {
  width: 100%;
  display: flex;
  // overflow: hidden;
  transition: all 0.3s ease-in-out 0s;
}
</style>

<style lang="scss">
.van-calendar__header-title {
  display: none !important;
}
.van-calendar__header {
  margin: 0 0.3rem !important;
  background: #fafafa;
  box-shadow: none;
  .van-calendar__month-title {
    display: none;
  }
}
.van-calendar__body {
  padding: 0 0.3rem;
}
.van-calendar__day {
  width: 14.285%;
  height: 0.8rem;
}
.van-calendar__selected-day {
  width: 0.79rem;
  height: 0.79rem;
  line-height: 0.79rem;
  background: #007aff;
  border-radius: 50%;
}
.van-calendar__day {
  color: #222222;
}
.van-calendar__day--disabled {
  color: #999999;
}
.timeContent,
.van-picker {
  transition: all 0.3s ease-in-out 0s;
  width: 100%;
  flex: none;
  padding: 0 0.3rem;
}
.van-picker {
  padding: 0 0.3rem;
}
.van-picker__toolbar {
  display: none;
}
.selected {
  position: absolute;
  top: 0;
  left: 0;
  width: 20rpx;
  height: 20rpx;
  background: #f00;
}
.van-picker-column {
  &:first-child {
    .van-picker-column__item--selected {
        position: relative;
    //   &::before {
    //     content: "";
    //     display: block;
    //     right: 0;
    //     top: 40%;
    //     transform: translateY(-50%);
    //     position: absolute;
    //     width: 0.07rem;
    //     height: 0.07rem;
    //     background: #000;
    //     border-radius: 0.5rem;
    //   }
    //   &::after {
    //     content: "";
    //     display: block;
    //     right: 0;
    //     top: 60%;
    //     transform: translateY(-50%);
    //     position: absolute;
    //     width: 0.07rem;
    //     height: 0.07rem;
    //     background: #000;
    //     border-radius: 0.5rem;
    //   }
    }
  }
}
</style>