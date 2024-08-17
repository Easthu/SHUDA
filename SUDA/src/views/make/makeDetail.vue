<template>
	<div class="make-detail-layout">
		<img src="https://picsum.photos/750/550" alt="" class="detail-big-img" />
		<van-icon name="arrow-left" size="28" color="#000" @click="hanldeBack" class="back-icon" />
		<div class="make-detail-content-title">
			<span>绝对绿色</span>
			<span>极速响应</span>
			<span>真人认证</span>
			<span>平台保证</span>
		</div>
		<div class="make-detail-content-person">
			<div class="person-left">
				<div class="name-score">
					<div class="name">张三</div>
					<div class="score">4.9</div>
				</div>
				<div class="done-list">已完成43单</div>
			</div>
			<div class="person-right">个人营业执照</div>
		</div>
		<div class="comments-like">
			<span class="border-line">178</span>
			<span>293</span>
		</div>
		<div class="specification-list">
			<div class="specification-item" v-for="item in 6" :key="item">
				<img src="https://picsum.photos/200/150" alt="" class="specification-img" />
				<div class="specification-info">
					<div class="spe-name">洪崖洞</div>
					<div class="spe-suggestion">建议玩1-2小时</div>
					<div class="spe-time">开放时间：全天</div>
				</div>
				<div class="spe-price">￥ 80</div>
				<div class="spe-sel">
					<van-radio-group v-model="checked">
						<van-radio :name="true"></van-radio>
					</van-radio-group>
				</div>
			</div>
		</div>
		<div class="bottom-btn">
			<div class="bottom-btn-left">至少选择三个景点，已选择2个</div>
			<div class="bottom-btn-right">结算</div>
		</div>
	</div>
</template>

<script setup>
const checked = ref(false);
const router = useRouter();
const hanldeBack = () => {
	router.back();
};
</script>

<style lang="less" scoped>
.make-detail-layout {
	width: 100vw;
	min-height: 100vh;
	background: #fff;
	padding-bottom: 130px;
	bottom: calc(130px + constant(safe-area-inset-bottom));
	bottom: calc(130px + env(safe-area-inset-bottom));
	.detail-big-img {
		width: 750px;
		height: 550px;
	}
	.back-icon {
		position: absolute;
		left: 20px;
		top: 20px;
	}
	.make-detail-content-title {
		margin-top: -24px;
		border-radius: 24px 24px 0 0;
		background: #ec6b6b;
		position: relative;
		z-index: 1;
		font-size: 28px;
		display: flex;
		justify-content: space-around;
		font-weight: 600;
		color: #3a3a3a;
		box-sizing: border-box;
		span {
			text-align: center;
		}
		padding: 16px 0 46px;
	}
	.make-detail-content-person {
		position: relative;
		z-index: 2;
		margin-top: -30px;
		border-radius: 24px 24px 0 0;
		padding: 40px 30px 30px;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-items: center;
		.person-left {
			display: flex;
			flex-direction: column;
			align-items: center;
			.name-score {
				display: flex;
				align-items: center;
				margin-bottom: 20px;
				.name {
					font-size: 36px;
					font-weight: 600;
					color: #3a3a3a;
					margin-right: 20px;
				}
				.score {
					font-size: 28px;
					color: #979797;
				}
			}
			.done-list {
				margin-left: 28px;
				font-size: 28px;
				color: #979797;
			}
		}
		.person-right {
			font-size: 28px;
			font-weight: 600;
			color: #3a3a3a;
			width: 230px;
			height: 60px;
			border-radius: 30px;
			border: 2px solid #000;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.comments-like {
		display: flex;
		align-items: center;
		padding: 30px 0;
		span {
			font-size: 28px;
			font-weight: 600;
			width: 50%;
			text-align: center;
		}
		.border-line {
			border-right: 2px solid #000;
		}
	}
	.specification-item {
		display: flex;
		width: 710px;
		align-items: center;
		padding: 30px 0;
		font-size: 28px;
		box-sizing: border-box;
		margin: auto;
		.specification-img {
			width: 200px;
			height: 150px;
			margin-right: 20px;
		}
		.specification-info {
			flex: 1;
			.spe-name {
				font-size: 32px;
				font-weight: 600;
				color: #3a3a3a;
				margin-bottom: 20px;
			}
			.spe-suggestion {
				font-size: 28px;
			}
		}
		.spe-price {
			font-size: 28px;
		}
		.spe-sel {
			margin-left: 50px;
		}
	}
	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		font-size: 28px;
		border-top: 2px solid #ccc;
		height: 100px;
		background: #fff;
		.bottom-btn-left {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.bottom-btn-right {
			width: 230px;
			height: 100px;
			background: #ec6b6b;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			bottom: constant(safe-area-inset-bottom);
			bottom: env(safe-area-inset-bottom);
		}
	}
}
</style>
