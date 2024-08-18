<script setup name="Home">
import useHome from './hooks/useHome';
import GoodsList from '@/components/goodsList.vue';
const router = useRouter();
const {
	position,
	positionList,
	images,
	active,
	recommendList,
	tabsTitleClass,
	handleLinkRecommend,
} = useHome();
</script>
<!-- 首页 -->
<template>
	<div class="homeLayout">
		<NavBar :showRight="true" showLeftText="给你恰到好处的陪伴" />
		<div class="home-swiper">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="image in images" :key="image">
					<img :src="image" />
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="recommend-list">
			<div
				v-for="(item, index) in recommendList"
				:key="index"
				@click="handleLinkRecommend(item)"
			>
				<img :src="item.src" alt="" />
				{{ item.text }}
			</div>
		</div>
		<van-tabs
			v-model:active="active"
			title-active-color="#fff"
			color="#1989fa"
			:duration="0"
			title-inactive-color="#1989fa"
		>
			<van-tab title="本地向导"></van-tab>
			<van-tab title="陪诊就医"></van-tab>
		</van-tabs>
		<GoodsList />
	</div>
</template>
<style lang="less" scoped>
.homeLayout {
	padding: 20px;
	box-sizing: border-box;
	min-width: 100vw;
	min-height: 100vh;
	background-color: #fff;
	padding-top: 0;
	padding-bottom: 130px;
	bottom: calc(130px + constant(safe-area-inset-bottom));
	bottom: calc(130px + env(safe-area-inset-bottom));
	.home-swiper {
		display: flex;
		justify-content: space-between;
		margin-bottom: 24px;
		.my-swipe {
			width: 710px;
			height: 300px;
		}
		.van-swipe-item {
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.recommend-list {
		display: flex;
		justify-content: space-around;
		margin-bottom: 24px;
		div {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			img {
				width: 100px;
				height: 100px;
				border-radius: 6px;
				margin-bottom: 20px;
			}
			font-size: 28px;
		}
	}
	.van-tabs {
		width: 100%;
		border: 2px solid #1989fa;
		border-radius: 20px;
		box-sizing: border-box;
		overflow: hidden;
		.van-tabs__nav--card {
			margin: 0;
		}
		:deep(.van-tab--active) {
			background: #1989fa;
			color: #fff;
			font-weight: normal;
		}
	}
}
</style>
