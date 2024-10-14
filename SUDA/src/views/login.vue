<script setup name="login">
import checkedIcon from '@/assets/images/icons/make-detail-checked.png';
import checkNotIcon from '@/assets/images/icons/make-detail-check-not.png';
import { requestApi } from 'api/home';
import { showToast } from 'vant';

const router = useRouter();

const phone = ref('');
const code = ref('');
const timeOut = ref(300);
const handleFecthCode = async () => {
	if (timeOut.value > 0) {
		if (!/^1[3456789]\d{9}$/.test(phone.value)) {
			return showToast('手机号码有误，请重填');
		}
		const res = await requestApi({
			op: 'sendcode',
			tell: phone.value,
		});
		console.log('res :>> ', res);
		showToast('验证码发送成功');
		setTimeOut();
	} else {
		timeOut.value = 300;
	}
};

const handleLogin = async () => {
	if (code.value.length < 6) {
		return showToast('验证码错误');
	}
	if (!checked.value) {
		return showToast('请勾选用户协议');
	}
	const res = await requestApi({
		op: 'yzcode',
		pctell: phone.value,
		pccode: code.value,
		encryptioncode: localStorage.getItem('encryptioncode'),
	});
	localStorage.setItem('userInfo', JSON.stringify(res.data));
	router.go(-1);
};

const setTimeOut = () => {
	setTimeout(() => {
		timeOut.value--;
		if (timeOut.value > 0) {
			setTimeOut();
		}
	}, 1000);
};
const checked = ref(false);
</script>
<template>
	<div class="loginBox">
		<div class="phone-box">
			<input type="tel" placeholder="请输入用户名" v-model="phone" />
			<span @click="handleFecthCode">{{
				timeOut == 300 ? '获取验证码' : `${timeOut}s后获取`
			}}</span>
		</div>
		<div class="code-box">
			<input type="tel" placeholder="请输入用户名" v-model="code" maxlength="6" />
		</div>
		<div class="login-btn" @click="handleLogin">登录</div>
		<div class="spe-sel">
			<img :src="checked ? checkedIcon : checkNotIcon" alt="" @click="checked = !checked" />
			已阅读同意
			<span> 《用户服务协议》 </span>
			和
			<span> 《隐私政策》 </span>
		</div>
	</div>
</template>
<style lang="less" scoped>
.loginBox {
	width: 100vw;
	height: 100vh;
	background: url('../assets/images/home/login-bg.png') no-repeat;
	background-size: 100% 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.phone-box {
		width: 630px;
		height: 110px;
		background: rgba(0, 0, 0, 0.39);
		border-radius: 55px;
		display: flex;
		font-weight: 400;
		font-size: 28px;
		color: #dbdbdb;
		align-items: center;
		margin-top: 453px;
		span {
			font-weight: 400;
			font-size: 28px;
			color: #93f582;
			text-decoration-line: underline;
			margin-left: auto;
			margin-right: 34px;
		}
	}
	.code-box {
		width: 630px;
		height: 110px;
		background: rgba(0, 0, 0, 0.39);
		border-radius: 55px;
		font-weight: 400;
		font-size: 28px;
		color: #dbdbdb;
		display: flex;
		align-items: center;
		margin-top: 40px;
	}
	input {
		background: rgba(0, 0, 0, 0);
		border: none;
		outline: none;
		font-weight: 400;
		font-size: 28px;
		color: #dbdbdb;
		margin-left: 73px;
	}
	input::placeholder {
		font-weight: 400;
		font-size: 28px;
		color: #dbdbdb;
	}
	.login-btn {
		width: 421px;
		height: 98px;
		background: #93f582;
		border-radius: 49px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 400;
		font-size: 34px;
		color: #061710;
		margin-top: auto;
	}
	.spe-sel {
		display: flex;
		align-items: center;
		margin-bottom: 100px;
		margin-top: 30px;
		font-weight: 400;
		font-size: 24px;
		color: #ffffff;
		span {
			text-decoration-line: underline;
		}
		img {
			width: 30px;
			height: 30px;
			margin-right: 16px;
		}
	}
}
</style>
