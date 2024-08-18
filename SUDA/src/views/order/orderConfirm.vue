<template>
	<div class="order-confirm">
		<NavBar showLeftBack />
		<div class="make-info">
			<img src="https://picsum.photos/80" alt="" />
			<div class="name-score">
				<div class="name">子非鱼 <span>4.3</span></div>
				<div class="done">已完成43单</div>
			</div>
			<div class="order-state">待支付</div>
		</div>
		<div class="services-list">
			<div class="services-item" v-for="item in 3" :key="item">
				<img src="https://picsum.photos/150/100" alt="" />
				<div class="place-time">
					<div class="place">洪崖洞</div>
					<div class="time">建议玩1-2小时</div>
					<div class="open">开放时间：全天</div>
				</div>
				<div class="price">￥120</div>
			</div>
		</div>
		<div class="prcie-detail">
			<!-- <div class="price-title">费用明细</div> -->
			<div class="detail-item">
				<span> 费用明细 </span>
				<span>￥120</span>
			</div>
			<div class="detail-item">
				<span> 备注 </span>
				<van-field
					v-model="message"
					rows="2"
					autosize
					type="textarea"
					maxlength="50"
					placeholder="请输入备注"
					show-word-limit
				/>
			</div>
		</div>
		<div class="bottom-btn">
			<span>合计</span>
			<span class="price">￥120</span>
			<div>去支付</div>
		</div>
	</div>
</template>

<script setup>
const message = ref('');
</script>

<style lang="less" scoped>
.order-confirm {
	min-height: 100vh;
	width: 100vw;
	background: #fff;
	padding: 0 20px;
	box-sizing: border-box;
	padding-bottom: 130px;
	bottom: calc(130px + constant(safe-area-inset-bottom));
	bottom: calc(130px + env(safe-area-inset-bottom));
	.make-info {
		display: flex;
		align-items: center;
		height: 80px;
		margin: 20px 0;
		img {
			width: 80px;
			height: 80px;
			margin-right: 40px;
		}
		.name-score {
			padding: 10px 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 80px;
			box-sizing: border-box;
			.name {
				font-size: 28px;
				font-weight: 600;
				span {
					font-size: 24px;
					color: #999;
				}
			}
			.done {
				font-size: 24px;
				color: #999;
			}
		}
		.order-state {
			font-size: 24px;
			color: #999;
			margin-left: auto;
			padding: 10px 0;
			height: 80px;
			box-sizing: border-box;
			display: flex;
			align-items: flex-start;
		}
	}
	.services-list {
		.services-item {
			display: flex;
			align-items: center;
			padding: 10px 0;
			img {
				width: 150px;
				height: 100px;
				border-radius: 10px;
				margin-right: 20px;
			}
			.place-time {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100px;
				box-sizing: border-box;
				padding: 4px 0;
				.place {
					font-size: 26px;
					font-weight: 600;
				}
				.time {
					font-size: 24px;
					color: #999;
				}
				.open {
					font-size: 24px;
					color: #999;
				}
			}
			.price {
				font-size: 26px;
				font-weight: 600;
				margin-left: auto;
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
			padding: 10px 0;
			span {
				font-size: 24px;
			}
			.van-cell {
				width: 70%;
				background: #f5f5f5;
				border-radius: 10px;
			}
		}
	}
	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100px;
		display: flex;
		align-items: center;
		padding: 0 20px;
		box-sizing: border-box;
		border-top: 2px solid #f5f5f5;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		span {
			font-size: 24px;
		}
		.price {
			font-size: 28px;
			font-weight: 600;
		}
		div {
			margin-left: auto;
			width: 200px;
			height: 60px;
			background: #ff9900;
			color: #fff;
			text-align: center;
			line-height: 50px;
			border-radius: 10px;
			font-size: 28px;
		}
	}
}
</style>
