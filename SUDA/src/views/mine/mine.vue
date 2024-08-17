<template>
	<div class="mine-layout">
		<div class="user-info">
			<van-image
				round
				width="2rem"
				height="2rem"
				src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
			/>
			<div class="user-name-id">
				<div class="user-name">用户姓名：钟基佬</div>
				<div class="user-id">id:122344556654654</div>
			</div>
			<van-button type="primary" size="small">修改资料</van-button>
		</div>
		<div class="menu-list">
			<van-cell title="我的订单" is-link to="/order" />
			<van-cell title="我的收藏" is-link to="/collect" />
			<van-cell title="我的地址" is-link to="/address" />
			<van-cell title="我的优惠券" is-link to="/coupon" />
			<van-cell title="我的积分" is-link to="/integral" />
			<van-cell title="我的客服" is-link to="/customer" />
			<van-cell title="设置" is-link to="/setting" />
		</div>
	</div>
</template>
<script setup name="mine"></script>
<style lang="less" scoped>
.mine-layout {
	padding: 24px;
	min-width: 100vw;
	min-height: 100vh;
	background-color: #f5f5f5;
	box-sizing: border-box;
}
.user-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24px;
	background-color: #fff;
	border-radius: 8px;
	height: 100px;

	.user-name-id {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		justify-content: space-around;
		height: 100%;
		.user-name {
			font-size: 24px;
			color: #333;
		}
		.user-id {
			font-size: 24px;
			color: #999;
		}
	}
}
</style>
