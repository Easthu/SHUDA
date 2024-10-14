<script setup>
// import { getUrlKey } from '@/utils/toolsValidate.js';
import { isWx } from '@/utils/weChatFunction';
import { getUrlKey } from '@/utils/toolsValidate.js';
import { requestApi } from 'api/home';

localStorage.setItem(
	'userInfo',
	'{"id":100001,"openid":"oDUCW6g94aOUdty0f7G87pJe9UHU","nickname":"梦生","head":"https://thirdwx.qlogo.cn/mmopen/vi_32/WfiaN9OfBQl1Sw3bqeibm63QiaREicQ4Xq1iaWrfwCRcF9bX7LcaVBhib9nKKb32mxHglsX2xMCyAWOuV7MRIOEIevwGY0IaIZGN3FTbT5tOcuOJQ/132","pid":0,"tell":"18883320700","ifproxy":3,"encryptioncode":"6b106171d8c4a06e55d01a374e0e5782"}'
);

const router = useRouter();
const code = getUrlKey('code');
const userInfo = localStorage.getItem('userInfo');
// if (code) {
// 	console.log('code :>> ', code);

// }
isWx().then((isWeChat) => {
	if (isWeChat == 'wx') {
		if (!code && !userInfo) {
			console.log('isWeChat :>> ', isWeChat);
			let redirectUri = window.location.origin + window.location.pathname;
			const wxUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa5f6f6ed39d9a7f&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
			window.location.href = wxUrl;
		} else if (code && !userInfo) {
			requestApi({
				op: 'login',
				co: code,
			}).then((res) => {
				console.log('login', res);
				if (res.code == 0) {
					localStorage.setItem('userInfo', JSON.stringify(res.data));
				} else if (res.code == 3) {
					localStorage.setItem('encryptioncode', res.encryptioncode);
					router.replace('/login');
				}
			});
		}
	}
});
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
