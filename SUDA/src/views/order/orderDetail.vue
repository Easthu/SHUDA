<template>
	<div class="order-detail">
		<div class="address-info">
			<div class="address">重庆市渝中区龙溪街道恒大嘉州城T71816</div>
			<div class="info">
				<div class="name">张三</div>
				<div class="phone">13888888888</div>
			</div>
		</div>
		<div class="goods-info">
			<div class="goods-img">
				<img src="https://img01.yzcdn.cn/vant/ipad.jpeg" alt="" />
			</div>
			<div class="goods-info-text">
				<div class="name-state">
					<div class="goods-name">特色路线</div>
					<div class="goods-state">待服务</div>
				</div>
				<div class="price-time">
					<div class="goods-price">$360.00</div>
					<div class="goods-time">2小时</div>
				</div>
			</div>
		</div>
		<div class="order-info">
			<div class="order-info-item">
				<div class="order-info-title">本地向导</div>
				<div class="order-info-content">向导姓名</div>
			</div>
			<div class="order-info-item">
				<div class="order-info-title">实付款</div>
				<div class="order-info-content">￥360</div>
			</div>
			<div class="order-info-item">
				<div class="order-info-title">订单编号</div>
				<div class="order-info-content">12345678901234567890 <span>复制</span></div>
			</div>
			<div class="order-info-item">
				<div class="order-info-title">创建时间</div>
				<div class="order-info-content">2024-8-8 20:26:28</div>
			</div>
		</div>
		<div class="order-btns">
			<van-button type="primary" size="small" @click="router.replace('/')"
				>返回首页</van-button
			>
			<van-button type="primary" size="small">确认收货</van-button>
			<van-button type="danger" size="small">取消订单</van-button>
		</div>
	</div>
</template>

<script setup>
const router = useRouter();
</script>

<style lang="less" scoped>
.order-detail {
	padding: 20px;
	min-width: 100vw;
	min-height: 100vh;
	box-sizing: border-box;
	background-color: #fff;

	.address-info {
		padding: 20px;
		.address {
			font-size: 28px;
			color: #3a3a3a;
		}
		.info {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			font-size: 24px;
			color: #3a3a3a;
		}
	}
	.goods-info {
		display: flex;
		.goods-img {
			width: 300px;
			height: 300px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.goods-info-text {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20px;
			flex: 1;
			.name-state {
				display: flex;
				justify-content: space-between;
				.goods-name {
					font-size: 28px;
					color: #3a3a3a;
				}
				.goods-state {
					font-size: 24px;
					color: #ff0000;
				}
			}
			.price-time {
				display: flex;
				justify-content: space-between;
				.goods-price {
					font-size: 24px;
				}
				.goods-time {
					font-size: 24px;
					color: #3a3a3a;
				}
			}
		}
	}
	.order-info {
		.order-info-item {
			display: flex;
			justify-content: space-between;
			margin-top: 20px;
			.order-info-title {
				font-size: 24px;
				color: #3a3a3a;
			}
			.order-info-content {
				font-size: 24px;
				color: #3a3a3a;
				span {
					color: #ff0000;
					margin-left: 10px;
				}
			}
		}
	}
	.order-btns {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
		.van-button {
			margin-left: 20px;
		}
	}
}
</style>
