<template>
	<div class="order-detail">
		<img :src="back" alt="" class="back-icon" @click="router.back()" />
		<div class="make-info">
			<img src="" alt="" />
			<div class="name-score">
				<div class="name">
					张丹琼 <span><i class="iconfont">&#xe64b;</i>4.3</span>
				</div>
				<div class="done">已完成43单</div>
			</div>
			<div class="order-state">待支付</div>
		</div>
		<div class="services-list">
			<div class="specification-item" v-for="(item, index) in goodsList" :key="index">
				<img :src="item.img" alt="" class="specification-img" />
				<div class="specification-info">
					<div class="spe-name">{{ item.name }}</div>
					<div class="spe-suggestion">
						<i class="iconfont">&#xe605;</i> {{ item.suggestion }}
					</div>
					<div class="spe-time"><i class="iconfont">&#xe605;</i>{{ item.time }}</div>
				</div>
				<div class="item-right">
					<div class="spe-price">￥{{ item.price }}</div>
				</div>
			</div>
		</div>
		<div class="prcie-detail">
			<div class="detail-item">
				<p class="left">实付款</p>
				<p>￥120</p>
			</div>
			<div class="detail-item">
				<p class="left">清单编号</p>
				<p>257986486528674 <span @click="handleClipboard('257986486528674')">复制</span></p>
			</div>
			<div class="detail-item">
				<p class="left">创建时间</p>
				<p>2024-08-07 14:22:55</p>
			</div>
			<div class="detail-item">
				<p class="left">付款时间</p>
				<p>2024-08-07 14:22:55</p>
			</div>
			<div class="detail-item">
				<p class="left">备注</p>
				<p>给你恰到好处的陪伴</p>
			</div>
		</div>
		<div class="bottom-btn">
			<div>联系客服</div>
			<div>扫码服务</div>
			<div @click="handleCancelOrder" class="cancel">取消订单</div>
		</div>
	</div>
</template>

<script setup>
import handleClipboard from '@/utils/clipboard';
import { showConfirmDialog } from 'vant';
import back from '@/assets/images/icons/back.png';
import hongyadong from '@/assets/images/order/hongyadong.png';
import jiefangbei from '@/assets/images/order/jiefangbei.png';
import renmingdalitang from '@/assets/images/order/renmingdalitang.png';
const router = useRouter();

const goodsList = ref([
	{
		name: '洪崖洞',
		img: hongyadong,
		suggestion: '建议玩1-2小时',
		time: '开放时间：全天',
		price: '80',
		checked: false,
	},
	{
		name: '解放碑',
		img: jiefangbei,
		suggestion: '建议玩1-2小时',
		time: '开放时间：全天',
		price: '100',
		checked: false,
	},
	{
		name: '人民大礼堂',
		img: renmingdalitang,
		suggestion: '建议玩1-2小时',
		time: '开放时间：全天',
		price: '80',
		checked: false,
	},
]);
const handleCancelOrder = () => {
	console.log('取消订单');
	showConfirmDialog({
		title: '取消订单',
		message: '是否取消订单，取消订单需要平台审核',
		confirmButtonColor: 'red',
	})
		.then(() => {
			// on confirm
		})
		.catch(() => {
			// on cancel
		});
};
</script>

<style lang="less" scoped>
.order-detail {
	min-height: 100vh;
	width: 100vw;
	background: #f2f3f7;
	padding: 0 18px;
	box-sizing: border-box;
	padding-bottom: 130px;
	padding-bottom: calc(130px + constant(safe-area-inset-bottom));
	padding-bottom: calc(130px + env(safe-area-inset-bottom));
	.back-icon {
		position: relative;
		width: 53px;
		height: 53px;
		top: 19px;
		left: 33px;
	}
	.make-info {
		display: flex;
		align-items: center;
		width: 714px;
		height: 145px;
		background: #ffffff;
		margin-bottom: 14px;
		margin-top: 45px;
		padding: 10px;
		box-sizing: border-box;
		img {
			width: 128px;
			height: 128px;
			margin-right: 28px;
		}
		.name-score {
			padding: 10px 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 80px;
			box-sizing: border-box;
			.name {
				font-weight: bold;
				font-size: 38px;
				color: #000000;
				display: flex;
				margin-bottom: 14px;
				span {
					font-size: 24px;
					color: #999;
					margin-left: 30px;
					display: flex;
					align-items: center;
					.iconfont {
						margin-right: 10px;
						font-size: 24px;
						color: #f9ca02;
					}
				}
			}
			.done {
				font-weight: 500;
				font-size: 20px;
				color: #a6a3a3;
			}
		}
		.order-state {
			font-weight: bold;
			font-size: 28px;
			color: #061710;
			margin-left: auto;
		}
	}
	.services-list {
		.specification-item {
			display: flex;
			align-items: center;
			padding: 10px;
			font-size: 28px;
			box-sizing: border-box;
			margin: 0 auto 10px;
			width: 715px;
			height: 212px;
			background: #ffffff;
			box-sizing: border-box;

			.specification-img {
				width: 200px;
				height: 200px;
				margin-right: 30px;
			}
			.specification-info {
				flex: 1;
				height: 200px;
				.spe-name {
					font-weight: 500;
					font-size: 32px;
					color: #010000;
					margin-bottom: 30px;
					margin-top: 20px;
				}
				.spe-suggestion,
				.spe-time {
					font-weight: 500;
					font-size: 22px;
					color: #010000;
					display: flex;
					align-items: center;
					margin-bottom: 30px;
					.iconfont {
						font-size: 40px;
						color: #93f582;
						margin-right: 10px;
					}
				}
			}
			.item-right {
				display: flex;
				margin-right: 30px;
				height: 212px;
				padding-top: 25px;
				box-sizing: border-box;
				height: 100%;
				.spe-price {
					font-weight: 500;
					font-size: 28px;
					color: #000000;
					margin: 20px 0;
				}
			}
		}
	}
	.prcie-detail {
		padding: 20px 0;
		.price-title {
			font-size: 26px;
			font-weight: 600;
			padding-bottom: 10px;
		}
		.detail-item {
			display: flex;
			justify-content: space-between;
			padding: 10px;
			margin-top: 30px;
			p {
				font-weight: 400;
				font-size: 26px;
				color: #565656;
			}
			.left {
				font-weight: 400;
				font-size: 26px;
				color: #010000;
			}
		}
	}
	.bottom-btn {
		display: flex;
		justify-content: space-around;
		margin-top: 36px;
		div {
			width: 176px;
			height: 60px;
			background: #ffffff;
			border-radius: 29px;
			border: 3px solid #93f582;
			font-weight: bold;
			font-size: 28px;
			color: #061710;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.cancel {
			background: #93f582;
		}
	}
}
</style>
