<template>
	<div class="order-layout">
		<NavBar showLeftBack />
		<van-tabs v-model:active="active" title-active-color="#1989fa" color="#1989fa">
			<van-tab title="待确认"></van-tab>
			<van-tab title="已接单"></van-tab>
			<van-tab title="服务中"></van-tab>
			<van-tab title="已完成"></van-tab>
			<van-tab title="已取消"></van-tab>
			<div class="order-list">
				<div class="order-list-item" v-for="i in 10" :key="i">
					<div class="item-top">
						<div class="shop-name">陪诊就医</div>
						<div class="order-status">待确认</div>
					</div>
					<div class="item-content">
						<div class="shop-info">
							<div class="goods-name">
								服务景点：洪崖洞 洪崖洞 洪崖洞 洪崖洞 洪崖洞 洪崖洞
							</div>
							<div class="order-time">下单时间：2024-8-8 19:44:41</div>
							<div class="order-time">联系电话：16666666666</div>
							<div class="order-price">实付：￥360.00</div>
							<div class="order-id">
								订单编号：4564654654564564564654

								<span class="btn">扫码确认</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</van-tabs>
	</div>
</template>

<script setup>
const active = ref(0);
const router = useRouter();
</script>

<style lang="less" scoped>
.order-list {
	padding: 20px;
	box-sizing: border-box;
	width: 100vw;
}
.order-list-item {
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	box-sizing: border-box;
	margin-bottom: 20px;
	width: 100%;
}
.item-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}
.shop-name {
	font-size: 30px;
	font-weight: bold;
}
.order-status {
	font-size: 28px;
	color: #999;
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
	}
	.shop-info {
		display: flex;
		flex-direction: column;
		font-size: 28px;
		justify-content: space-around;
		height: 100%;
		.order-id {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.btn {
				width: 150px;
				height: 60px;
				border-radius: 10px;
				border: 2px solid #ccc;
				color: #3a3a3a;
				font-size: 28px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
</style>
