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
		<div class="order-list" v-if="orderListData.length > 0">
			<div class="order-list-item" v-for="(item, index) in orderListData" :key="index">
				<div class="item-top">
					<div class="shop-name">
						{{ item.staffname }}
						<img src="" alt="" />
						<span class="age">25岁</span>
					</div>
					<div class="order-status">{{ item.orderState }}</div>
				</div>
				<div class="item-content" @click="handleLinkOrderDetail(item)">
					<img :src="item.img" alt="" class="shop-img" />
					<div class="shop-info">
						<div class="goods-name">{{ item.type == 1 ? '本地向导' : '陪诊就医' }}</div>
						<div class="order-id">订单编号：{{ item.ordernum }}</div>
						<div class="order-time">
							下单时间：{{ item.createtime.split(', ')[1].split(' ')[0] }}
							{{ item.createtime.split(', ')[1].split(' ')[1] }}
						</div>
						<div class="order-price">实付：￥{{ item.price }}</div>
						<div class="item-btn">
							<div v-if="item.orderState == '待服务'">扫码服务</div>
							<div v-if="item.orderState == '待服务'">取消订单</div>
							<div v-if="item.orderState == '服务中'">联系客服</div>
							<div v-if="item.orderState == '服务中'">扫码结束</div>
							<div v-if="item.orderState == '服务中'">续单</div>
							<div v-if="item.orderState == '已完成'">评价</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const active = ref('999');
const router = useRouter();
import { requestApi } from 'api/home';

const stateList = [
	{
		name: '全部',
		value: '999',
	},
	{
		name: '待支付',
		value: '0',
	},
	{
		name: '已支付',
		value: '1',
	},
	{
		name: '待服务',
		value: '2',
	},
	{
		name: '已完成',
		value: '3',
	},
	{
		name: '已评价',
		value: '4',
	},
];

const handleChangeState = (value) => {
	active.value = value;
	fecthhOrderList();
};
const orderListData = ref([]);

const userInfo = ref(null);

const fecthhOrderList = async () => {
	const parmas = {
		op: 'lookorder',
		nameid: userInfo.value.id,
		currentPage: 1,
	};
	if (active.value != '999') {
		parmas.status = active.value;
	} else {
		delete parmas.status;
	}
	const res = await requestApi(parmas);
	orderListData.value = res.data;
	console.log(res);
};

const handleLinkOrderDetail = (item) => {
	sessionStorage.setItem('orderDetail', JSON.stringify(item));
	router.push({
		path: '/orderDetail',
	});
};

onMounted(() => {
	userInfo.value = JSON.parse(localStorage.getItem('userInfo'));
	fecthhOrderList();
});
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
			background: #93f582;
			border-radius: 8px;
			position: absolute;
			left: 0;
			right: 0;
			bottom: -11px;
			z-index: 2;
		}
	}
}
.order-list {
	width: 715px;
	height: 271px;
	background: #ffffff;
	display: flex;
	flex-direction: column;
	margin: 0 auto 10px;
}

.order-list-item {
	background-color: #fff;
	border-radius: 10px;
	padding: 14px 20px;
	box-sizing: border-box;
	margin-bottom: 20px;
	width: 100%;
	.item-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
		.shop-name {
			font-size: 30px;
			font-weight: bold;
			display: flex;
			align-items: center;
			font-weight: 500;
			font-size: 30px;
			color: #010000;
			img {
				width: 22px;
				height: 30px;
				margin: 0 10px;
			}
		}
		.order-status {
			font-weight: 400;
			font-size: 22px;
			color: #000000;
		}
	}

	.item-content {
		display: flex;
		align-items: center;
		height: 200px;
		.shop-img {
			width: 200px;
			height: 200px;
			border-radius: 10px;
			margin-right: 24px;
			margin-top: 4px;
		}
		.shop-info {
			display: flex;
			flex-direction: column;
			font-weight: 400;
			font-size: 18px;
			color: #010000;
			justify-content: space-around;
			height: 100%;
			.goods-name {
				font-weight: 400;
				font-size: 26px;
				color: #010000;
			}
			.order-id {
				font-weight: 300;
				font-size: 22px;
				color: #010000;
				margin-top: 11px;
			}
			.order-time {
				font-weight: 300;
				font-size: 22px;
				color: #010000;
				margin-top: 15px;
			}
			.order-price {
				font-weight: 300;
				font-size: 22px;
				color: #010000;
				margin-top: 16px;
			}
			.item-btn {
				display: flex;
				justify-content: flex-end;
				margin-top: 20px;
				width: 454px;

				div {
					width: 119px;
					height: 48px;
					background: #93f582;
					border-radius: 24px;
					font-weight: 500;
					font-size: 23px;
					color: #061710;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 20px;
				}
			}
		}
	}
}
</style>
