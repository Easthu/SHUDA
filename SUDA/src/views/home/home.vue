<script setup name="Home">
import useHome from './hooks/useHome';
import GoodsList from '@/components/goodsList.vue';
import homeBg from '@/assets/images/home/home-bg.png';

const router = useRouter();
const {
	position,
	positionList,
	active,
	recommendList,
	handleLinkRecommend,
	init,
	bannerList,
	homeMakeList,
	handleChangeNav,
} = useHome();
onMounted(() => {
	init.value();
});
</script>
<!-- 首页 -->
<template>
	<div class="homeLayout">
		<img :src="homeBg" alt="" class="home-bg-fix" />
		<div class="home-search">
			<div class="city-choose">
				<img src="@/assets/images/icons/home-position.png" alt="" />
				<span>重庆</span>
			</div>
			<div class="search-box">
				<img src="@/assets/images/icons/home-search.png" alt="" />
				<input type="text" placeholder="搜索兼职 / 向导" />
				<div class="search-submit">搜索</div>
			</div>
		</div>
		<div class="home-swiper">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="item in bannerList" :key="item.id">
					<img :src="item.banner" />
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
		<div class="make-category">
			<div class="category-item" @click="handleChangeNav(1)" :class="{ active: active == 1 }">
				<span>本地向导</span>
			</div>
			<div class="category-item" @click="handleChangeNav(2)" :class="{ active: active == 2 }">
				<span> 陪诊就医 </span>
			</div>
		</div>
		<GoodsList :makeList="homeMakeList" />
	</div>
</template>
<style lang="less" scoped>
.homeLayout {
	padding: 18px;
	box-sizing: border-box;
	min-width: 100vw;
	min-height: 100vh;
	padding-top: 40px;
	background: #f7f7f7;
	padding-bottom: 130px;
	bottom: calc(130px + constant(safe-area-inset-bottom));
	bottom: calc(130px + env(safe-area-inset-bottom));
	position: relative;
	top: 0;
	.home-bg-fix {
		position: absolute;
		z-index: 0;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
	}
	.home-search {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 33px;
		position: relative;
		z-index: 1;
		.city-choose {
			display: flex;
			align-items: center;
			width: 180px;
			span {
				font-weight: 400;
				font-size: 30px;
				color: #061710;
			}
			img {
				width: 31px;
				height: 30px;
				margin-right: 14px;
				margin-left: 20px;
				display: flex;
				align-items: center;
			}
		}
		.search-box {
			display: flex;
			align-items: center;
			width: 528px;
			height: 74px;
			background: #ffffff;
			border-radius: 40px;
			border: 4px solid #000000;
			box-sizing: border-box;
			img {
				width: 29px;
				height: 28px;
				margin-right: 20px;
				margin-left: 25px;
			}
			input {
				flex: 1;
				font-weight: bold;
				font-size: 24px;
				color: #061710;
				color: #999;
				background: #fff;
				border: none;
				outline: none;
			}
			.search-submit {
				width: 114px;
				height: 49px;
				background: #93f582;
				border-radius: 25px;
				font-family: Source Han Sans CN;
				font-weight: bold;
				font-size: 26px;
				color: #061710;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 10px;
			}
		}
	}
	.home-swiper {
		display: flex;
		justify-content: space-between;
		margin-bottom: 17px;
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
		margin-bottom: 48px;
		position: relative;
		z-index: 1;
		div {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			img {
				width: 74px;
				height: 78px;
				margin-bottom: 20px;
			}
			font-weight: 500;
			font-size: 24px;
			color: #010000;
		}
	}
	.make-category {
		display: flex;
		align-items: center;
		position: relative;
		margin-bottom: 22px;
		.category-item {
			font-weight: 500;
			font-size: 29px;
			color: #010000;
			margin-left: 22px;
			margin-right: 56px;
			position: relative;
			z-index: 3;
			span {
				position: relative;
				z-index: 3;
			}
		}
		.active {
			&::after {
				content: '';
				width: 120px;
				height: 16px;
				background: #93f582;
				border-radius: 8px;
				position: absolute;
				left: 0;
				bottom: -11px;
				z-index: 2;
			}
		}
	}
}
</style>
