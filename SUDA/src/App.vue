<script setup>
// import { getUrlKey } from '@/utils/toolsValidate.js';
</script>

<template>
	<!-- vue3.0配置 -->
	<router-view v-slot="{ Component }">
		<keep-alive>
			<component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name" />
		</keep-alive>
		<component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name" />
	</router-view>
</template>

<style>
@import './style.css';

html,
body,
#app {
	font-family: '.PingFang SC, .PingFang SC-Regular';
	background: #f5f5f5;
	-webkit-overflow-scrolling: touch;
}

/* 去掉滚动条 */
::-webkit-scrollbar {
	width: 0 !important;
}

::-webkit-scrollbar {
	width: 0 !important;
	height: 0;
}
</style>
