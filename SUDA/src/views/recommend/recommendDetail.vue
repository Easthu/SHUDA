<template>
	<div class="recommend-detail-layout">
		<img src="https://picsum.photos/750/500" alt="" class="detail-big-img" />
		<van-icon name="arrow-left" size="28" color="#000" @click="hanldeBack" class="back-icon" />
		<div class="detail-introduce">
			<img src="https://picsum.photos/200" alt="" class="detail-img" />
			<div class="detail-info">
				<div class="info-name">酒店名称</div>
				<div class="info-time">营业时间：00:00 - 24:00</div>
				<div class="info-adress">重庆市江北区万汇中心1栋20楼</div>
			</div>
		</div>
		<div class="introduce-text">
			介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍
		</div>
		<div class="detail-btn">
			<div class="call-business">联系商家</div>
			<div class="navigation-business">一键导航</div>
		</div>
	</div>
</template>

<script setup>
const router = useRouter();
const hanldeBack = () => {
	router.back();
};
</script>

<style lang="less" scoped>
.recommend-detail-layout {
	width: 100vw;
	height: 100vh;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	.back-icon {
		position: absolute;
		left: 20px;
		top: 20px;
	}
	.detail-big-img {
		width: 100%;
		height: 500px;
		margin-bottom: 20px;
	}
	.detail-introduce {
		display: flex;
		padding: 20px;
		.detail-img {
			width: 200px;
			height: 200px;
			border-radius: 10px;
		}
		.detail-info {
			margin-left: 20px;
			.info-name {
				font-size: 34px;
				font-weight: 600;
				margin-bottom: 10px;
			}
			.info-time {
				font-size: 28px;
				color: #666;
				margin-bottom: 10px;
			}
			.info-adress {
				font-size: 28px;
				color: #666;
			}
		}
	}
	.introduce-text {
		padding: 20px;
		font-size: 36px;
		color: #666;
	}
	.detail-btn {
		display: flex;
		justify-content: space-around;
		padding: 20px;
		margin-top: auto;
		.call-business {
			width: 280px;
			height: 80px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10px;
			border: 2px solid #666;
			color: #666;
			font-size: 34px;
		}
		.navigation-business {
			width: 280px;
			height: 80px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10px;
			border: 2px solid #666;
			color: #666;
			font-size: 34px;
		}
	}
}
</style>
