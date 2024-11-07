<template>
	<div class="order-layout">
		<div class="state-list">
			<div
				class="state-item"
				@click="handleChangeState(item.value)"
				:class="{ active: active == item.value }"
				v-for="item in stateList"
				:key="item.value"
			>
				<span>{{ item.name }}</span>
			</div>
		</div>
	</div>
	<div class="orderListItem" v-for="item in orderListData" :key="item.id">
		<div class="listTop">
			<p>{{ item.type ? '本地向导' : '陪诊就医' }}</p>
			<p v-if="item.status == 1">待开始</p>
			<p v-if="item.status == 2">已完成</p>
			<p v-if="item.status == 3">已评价</p>
		</div>
		<div class="listContent">
			{{ item.hors }}
		</div>
		<div>
			{{ item.service }}
		</div>
		<div>下单时间：{{ item.createtime }}</div>
		<div class="marb-50">联系电话：{{ item.tell }}</div>
		<div>实付：{{ item.price }}</div>
		<div class="listTopOrdernum">
			<p>订单编号：{{ item.ordernum }}</p>
			<!-- <div class="button" v-if="item.status == 1">我已知晓</div> -->
			<div class="button" v-if="item.status == 1" @click="handleOpenQrcode(item)">
				出示二维码
			</div>
		</div>
		<div class="tips" v-if="item.status == 1">开启接单按钮默认已知不可拒单</div>
	</div>
	<van-popup v-model:show="qrcodeOpen">
		<vue-qr :text="qrcode" class="vueQrStyle"></vue-qr>
	</van-popup>
</template>

<script setup>
import vueQr from 'vue-qr/src/packages/vue-qr.vue';

const active = ref('1');
const qrcodeOpen = ref(false);
const qrcode = ref('');

const router = useRouter();

import { requestApi } from 'api/home';

const stateList = [
	{
		name: '已接单',
		value: '1',
	},
	{
		name: '已完成',
		value: '2',
	},
	{
		name: '已评价',
		value: '3',
	},
];

// 订单状态切换
const handleChangeState = (value) => {
	active.value = value;
	fecthhOrderList();
};

const orderListData = ref([]);

const staffid = ref('');

const fecthStaffId = async () => {
	const res = await requestApi({
		op: 'getstaffid',
		uid: JSON.parse(sessionStorage.getItem('userInfo')).id,
	});
	staffid.value = res.data.id;
	fecthhOrderList();
};

// 获取订单列表
const fecthhOrderList = async () => {
	const parmas = {
		op: 'lookorder',
		currentPage: 1,
		staffid: staffid.value,
		status: active.value,
	};

	const res = await requestApi(parmas);

	orderListData.value = res.data;
	// loading.value = false;
	// finished.value = true;
	console.log('resfecthhOrderList', res);
};

const handleOpenQrcode = (item) => {
	qrcodeOpen.value = true;
	qrcode.value =
		import.meta.env.VITE_NODE_APP_BASE +
		'/momoda/qrcode?ordernum=' +
		item.ordernum +
		'&staffid=' +
		staffid.value;
};

fecthStaffId();
</script>

<style lang="less" scoped>
.state-list {
	display: flex;
	align-items: center;
	position: relative;
	margin-bottom: 22px;
	justify-content: space-around;
	margin-top: 60px;
	margin-bottom: 50px;
	.state-item {
		font-weight: 500;
		font-size: 26px;
		color: #010000;
		position: relative;
		z-index: 3;
		span {
			position: relative;
			z-index: 3;
		}
	}
	.active {
		&::after {
			content: '';
			height: 16px;
			background: #ffee37;
			border-radius: 8px;
			position: absolute;
			left: 0;
			right: 0;
			bottom: -11px;
			z-index: 2;
		}
	}
}
.orderListItem {
	width: 687px;
	background: #fefeff;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	margin: 16px auto;
	padding: 24px;
	box-sizing: border-box;
	font-weight: 500;
	font-size: 24px;
	color: #010000;
	div {
		margin-bottom: 24px;
	}
	.listTop {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.listTopOrdernum {
		display: flex;
		justify-content: space-between;
	}
	.button {
		width: 145px;
		height: 48px;
		background: #ffee37;
		border-radius: 10px;
		font-weight: 400;
		font-size: 24px;
		color: #010000;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 0;
	}
	.marb-50 {
		margin-bottom: 54px;
	}
	.tips {
		color: #ff4444;
		text-align: center;
	}
}
</style>
