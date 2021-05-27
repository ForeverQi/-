<!--
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2021-03-26 09:47:53
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-03-26 10:32:49
 * @FilePath     : /vue-VFrontend/src/pages/shop/views/video/frontend/mapPage.vue
-->
<template>
  <div>

  </div>
</template>

<script>
import util from '@/libs/util'
  export default {
      data(){
          return {

          }
      },
      mounted(){
            let store = [];
            store[0] = this.$route.query.title;
            store[1] = this.$route.query.content;
            store[2] = this.$route.query.lng;
            store[3] = this.$route.query.lat;
            util.wechat.share(store, location.href, this.$route.query.username,2);
      }
  }
</script>


<style lang='scss' scoped>

</style>