<template>
	<div class="part-time-layout">
		<NavBar showLeftBack />
		<div class="part-time-info">
			<van-image
				round
				width="2rem"
				height="2rem"
				src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
			/>
			<div class="part-time-name-place">
				<div class="part-time-name">用户姓名：钟基佬</div>
				<div class="part-time-place">邀请码：2132132123123</div>
			</div>
			<div class="open-order">开启接单<van-switch v-model="checked" size="20px" /></div>
		</div>

		<div class="payouts-detail">
			<div class="can-payouts-records">
				<div class="can-payouts" @click="handleLinkPartOrder">
					<p>订单数量 ></p>
					<p>10</p>
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
			<div>
				<img src="https://picsum.photos/80" alt="" />
				<div class="name-number">
					<p>地点签到</p>
					<p>1</p>
				</div>
			</div>
			<div @click="handleLinkPartTimeNumber">
				<img src="https://picsum.photos/80" alt="" />
				<div class="name-number">
					<p>联系客服</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const router = useRouter();

const handleLinkPayoutsRecords = () => {
	console.log('跳转提现记录');
	router.push('/payoutsRecords');
};
const handleLinkPartOrder = () => {
	console.log('跳转可提现');
	router.push('/partOrderList');
};

const checked = ref(false);
</script>

<style lang="less" scoped>
.part-time-layout {
	padding: 24px;
	min-width: 100vw;
	min-height: 100vh;
	background-color: #fff;
	box-sizing: border-box;
	padding-top: 0;

	.part-time-info {
		display: flex;
		align-items: center;
		padding: 24px;
		background-color: #fff;
		border-radius: 8px;
		height: 100px;
		.part-time-name-place {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			justify-content: space-around;
			height: 100%;
			margin-left: 20px;
			.part-time-name {
				font-size: 24px;
				color: #333;
			}
			.part-time-place {
				font-size: 24px;
				color: #999;
			}
		}
		.open-order {
			display: flex;
			font-size: 24px;
			color: #999;
			align-items: center;
			margin-left: auto;
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
