<template>
	<div class="makeTextualResearch">
		<div class="form-item">
			<div class="item-left">报考项目</div>
			<div class="item-sel" @click="showProject = true">
				{{ makeForm.project }} <van-icon name="arrow-down" />
			</div>
		</div>
		<van-popup v-model:show="showProject" position="bottom">
			<van-picker :columns="columns" @confirm="onConfirm" @cancel="showProject = false" />
		</van-popup>
		<div class="form-item">
			<div class="item-left">姓名</div>
			<div class="item-input">
				<input v-model="makeForm.username" />
			</div>
		</div>
		<div class="form-item">
			<div class="item-left">性别</div>
			<div class="item-sel" @click="showSex = true">
				{{ makeForm.sex }}<van-icon name="arrow-down" />
			</div>
		</div>
		<van-popup v-model:show="showSex" position="bottom">
			<van-picker :columns="sexColumns" @confirm="onSexConfirm" @cancel="showSex = false" />
		</van-popup>
		<div class="form-item">
			<div class="item-left">年龄</div>
			<div class="item-sel" @click="showAge = true">
				{{ makeForm.age }}<van-icon name="arrow-down" />
			</div>
		</div>
		<van-popup v-model:show="showAge" position="bottom">
			<van-picker :columns="ageColumns" @confirm="onAgeConfirm" @cancel="showAge = false" />
		</van-popup>

		<div class="form-item mat130">
			<div class="item-left">
				<i class="iconfont">&#xe62a;</i>
				手机号
			</div>
			<div class="item-input">
				<input v-model="makeForm.tel" type="tel" />
			</div>
		</div>
		<div class="form-item">
			<div class="item-left">
				<i class="iconfont">&#xe600;</i>
				验证码
			</div>
			<div class="item-input wid200">
				<input v-model="makeForm.sms" type="tel" />
			</div>
			<div class="item-sms">获取验证码</div>
		</div>

		<div class="bottom-btn mat130">
			<div class="confirm" :style="{ backgroundImage: `url(${confirm})` }">提交申请</div>
		</div>
	</div>
</template>

<script setup>
import confirm from '@/assets/images/icons/confirm.png';
const makeForm = reactive({
	username: '',
	sex: '',
	project: '',
	age: '',
	tel: '',
	makeForm: '',
});
const showProject = ref(false);
const showSex = ref(false);
const showAge = ref(false);

const onConfirm = (value) => {
	makeForm.project = value['selectedOptions'][0].text;
	showProject.value = false;
};
const onSexConfirm = (value) => {
	makeForm.sex = value['selectedOptions'][0].text;
	showSex.value = false;
};
const onAgeConfirm = (value) => {
	makeForm.age = value['selectedOptions'][0].text;
	showAge.value = false;
};
const columns = [
	{ text: '考证导游资格证书', value: '1' },
	{ text: '驾驶证', value: '2' },
	{ text: '陪诊师证', value: '3' },
	{ text: '普通话证书', value: '4' },
	{ text: '心理咨询师证', value: '5' },
	{ text: '急救证', value: '6' },
	{ text: '心理咨询师证书', value: '7' },
	{ text: '英语等级证书', value: '8' },
];
const sexColumns = [
	{ text: '男', value: '1' },
	{ text: '女', value: '2' },
];
const ageColumns = ref([]);
for (let i = 1; i < 100; i++) {
	ageColumns.value.push({ text: i, value: i });
}

const handleSubmit = () => {
	console.log('提交');
};
const router = useRouter();
const hanldeBack = () => {
	router.back();
};
</script>

<style lang="less" scoped>
.makeTextualResearch {
	min-height: 100vh;
	width: 100vw;
	background: #f2f3f7;
	padding: 20px;
	box-sizing: border-box;
	font-size: 26px;
	padding-top: 150px;

	.form-item {
		width: 656px;
		height: 86px;
		background: #ffffff;
		border-radius: 10px;
		margin: auto;
		margin-bottom: 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 35px;
		font-weight: 500;
		font-size: 30px;
		color: #000000;
		box-sizing: border-box;
		.item-left {
			flex-shrink: 0;
			margin-right: 24px;
		}
		.item-input {
			flex: 1;
			input {
				flex: 1;
				border: none;
				outline: none;
			}
		}
		.item-sel {
			.van-icon {
				margin-left: 24px;
				font-weight: 500;
				font-size: 30px;
				color: #000000;
			}
		}

		.iconfont {
			font-size: 30px;
		}
		.item-sms {
			font-weight: 500;
			font-size: 24px;
			color: #84d39c;
			flex-shrink: 0;
			margin-right: 30px;
		}
	}
	.mat130 {
		margin-top: 130px;
	}
	.wid200 {
		width: 200px;
	}
	.bottom-btn {
		div {
			background-size: 100%;
			width: 318px;
			height: 107px;
			background-repeat: no-repeat;
			// border-radius: 20px;
			margin: auto;
			font-weight: bold;
			font-size: 38px;
			color: #fefefe;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
