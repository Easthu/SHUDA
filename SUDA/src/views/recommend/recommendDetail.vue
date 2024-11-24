<template>
	<div class="recommend-detail-layout" v-if="recommendDetail">
		<img :src="homeBg" alt="" class="home-bg-fix" />
		<div class="page-title" v-if="route.query.classify == 1">推荐酒店</div>
		<div class="page-title" v-if="route.query.classify == 2">推荐餐饮</div>
		<div class="page-title" v-if="route.query.classify == 3">推荐景点</div>
		<div class="page-title" v-if="route.query.classify == 4">推荐医院</div>
		<img :src="recommendDetail.urlxiang" alt="" class="detail-big-img" />
		<div class="detail-introduce">
			<div class="info-name">
				{{ recommendDetail.name }}
				<span v-if="recommendDetail.ja" class="ja">{{ recommendDetail.ja }}A</span>
				<span v-if="recommendDetail.fullname">{{ recommendDetail.fullname }}</span>
			</div>
			<div class="info-js" v-if="recommendDetail.js">{{ recommendDetail.js }}</div>
			<div class="info-js" v-if="recommendDetail.opentime">
				{{ recommendDetail.opentime }}
			</div>
			<div class="info-js" v-if="route.query.classify == 3">
				{{ recommendDetail.tell }}
			</div>
			<div class="info-js" v-if="recommendDetail.tip">
				<span v-for="tips in recommendDetail.tip.split('、')" :key="tips">{{ tips }}</span>
			</div>
			<div class="info-adress">地址：{{ recommendDetail.adress }}</div>
			<div class="info-tel" v-if="route.query.classify != 3">
				电话：{{ recommendDetail.tell }}
			</div>
		</div>
		<div class="introduce" v-if="recommendDetail.sell">
			<div class="introduce-title">卖点</div>
			<div class="introduce-content">
				{{ recommendDetail.sell }}
			</div>
		</div>
		<div class="introduce" v-if="recommendDetail.introduce">
			<div class="introduce-title" v-if="route.query.classify == 2">品牌故事</div>
			<div class="introduce-title" v-if="route.query.classify == 3">景点介绍</div>
			<div class="introduce-title" v-if="route.query.classify == 4">医院详情介绍</div>

			<div class="introduce-content" v-html="recommendDetail.introduce"></div>
		</div>
		<div class="introduce" v-if="recommendDetail.service">
			<div class="introduce-title">设施服务</div>

			<div class="introduce-content" v-html="recommendDetail.service"></div>
		</div>
		<div class="detail-btn">
			<!-- <div
				class="call-business"
				:style="{ backgroundImage: `url(${callBusiness})` }"
				v-if="route.query.classify != 3"
			>
				联系商家
			</div> -->
			<!-- <div
				class="navigation-business"
				:style="{ backgroundImage: `url(${navigationBusiness})` }"
			>
				一键导航
			</div> -->
			<div
				class="navigation-business"
				:style="{ backgroundImage: `url(${navigationBusiness})` }"
				v-if="route.query.classify == 4 || route.query.classify == 3"
				@click="contactPartTime"
			>
				联系兼职
			</div>
		</div>
	</div>
</template>

<script setup>
import homeBg from '@/assets/images/home/home-bg.png';
import callBusiness from '@/assets/images/icons/call-business.png';
import navigationBusiness from '@/assets/images/icons/call-paytime.png';

const router = useRouter();
const route = useRoute();

const hanldeBack = () => {
	router.back();
};

const recommendDetail = ref(null);

const contactPartTime = () => {
	let recommendDetail = JSON.parse(sessionStorage.getItem('recommendDetail'));
	console.log('recommendDetail :>> ', recommendDetail);
	router.push({
		path: '/make',
		query: {
			sys: recommendDetail.name,
			type: route.query.classify == 3 ? 1 : 2, // 2陪诊就医        1本地向导
		},
	});
};

onMounted(() => {
	try {
		recommendDetail.value = JSON.parse(sessionStorage.getItem('recommendDetail'));
		console.log('recommendDetail.value :>> ', recommendDetail.value);
	} catch {
		router.back();
	}
});
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
	// padding-bottom: 170px;
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
		margin-bottom: 12px;
		padding: 20px 30px;
		box-sizing: border-box;
		position: relative;
		top: 0;
		justify-content: space-around;
		background: #fff;
		.info-name {
			font-weight: bold;
			font-size: 34px;
			color: #000000;
			display: flex;
			align-items: center;
			.ja {
				width: 59px;
				height: 34px;
				background: #00c68f;
				border-radius: 17px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 12px;
			}
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
			margin-top: 12px;
		}
		.info-js {
			margin-top: 16px;
			font-weight: bold;
			font-size: 24px;
			color: #000000;
			display: flex;
			span {
				font-weight: 400;
				font-size: 18px;
				color: #000000;
				padding: 6px;
				border: 1px solid #000000;
				margin-right: 6px;
			}
		}
		.info-tel {
			font-weight: bold;
			font-size: 24px;
			color: #000000;
			margin-top: 10px;
		}
	}
	.introduce {
		padding: 24px 30px;
		width: 750px;
		box-sizing: border-box;
		position: relative;
		z-index: 2;
		background: #fff;
		margin-bottom: 20px;

		.introduce-title {
			font-weight: bold;
			font-size: 28px;
			color: #000000;
			margin-bottom: 22px;
		}
		.introduce-content {
			font-weight: 400;
			font-size: 20px;
			color: #000000;
			line-height: 34px;
			overflow-y: scroll;
		}
	}
	.detail-btn {
		// position: relative;
		z-index: 2;
		margin-top: auto;
		margin-bottom: 66px;
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
		// .navigation-business {
		// 	background: linear-gradient(90deg, #e18a00, #f5e20c);

		// }
	}
}
</style>
