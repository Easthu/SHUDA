<template>
	<div class="order-layout">
		<div class="state-list">
			<div
				class="state-item"
				@click="active = item.value"
				:class="{ active: active == item.value }"
				v-for="item in stateList"
				:key="item.value"
			>
				<span>{{ item.name }}</span>
			</div>
		</div>
		<div class="order-list">
			<div class="order-list-item" v-for="(item, index) in orderListData" :key="index">
				<div class="item-top">
					<div class="shop-name">
						{{ item.goodsName }}
						<img src="@/assets/images/icons/make-women.png" alt="" />
						<span class="age">25岁</span>
					</div>
					<div class="order-status">{{ item.orderState }}</div>
				</div>
				<div class="item-content" @click="router.push('/orderDetail')">
					<img :src="item.img" alt="" class="shop-img" />
					<div class="shop-info">
						<div class="goods-name">{{ item.type }}</div>
						<div class="order-id">订单编号：4564654654564564564654</div>
						<div class="order-time">下单时间：2024-8-8 19:44:41</div>
						<div class="order-price">实付：￥360.00</div>
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
const active = ref('all');
const router = useRouter();
import orderImg from '@/assets/images/order/order-img.png';
import zhouxingle from '@/assets/images/home/zhouxingle.png';
import zhaoheng from '@/assets/images/home/zhaoheng.png';
const stateList = [
	{
		name: '全部',
		value: 'all',
	},
	{
		name: '待支付',
		value: 'toBePaid',
	},
	{
		name: '待服务',
		value: 'toBeServed',
	},
	{
		name: '取消中',
		value: 'canceling',
	},
	{
		name: '已取消',
		value: 'cancelled',
	},
	{
		name: '服务中',
		value: 'serveing',
	},
	{
		name: '已完成',
		value: 'completed',
	},
];
const orderListData = [
	{
		img: zhouxingle,
		goodsName: '周兴乐',
		orderState: '待服务',
		type: '本地向导',
	},
	{
		img: zhaoheng,
		goodsName: '周奕航',
		orderState: '服务中',
		type: '本地向导',
	},
	{
		img: orderImg,
		goodsName: '重庆市西南医院',
		orderState: '已完成',
		type: '陪诊就医',
	},
];
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
