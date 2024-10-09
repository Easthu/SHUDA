<template>
	<div class="recommend-layout">
		<img :src="homeBg" alt="" class="home-bg-fix" />
		<div class="page-title" v-if="route.query.classify == 1">推荐酒店</div>
		<div class="page-title" v-if="route.query.classify == 2">推荐餐饮</div>
		<div class="page-title" v-if="route.query.classify == 3">推荐景点</div>
		<div class="page-title" v-if="route.query.classify == 4">推荐医院</div>

		<div class="search-box">
			<img src="@/assets/images/icons/home-search.png" alt="" />
			<input type="text" placeholder="搜索兼职 / 向导" v-model="searchValue" />
			<div class="search-submit" @click="handleSearch">搜索</div>
		</div>
		<!-- 区域 -->
		<div class="nav-list">
			<div class="nav-list-content">
				<div
					class="list-item"
					v-for="(item, index) in areaList"
					:key="index"
					@click="handleActiveRecommend(item)"
					:class="{ active: areaId === item.id }"
				>
					<span>
						{{ item.area }}
					</span>
				</div>
			</div>
		</div>
		<div
			class="recommend-item"
			v-for="(item, index) in recommendList"
			:key="index"
			@click="handleLinkDetail(item)"
		>
			<img :src="item.url" alt="" class="recommend-img" />
			<!-- 酒店 -->
			<div class="recommend-info classify1" v-if="route.query.classify == 1">
				<div class="recommend-name">
					{{ item.name }}
				</div>
				<div class="secondary-name">
					{{ item.fullname }}
				</div>
				<div class="ranking">
					<div class="ranking-left">
						{{ item.level }}
					</div>

					<div class="ranking-right">
						<div class="ranking-item van-ellipsis">{{ item.label }}</div>
					</div>
				</div>
				<div class="skilled">
					<div class="skilled-right">{{ item.dis }}</div>
				</div>
				<div class="recommend-time">
					<span v-for="tips in item.tip.split('、')" :key="tips">{{ tips }}</span>
				</div>
			</div>
			<!-- 餐饮 -->
			<div class="recommend-info classify2" v-if="route.query.classify == 2">
				<div class="recommend-name">
					{{ item.name }}
				</div>
				<div class="ranking">
					<div class="ranking-right">
						<div class="ranking-item">
							营业时间：{{ item.opentime }} <span>{{ item.people }}</span>
						</div>
					</div>
				</div>
				<div class="skilled">
					<div class="skilled-right van-ellipsis">{{ item.label }}</div>
				</div>
				<div class="recommend-time">
					<span v-for="tips in item.tip.split('、')" :key="tips">{{ tips }}</span>
				</div>
			</div>
			<!-- 景点 -->
			<div class="recommend-info classify3" v-if="route.query.classify == 3">
				<div class="recommend-name">
					{{ item.name }} <span>{{ item.ja }}A</span>
				</div>
				<div class="secondary-name">
					{{ item.fullname }}
				</div>
				<div class="ranking">
					<div class="ranking-left">
						{{ item.level }}
					</div>
					<div class="ranking-right">
						<div class="ranking-item van-ellipsis">{{ item.label }}</div>
					</div>
				</div>
				<div class="skilled">
					<div class="skilled-right">{{ item.dis }}</div>
				</div>
				<div class="recommend-time">
					<span v-for="tips in item.tip.split('、')" :key="tips">{{ tips }}</span>
				</div>
			</div>
			<!-- 医院 -->
			<div class="recommend-info classify4" v-if="route.query.classify == 4">
				<div class="recommend-name">
					{{ item.name }} <span>{{ item.level }}</span>
				</div>
				<div class="secondary-name">
					{{ item.fullname }}
				</div>
				<div class="ranking">
					<div class="ranking-left">排行榜</div>

					<div class="ranking-right">
						<div class="ranking-item van-ellipsis">{{ item.js1 }}</div>
						<div class="ranking-item">{{ item.js2 }}</div>
					</div>
				</div>
				<div class="skilled">
					<div class="skilled-left"><span>擅</span><span>长</span></div>
					<div class="skilled-right">
						<div class="skilled-item van-multi-ellipsis--l2">{{ item.adept }}</div>
					</div>
				</div>
				<div class="recommend-time">
					营业时间 <span>{{ item.opening }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import homeBg from '@/assets/images/home/home-bg.png';
import recommendXinqiao from '@/assets/images/recommend/recommend-xinqiao.png';
import recommendXinan from '@/assets/images/recommend/recommend-xinan.png';
import recommendDaping from '@/assets/images/recommend/recommend-daping.png';
import { requestApi } from 'api/home';

const router = useRouter();
const route = useRoute();
const areaId = ref('');

const handleActiveRecommend = (item) => {
	areaId.value = item.id;
	requestRecommendList();
};

const recommendList = ref([]);
const handleLinkDetail = (item) => {
	sessionStorage.setItem('recommendDetail', JSON.stringify(item));
	router.push('/recommendDetail' + '?classify=' + route.query.classify);
};

// 区域选择
const areaList = ref([]);
const requestAreaLsit = async () => {
	const res = await requestApi({
		op: 'area',
		classify: route.query.classify,
		city: '重庆',
	});
	areaList.value = res.data;
	areaId.value = res.data[0].id;
};

const searchValue = ref('');
const currentPage = ref(1);
// 获取推荐列表
const requestRecommendList = async () => {
	const opList = ['', 'hotel', 'repast', 'scenic', 'hospital'];
	const res = await requestApi({
		op: opList[route.query.classify],
		classify: route.query.classify,
		currentPage: currentPage.value,
		name: searchValue.value,
		areaid: areaId.value,
	});
	recommendList.value = res[opList[route.query.classify]];
	console.log('recommendList.value :>> ', recommendList.value);
};
const handleSearch = () => {
	currentPage.value = 1;
	requestRecommendList();
};

onMounted(() => {
	requestAreaLsit().then(() => {
		requestRecommendList();
	});
});
</script>

<style lang="less" scoped>
.recommend-layout {
	width: 100vw;
	height: 100vh;
	background-color: #fff;
	padding: 20px;
	padding-bottom: 130px;
	bottom: calc(130px + constant(safe-area-inset-bottom));
	bottom: calc(130px + env(safe-area-inset-bottom));
	padding-top: 0;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
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
	.page-title {
		font-weight: bold;
		font-size: 32px;
		color: #061710;
		text-align: center;
		margin-top: 36px;
		position: relative;
		z-index: 2;
	}
	.search-box {
		display: flex;
		position: relative;
		z-index: 2;
		width: 666px;
		height: 66px;
		background: #ffffff;
		border-radius: 33px;
		border: 4px solid #000000;
		margin: 0 auto;
		margin-top: 30px;
		padding: 8px;
		box-sizing: border-box;
		align-items: center;
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
			font-weight: bold;
			font-size: 26px;
			color: #061710;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.nav-list {
		min-width: 100vw;
		position: relative;
		z-index: 3;
		.nav-list-content {
			display: flex;
			align-items: center;
			margin-bottom: 34px;
			margin-top: 42px;
			height: 40px;
			overflow-y: auto;
			padding-left: 40px;
			width: auto;
		}
		.list-item {
			font-weight: 500;
			font-size: 29px;
			color: #010000;
			box-sizing: border-box;
			width: auto;
			display: flex;
			position: relative;
			z-index: 2;
			flex-shrink: 0;
			margin-right: 40px;
			span {
				position: relative;
				z-index: 3;
			}
		}
		.active {
			&::after {
				content: '';
				height: 16px;
				background: #93f582;
				border-radius: 8px;
				position: absolute;
				left: 0;
				right: 0;
				bottom: -6px;
				z-index: 2;
			}
		}
	}
	.recommend-item {
		display: flex;
		width: 724px;
		height: 234px;
		padding: 10px 6px;
		box-sizing: border-box;
		margin: 0 auto 16px;
		position: relative;
		z-index: 2;
		background: #fff;
		border-radius: 15px;
		.recommend-img {
			width: 182px;
			height: 211px;
			margin-right: 14px;
			border-radius: 15px;
		}
		.recommend-info {
			display: flex;
			flex-direction: column;
			flex: 1;
			.recommend-name {
				font-weight: 400;
				font-size: 34px;
				color: #000000;
				display: flex;
				align-content: center;
				span {
					width: 76px;
					height: 34px;
					background: #33d1ff;
					border-radius: 17px;
					font-weight: 400;
					font-size: 25px;
					color: #000000;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 43px;
				}
			}
			.secondary-name {
				font-weight: 300;
				font-size: 18px;
				color: #061710;
			}
			.ranking {
				display: flex;
				align-items: center;
				.ranking-left {
					background: #93f582;
					border-radius: 10px;
					font-weight: 500;
					font-size: 24px;
					color: #000000;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.ranking-right {
					font-weight: 400;
					font-size: 20px;
					color: #000000;
					line-height: 24px;
					width: 400px;
				}
			}
			.skilled {
				display: flex;

				.skilled-left {
					font-weight: 400;
					font-size: 26px;
					color: #000000;
					width: 92px;
					display: flex;
					justify-content: space-between;
				}
				.skilled-right {
					font-weight: 500;
					font-size: 20px;
					color: #000000;
					line-height: 24px;
					width: 327px;
				}
			}
			.recommend-time {
				font-weight: 500;
				font-size: 22px;
				color: #000000;
				span {
					display: inline-block;
				}
			}
		}
		.classify1 {
			.recommend-name {
				margin-top: 10px;
			}
			.secondary-name {
				margin-top: 16px;
			}
			.skilled {
				margin-top: 14px;
				.skilled-right {
					margin-left: 0;
					font-weight: 400;
					font-size: 20px;
					color: #000000;
				}
			}
			.ranking {
				margin-top: 16px;
				.ranking-left {
					font-weight: bold;
					font-size: 22px;
					color: #000000;
					padding: 6px;
					border: none;
				}
			}
			.recommend-time {
				margin-top: 20px;
				span {
					font-weight: 400;
					font-size: 18px;
					color: #000000;
					padding: 4px 8px;
					margin-left: 0;
					margin-right: 6px;
					border: 1px solid #000000;
				}
			}
		}
		.classify2 {
			.ranking {
				margin-top: 20px;
				.ranking-item {
					font-weight: 400;
					font-size: 22px;
					color: #061710;
					span {
						margin-left: 43px;
					}
				}
			}
			.skilled {
				margin-top: 20px;
				.skilled-right {
					margin-left: 0;
					font-weight: 400;
					font-size: 20px;
					color: #000000;
				}
			}
			.recommend-time {
				margin-top: 20px;
				span {
					font-weight: 400;
					font-size: 18px;
					color: #000000;
					padding: 4px 8px;
					margin-left: 0;
					margin-right: 6px;
					border: 1px solid #000000;
				}
			}
		}
		.classify3 {
			.recommend-name {
				margin-top: 10px;
			}
			.secondary-name {
				margin-top: 16px;
			}
			.ranking {
				margin-top: 16px;
				.ranking-left {
					font-weight: bold;
					font-size: 22px;
					color: #000000;
					padding: 6px;
					border: none;
				}
			}
			.skilled {
				margin-top: 14px;
				.skilled-right {
					margin-left: 0;
					font-weight: 400;
					font-size: 20px;
					color: #000000;
				}
			}
			.recommend-time {
				margin-top: 20px;
				span {
					font-weight: 400;
					font-size: 18px;
					color: #000000;
					padding: 4px 8px;
					margin-left: 0;
					margin-right: 6px;
					border: 1px solid #000000;
				}
			}
		}
		.classify4 {
			.secondary-name {
				margin-top: 10px;
			}
			.ranking {
				margin-top: 17px;
				.ranking-left {
					width: 90px;
					height: 42px;
					background: #93f582;
					border-radius: 10px;
					border: 2px solid #000000;
					margin-right: 25px;
				}
			}
			.skilled {
				margin-top: 14px;
				.skilled-item {
					margin-left: 25px;
					height: 51px;
					line-height: 25px;
				}
			}
		}
	}
}
</style>
