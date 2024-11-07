<template>
	<div class="qrcode">
		<img src="@/assets/images/home/rocode-bg.png" alt="" />
		<p>服务正式开始</p>
		<div class="button" @click="getQrcode">确认</div>
	</div>
</template>

<script setup>
import { requestApi } from 'api/home';
import { showToast } from 'vant';

const router = useRouter();
const route = useRoute();
const { ordernum, staffid } = route.query;
const getQrcode = async () => {
	const res = await requestApi({
		op: 'scancodes',
		staffid,
		ordernum,
		nameid: JSON.parse(sessionStorage.getItem('userInfo')).id,
	});
	if (res.code == 0) {
		showToast('开始服务');
		setTimeout(() => {
			router.push('/home');
		}, 2000);
	}
};
</script>

<style lang="less" scoped>
.qrcode {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #fff;
	img {
		margin-top: 200px;
	}
	p {
		margin-top: 70px;
		font-weight: 400;
		font-size: 40px;
		color: #000000;
	}
	.button {
		margin-top: auto;
		width: 360px;
		height: 90px;
		background: #f2f2f2;
		border-radius: 10px;
		font-weight: bold;
		font-size: 40px;
		color: #00a44a;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 180px;
	}
}
</style>
