<script setup>
// import { getUrlKey } from '@/utils/toolsValidate.js';
import { isWx } from '@/utils/weChatFunction';
import { getUrlKey } from '@/utils/toolsValidate.js';
import { requestApi } from 'api/home';

const code = '041saRGa1JuZeI0ZxUFa1Ekj9e1saRGH';

localStorage.setItem('encryptioncode', '6b106171d8c4a06e55d01a374e0e5782');
// requestApi({
// 	op: 'login',
// 	co: code,
// }).then((res) => {
// 	console.log(res);
// });
// const code = getUrlKey('code');
if (code) {
	console.log('code :>> ', code);
	localStorage.setItem('wxCode', code);
}
if (!code && !localStorage.getItem('wxCode')) {
	// isWx().then((isWeChat) => {
	// 	console.log('isWeChat :>> ', isWeChat);
	// 	if (isWeChat == 'wx') {
	// 		let redirectUri = window.location.origin + window.location.pathname;
	// 		const wxUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa5f6f6ed39d9a7f&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
	// 		// window.location.href = wxUrl;
	// 	}
	// });
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
