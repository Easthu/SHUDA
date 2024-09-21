<template>
	<div class="make-detail-layout" v-if="makeDetailInfo">
		<img :src="makeDetailInfo.picture" alt="" class="detail-big-img" />
		<img :src="back" alt="" class="back-icon" @click="router.back()" />
		<div class="make-detail-content-title">
			<span>绝对绿色</span>
			<span>极速响应</span>
			<span>真人认证</span>
			<span>平台保证</span>
		</div>
		<div class="make-detail-content-person">
			<div class="person-left">
				<div class="name-score">
					<div class="name">{{ makeDetailInfo.name }}</div>
					<div class="score">
						<img src="@/assets/images/icons/make-star.png" alt="" />4.9
					</div>
				</div>
				<div class="done-list">已完成{{ makeDetailInfo.odersum }}单</div>
			</div>
			<div
				class="person-right"
				@click="router.push('/personalBusinessLicense')"
				v-if="makeDetailInfo.ifbusiness"
			>
				<img src="@/assets/images/icons/make-detail-license.png" alt="" />个人营业执照
			</div>
		</div>
		<div class="comments-like">
			<span class="border-line"
				><img src="@/assets/images/icons/make-detail-message.png" alt="" />{{
					makeDetailInfo.appraise
				}}</span
			>
			<span
				><img src="@/assets/images/icons/make-like.png" alt="" />{{
					makeDetailInfo.lovesum
				}}</span
			>
		</div>
		<div class="specification-list">
			<div class="specification-item" v-for="(item, index) in scenicspotList" :key="index">
				<img :src="item.url" alt="" class="specification-img" />
				<div class="specification-info">
					<div class="spe-name">{{ item.name }}</div>
					<div class="spe-suggestion">
						<img src="@/assets/images/icons/make-detail-time.png" alt="" />{{
							item.suggestion
						}}
					</div>
					<div class="spe-time">
						<img
							src="@/assets/images/icons/make-detail-diamond.png"
							alt=""
						/>开放时间：{{ item.tell }}
					</div>
				</div>
				<div class="item-right">
					<div class="spe-price">￥{{ item.price }}</div>
					<div class="spe-sel" @click="item.checked = !item.checked">
						<img :src="item.checked ? checkedIcon : checkNotIcon" alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class="bottom-btn">
			<div class="bottom-btn-left">
				·至少选择三个景点进行游玩，已选择{{
					scenicspotList.filter((item) => item.checked).length
				}}处景点
			</div>
			<div class="bottom-btn-right" @click="handleLinkOrderConfirm">结算</div>
		</div>
	</div>
</template>

<script setup>
import back from '@/assets/images/icons/back.png';
import checkedIcon from '@/assets/images/icons/make-detail-checked.png';
import checkNotIcon from '@/assets/images/icons/make-detail-check-not.png';
import { requestApi } from 'api/home';

const router = useRouter();

const handleLinkOrderConfirm = () => {
	router.push('/orderConfirm');
};

const makeDetailInfo = ref(null);
const scenicspotList = ref([]);
const requestScenicspotList = async (id) => {
	const params = {
		op: 'scenicid',
		id,
	};
	const { data } = await requestApi(params);
	scenicspotList.value.push({ ...data, checked: false });
};

onMounted(() => {
	const info = sessionStorage.getItem('makeDetailJson');
	try {
		makeDetailInfo.value = JSON.parse(info);
		makeDetailInfo.value.scenicspot = JSON.parse(makeDetailInfo.value.scenicspot);
		if (makeDetailInfo.value.scenicspot.length > 0) {
			makeDetailInfo.value.scenicspot.forEach((item) => {
				requestScenicspotList(item.id);
			});
		}
	} catch (error) {
		router.go('/home');
	}
});
</script>

<style lang="less" scoped>
.make-detail-layout {
	width: 100vw;
	min-height: 100vh;
	background: #f2f3f7;
	padding-bottom: 130px;
	bottom: calc(130px + constant(safe-area-inset-bottom));
	bottom: calc(130px + env(safe-area-inset-bottom));
	.detail-big-img {
		width: 750px;
		height: 412px;
	}
	.back-icon {
		position: absolute;
		left: 39px;
		top: 54px;
		width: 53px;
		height: 53px;
	}
	.make-detail-content-title {
		margin-top: -24px;
		border-radius: 24px 24px 0 0;
		background: #a3ea84;
		position: relative;
		z-index: 1;
		font-weight: bold;
		font-size: 24px;
		color: #06690a;
		display: flex;
		justify-content: space-around;
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
		padding: 40px 30px 30px 50px;
		background: #f2f3f7;
		display: flex;
		justify-content: space-between;
		.person-left {
			display: flex;
			flex-direction: column;
			.name-score {
				display: flex;
				align-items: center;
				margin-bottom: 5px;
				.name {
					font-weight: bold;
					font-size: 38px;
					color: #000000;
					margin-right: 30px;
				}
				.score {
					font-weight: 500;
					font-size: 20px;
					color: #000000;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 34px;
						height: 32px;
						margin-right: 13px;
					}
				}
			}
			.done-list {
				font-weight: 500;
				font-size: 20px;
				color: #000000;
			}
		}
		.person-right {
			width: 172px;
			height: 41px;
			background: #ffc886;
			border-radius: 17px;
			font-weight: 400;
			font-size: 20px;
			color: #000000;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 15px;
				height: 23px;
				margin-right: 8px;
			}
		}
	}
	.comments-like {
		display: flex;
		align-items: center;
		padding: 30px 0;
		span {
			font-weight: 500;
			font-size: 24px;
			color: #a6a6a6;
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 52px;
				height: 44px;
				margin-right: 15px;
			}
		}
		.border-line {
			border-right: 2px solid #bbbbbc;
			img {
				margin-right: 6px;
				width: 47px;
				height: 44px;
			}
		}
	}
	.specification-item {
		display: flex;
		align-items: center;
		padding: 10px;
		font-size: 28px;
		box-sizing: border-box;
		margin: 0 auto 10px;
		width: 715px;
		height: 212px;
		background: #ffffff;
		box-sizing: border-box;

		.specification-img {
			width: 200px;
			height: 200px;
			margin-right: 30px;
		}
		.specification-info {
			flex: 1;
			height: 200px;
			.spe-name {
				font-weight: 500;
				font-size: 32px;
				color: #010000;
				margin-bottom: 30px;
				margin-top: 20px;
			}
			.spe-suggestion,
			.spe-time {
				font-weight: 500;
				font-size: 22px;
				color: #010000;
				display: flex;
				align-items: center;
				margin-bottom: 30px;
				img {
					width: 28px;
					height: 27px;
					margin-right: 11px;
				}
			}
		}
		.item-right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			margin-right: 30px;
			height: 100%;
			.spe-price {
				font-weight: 500;
				font-size: 28px;
				color: #000000;
				margin: 20px 0;
			}
			.spe-sel {
				img {
					width: 40px;
					height: 40px;
				}
			}
		}
	}
	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		height: 100px;
		background: #fff;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		.bottom-btn-left {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: bold;
			font-size: 22px;
			color: #20241f;
		}
		.bottom-btn-right {
			width: 175px;
			height: 64px;
			background: #93f582;
			border-radius: 29px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: bold;
			font-size: 34px;
			color: #061710;
			margin-right: 50px;
		}
	}
}
</style>
