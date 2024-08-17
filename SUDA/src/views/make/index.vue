<template>
	<div class="make-layout">
		<van-tabs v-model:active="active" title-active-color="#1989fa" color="#1989fa">
			<van-tab title="本地向导"></van-tab>
			<van-tab title="陪诊就医"></van-tab>
			<van-tab title="游戏游玩"></van-tab>
			<MakeList />
		</van-tabs>
	</div>
</template>

<script setup>
import MakeList from './makeList.vue';

const active = ref(0);
</script>

<style lang="less" scoped></style>
