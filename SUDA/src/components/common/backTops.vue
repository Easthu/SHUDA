<!--
 * @Author: Est
 * @Date: 2023-03-28 18:57:27
 * @LastEditors: Est
 * @LastEditTime: 2023-04-17 18:05:22
 * @FilePath: \public-zone美食专区\src\components\common\backTops.vue
 * @Description: 
-->
<!-- 吸顶组件  -->
<template>
    <div>
        <van-back-top :right="right" :offset="offset" :z-index="zIndex">
            <div v-if="slotShow">
                <slot></slot>
            </div>
            <div v-else>
                <img class="backupImg" src="@/assets/images/comImages/backTop.png" alt="" />
            </div>
        </van-back-top>
    </div>
</template>

<!-- 使用 -->
<!-- <backTop :slotShow="false">
</backTop>
import backTop from "@/components/common/backTop.vue" -->

<script setup name="backTop">
let props = defineProps({
    //距离页面右侧的距离
    right: {
        type: [Number, String],
        default: 30,
    },
    //距离页面底部的距离
    bottom: {
        type: [Number, String],
        default: 65,
    },
    //滚动高度达到此参数值时才显示组件
    offset: {
        type: [Number],
        default: 40,
    },
    //滚动高度达到此参数值时才显示组件
    zIndex: {
        type: [Number],
        default: 2222,
    },
    //是否自定义内容 
    slotShow: {
        type: Boolean,
        default: false
    },
})
</script>
<style scoped>
.backupImg {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0px 4px 7px 0px rgba(255, 96, 9, 0.3);
}
</style>

<style>
.van-back-top {
    bottom: 130px;
    bottom: calc(130px + constant(safe-area-inset-bottom));
    bottom: calc(130px + env(safe-area-inset-bottom));
}
</style>
