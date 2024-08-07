<!--
 * @Author: Est
 * @Date: 2023-04-10 18:51:33
 * @LastEditors: Est
 * @LastEditTime: 2023-04-24 20:06:38
 * @FilePath: \public-zone美食专区\src\views\index\index.vue
 * @Description:
-->
<template>
    <router-view />
    <van-tabbar placeholder z-index="9999" v-model="active" active-color="#333333" inactive-color="#999999" route v-if="dataSource.tabbarList.length"
        safe-area-inset-bottom>
        <van-tabbar-item replace :class="{ tabbaritem: true }" :to="itemRouter.routerPath"
            v-for="itemRouter in dataSource.tabbarList" :key="itemRouter.routerPath">
            <span>{{ itemRouter.name }}</span>
            <template #icon="props">
                <img :src="props.active ? itemRouter.activeIcon : itemRouter.disActiveIcon" />
            </template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script setup>
import { Tabbar, TabbarItem } from 'vant'
import { getMobileTypeConfigList } from "@/utils/globalConfiguration"
const active = ref(0)
//获取tabbar配置列表
const dataSource = reactive({
    tabbarList: []
})
dataSource.tabbarList = getMobileTypeConfigList().getTabbarList
</script>

<style lang="less" scoped>
</style>