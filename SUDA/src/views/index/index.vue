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
	<van-tabbar v-model="active">
		<van-tabbar-item icon="home-o">标签</van-tabbar-item>
		<van-tabbar-item icon="search">标签</van-tabbar-item>
		<van-tabbar-item icon="friends-o">标签</van-tabbar-item>
		<van-tabbar-item icon="setting-o">标签</van-tabbar-item>
	</van-tabbar>
</template>

<script setup>
import { Tabbar, TabbarItem } from 'vant';
const active = ref(0);
</script>

<style lang="less" scoped></style>
