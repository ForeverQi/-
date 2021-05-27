<template>
   <div class="special-item">
     <div class="special-cover">
       <img class="special-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580754562447&di=d7787f1dd33dd42943d512ab3300451a&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120302%2F6445-1203021G20399.jpg" alt="">
     </div>
     <div class="special-desc">
       <p class="special-title">专题名称</p>
       <!-- <p class="special-date">2019-11-11 12:00</p> -->
       <p class="special-hot">快来看我赶海拾贝吧！快来看我赶海拾贝吧！</p>
     </div>
   </div>
</template>

<script>
export default {
   name: '',
   data() {
       return {}
   },
  components: {}
}
</script>

<style scoped lang="scss">
.special-item {
  padding: .2rem;
  display: flex;
  background: #fff;
  border-radius: .25rem;
  margin-bottom: .1rem;
  .special-img {
    width: 2.8rem;
    height: 1.8rem;
    margin-right: .35rem;
    border-radius: .05rem;
  }
  .special-desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .special-title {
      font-size: .26rem;
      line-height: .26rem;
      color: #031332;
    }
    .special-date {
      padding-top: .08rem;
      font-size: .17rem;
      line-height: .17rem;
      color: #B9BFC6;
    }
    .special-hot {
      font-size: .22rem;
      color: #7C8290;
      margin-top: .4rem;
    }
  }
}
</style>
