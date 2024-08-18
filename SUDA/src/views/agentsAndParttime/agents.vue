<template>
	<div class="agents-layout">
		<NavBar showLeftBack />
		<div class="agents-info">
			<van-image
				round
				width="2rem"
				height="2rem"
				src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
			/>
			<div class="agents-name-place">
				<div class="agents-name">用户姓名：钟基佬</div>
				<div class="agents-place">朝天门来福士</div>
			</div>
		</div>

		<div class="payouts-detail">
			<div class="can-payouts-records">
				<div class="can-payouts" @click="handleLinkCanPayouts">
					<p>佣金可提现(元) ></p>
					<p>999.00</p>
				</div>
				<div class="payouts-records" @click="handleLinkPayoutsRecords">提现记录</div>
			</div>
			<div class="payouts-type">
				<div>
					<p>积累佣金(元)</p>
					<p>999.00</p>
				</div>
				<div>
					<p>提现中(元)</p>
					<p>999.00</p>
				</div>
				<div>
					<p>已经提现(元)</p>
					<p>999.00</p>
				</div>
			</div>
			<div class="payouts-btn">
				<van-button type="primary" block round>立即提现</van-button>
			</div>
		</div>
		<div class="order-number">
			<div @click="handleLinkPartTimeOrderList">
				<img src="https://picsum.photos/80" alt="" />
				<div class="name-number">
					<p>兼职订单</p>
					<p>120笔</p>
				</div>
			</div>
			<div @click="handleLinkPartTimeNumber">
				<img src="https://picsum.photos/80" alt="" />
				<div class="name-number">
					<p>兼职人数</p>
					<p>120人</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const router = useRouter();
const handleLinkPartTimeOrderList = () => {
	console.log('跳转兼职订单列表');
	router.push('/partTimeOrderList');
};
const handleLinkPayoutsRecords = () => {
	console.log('跳转提现记录');
	router.push('/payoutsRecords');
};
const handleLinkCanPayouts = () => {
	console.log('跳转可提现');
	router.push('/canPayouts');
};
const handleLinkPartTimeNumber = () => {
	console.log('跳转兼职人数');
	router.push('/partTimeNumber');
};
</script>

<style lang="less" scoped>
.agents-layout {
	padding: 24px;
	min-width: 100vw;
	min-height: 100vh;
	background-color: #fff;
	box-sizing: border-box;
	padding-top: 0;

	.agents-info {
		display: flex;
		align-items: center;
		padding: 24px;
		background-color: #fff;
		border-radius: 8px;
		height: 100px;
		.agents-name-place {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			justify-content: space-around;
			height: 100%;
			margin-left: 20px;
			.agents-name {
				font-size: 24px;
				color: #333;
			}
			.agents-place {
				font-size: 24px;
				color: #999;
			}
		}
	}
	.payouts-detail {
		border: 2px solid #f5f5f5;
		border-radius: 8px;
		padding: 24px;
		margin: 24px 0;
		.can-payouts-records {
			display: flex;
			justify-content: space-between;
			.can-payouts {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				height: 80px;
				p {
					font-size: 28px;
					color: #333;
					margin: 0;
				}
			}
			.payouts-records {
				font-size: 28px;
				color: #999;
			}
		}
		.payouts-type {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 24px 0;
			div {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				height: 80px;

				p {
					font-size: 28px;
					color: #333;
					margin: 0;
				}
			}
		}
	}
	.order-number {
		display: flex;
		justify-content: space-around;
		align-items: center;
		border: 2px solid #f5f5f5;
		border-radius: 8px;
		padding: 24px;
		margin: 24px 0;
		div {
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 80px;
				height: 80px;
				border-radius: 10px;
			}
			.name-number {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				margin-left: 20px;
				p {
					font-size: 28px;
					color: #333;
					margin: 0;
				}
				&:nth-child(2) {
					color: #999;
				}
			}
		}
	}
}
</style>
