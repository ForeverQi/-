<!--
 * @Author       : qwguo
 * @description  : description
 * @Date         : 2020-07-06 14:36:35
 * @LastEditors  : qwguo
 * @LastEditTime : 2021-01-27 10:05:08
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\video\backend\components\PageHead.vue
-->
<template>
<div class="page-title" :style="{'padding-top': $store.getters.variables.many.BarHeight/2+'px'}">
    <div class="inner">
        <i @click="GoBack" class="sjzs-icon s-icon-left-1"></i>
        <h5 v-if="title">{{title}}</h5>
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'PageHead',
    props:{
        title: {type: String},
        backPage: {type: String}
    },
    data(){
        return {

        }
    },
    methods:{
        GoBack(){
            let that = this;
            if(that.$listeners['backFun']){
                that.$emit('backFun');
            }else{
                this.$util.functions.GoBack();
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.page-title {
    position: relative;
    flex-shrink: 0;
    background-color: #fff;
    .inner{
        flex-grow: 1;
        position: relative;
        height: 1rem;
        // background-color: #fff;
        border-bottom: 1px solid rgba(237, 237, 237, 1);
    }
    .sjzs-icon{
        color:#999999;
    }
    .s-icon-left-1 {
        cursor: pointer;
        z-index: 2;
        width: 0.55rem;
        height: 100%;
        font-size: .37rem;
        left: 0;
        top: 0;
        font-weight: 100;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    h5 {
        text-align: center;
        font-size: 0.34rem;
        color: rgba(34, 34, 34, 1);
        margin: 0;
        line-height: 1rem;
    }
}
</style>
