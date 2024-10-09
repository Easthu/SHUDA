<template>
	<div class="payouts-layout">
		<input type="tel" placeholder="银行卡卡号" v-model="ycard" />
		<input type="text" placeholder="持卡人姓名" v-model="name" />
		<input type="text" placeholder="银行" v-model="ybank" />
		<input type="text" placeholder="开户行" v-model="opencard" />
		<input type="tel" placeholder="提现金额" v-model="money" />
		<div class="button" @click="handleSubmit">确认</div>
	</div>
</template>

<script setup>
import { requestApi } from 'api/home';
import { showToast } from 'vant';
const router = useRouter();
const ycard = ref('');
const name = ref('');
const ybank = ref('');
const opencard = ref('');
const money = ref('');

// 提现
const handleSubmit = () => {
	if (!ycard.value) {
		return showToast('请输入银行卡卡号');
	}
	if (!name.value) {
		return showToast('请输入持卡人姓名');
	}
	if (!ybank.value) {
		return showToast('请输入银行');
	}
	if (!opencard.value) {
		return showToast('请输入开户行');
	}
	if (!money.value) {
		return showToast('请输入提现金额');
	}
	requestApi({
		ycard: ycard.value,
		name: name.value,
		ybank: ybank.value,
		opencard: opencard.value,
		op: 'stafftixian',
		vxid: JSON.parse(localStorage.getItem('userInfo')).id,
	}).then((res) => {
		if (res.code == 0) {
			router.back();
		}
	});
};
</script>

<style lang="less" scoped>
.payouts-layout {
	width: 100vw;
	height: 100vh;
	background: #f2f3f7;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	padding-top: 153px;
	input {
		outline: none;
		border: none;
		width: 656px;
		height: 86px;
		background: #ffffff;
		border-radius: 10px;
		margin-bottom: 23px;
		font-weight: 400;
		font-size: 30px;
		color: #000000;
		padding-left: 34px;
		box-sizing: border-box;
		&::-webkit-input-placeholder {
			color: #999999;
		}
	}
	.button {
		width: 318px;
		height: 106px;
		margin-top: auto;
		margin-bottom: 202px;
		font-weight: bold;
		font-size: 38px;
		color: #fefefe;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(90deg, #afe78a 0%, #49d573 100%);
		border-radius: 10px;
	}
}
</style>
