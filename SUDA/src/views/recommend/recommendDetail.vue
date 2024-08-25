<template>
	<div class="recommend-detail-layout">
		<img :src="homeBg" alt="" class="home-bg-fix" />
		<div class="page-title">推荐医院</div>
		<img :src="recommendDetail" alt="" class="detail-big-img" />
		<div class="detail-introduce">
			<div class="info-name">重庆西南医院<span>陆军军医大学第一附属医院</span></div>
			<div class="info-adress">地址：沙坪坝高滩岩正街30号</div>
			<div class="info-tel">电话：023-65318301</div>
		</div>
		<div class="introduce">
			<div class="introduce-title">医院详情介绍</div>
			<div class="introduce-content">
				复旦版专科声誉排名前十的科室:烧伤科(1)、病理科(4)、检验医学(7)、康复医学(9)、运动医学(9)整形外科(10)
				国家重点学科:感染病科、心血管内科、肝胆外科、骨科、骨科/运动医学、关节外科、泌尿外科、普外科、烧伤科、神经外科、心脏外科、整形外科、胸外科、乳腺甲状腺外科
				国家重点(培育)学科:消化内科 国家中医药管理局重点学科:中医与风湿免疫科
				军队医学专科中心:全军烧伤研究所、全军感染病研究所、全军神经外科研究所
			</div>
		</div>
		<div class="detail-btn">
			<div class="call-business" :style="{ backgroundImage: `url(${callBusiness})` }">
				联系商家
			</div>
			<div
				class="navigation-business"
				:style="{ backgroundImage: `url(${navigationBusiness})` }"
			>
				一键导航
			</div>
		</div>
	</div>
</template>

<script setup>
import homeBg from '@/assets/images/home/home-bg.png';
import recommendDetail from '@/assets/images/recommend/recommend-detail.png';
import callBusiness from '@/assets/images/icons/call-business.png';
import navigationBusiness from '@/assets/images/icons/navigation-business.png';

const router = useRouter();
const hanldeBack = () => {
	router.back();
};
</script>

<style lang="less" scoped>
.recommend-detail-layout {
	width: 100vw;
	min-height: 100vh;
	background-color: #f7f7f7;
	display: flex;
	flex-direction: column;
	position: relative;
	top: 0;
	box-sizing: border-box;
	padding-top: 36px;
	.home-bg-fix {
		position: absolute;
		z-index: 0;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
	}
	.page-title {
		font-weight: bold;
		font-size: 32px;
		color: #061710;
		text-align: center;
		position: relative;
		z-index: 2;
	}

	.detail-big-img {
		width: 750px;
		height: 538px;
		position: relative;
		z-index: 2;
		margin-top: 34px;
	}
	.detail-introduce {
		display: flex;
		flex-direction: column;
		height: 153px;
		margin-bottom: 12px;
		padding: 20px 30px;
		box-sizing: border-box;
		position: relative;
		top: 0;
		justify-content: space-around;
		.info-name {
			font-weight: bold;
			font-size: 34px;
			color: #000000;
			display: flex;
			align-items: center;
			span {
				font-weight: bold;
				font-size: 18px;
				color: #000000;
				margin-left: 12px;
			}
		}

		.info-adress {
			font-weight: bold;
			font-size: 24px;
			color: #000000;
		}
		.info-tel {
			font-weight: bold;
			font-size: 24px;
			color: #000000;
		}
	}
	.introduce {
		padding: 24px 30px;
		width: 750px;
		box-sizing: border-box;
		position: relative;
		z-index: 2;
		.introduce-title {
			font-weight: bold;
			font-size: 28px;
			color: #000000;
			margin-bottom: 26px;
		}
		.introduce-content {
			font-weight: bold;
			font-size: 20px;
			color: #000000;
			line-height: 34px;
			height: 300px;
			overflow-y: scroll;
			margin-bottom: 66px;
		}
	}
	.detail-btn {
		position: relative;
		z-index: 2;
		margin-top: auto;
		bottom: 66px;
		display: flex;
		justify-content: space-around;
		div {
			background-size: 100%;
			background-repeat: no-repeat;
			width: 258px;
			height: 86px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			font-size: 34px;
			color: #fefefe;
		}
	}
}
</style>
