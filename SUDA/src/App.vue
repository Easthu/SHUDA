<script setup>
// import { getUrlKey } from '@/utils/toolsValidate.js';
import { requestApi } from 'api/home';

const router = useRouter();
if (import.meta.env.VITE_NODE_ENV == 'dev') {
	requestApi({
		op: 'login',
		encryptioncode: 'c964ac4a14eb7ecd739dca5b5c96eab5',
	}).then((res) => {
		if (res.code == 0) {
			sessionStorage.setItem('userInfo', JSON.stringify(res.data));
		} else if (res.code == 3) {
			sessionStorage.setItem('encryptioncode', res.encryptioncode);
			router.replace('/login');
		}
	});
}
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
