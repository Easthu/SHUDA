<template>
	<div class="recommend-layout">
		<img :src="homeBg" alt="" class="home-bg-fix" />
		<div class="page-title">推荐医院</div>
		<div class="search-box">
			<i class="iconfont">&#xe65f;</i>
			<input type="text" placeholder="搜索兼职 / 向导" />
			<div class="search-submit">搜索</div>
		</div>
		<div class="nav-list">
			<div class="nav-list-content">
				<div
					class="list-item"
					v-for="(item, index) in navList"
					:key="index"
					@click="handleActiveRecommend(item)"
					:class="{ active: active === item }"
				>
					<span>
						{{ item }}
					</span>
				</div>
			</div>
		</div>
		<div
			class="recommend-item"
			v-for="(item, index) in recommendList"
			:key="index"
			@click="handleLinkDetail"
		>
			<img :src="item.img" alt="" class="recommend-img" />
			<div class="recommend-info">
				<div class="recommend-name">
					{{ item.name }} <span>{{ item.title }}</span>
				</div>
				<div class="secondary-name">
					{{ item.secondaryName }}
				</div>
				<div class="ranking">
					<div class="ranking-left">排行榜</div>
					<div class="ranking-right">
						<div class="ranking-item">{{ item.ranking1 }}</div>
						<div class="ranking-item">{{ item.ranking2 }}</div>
					</div>
				</div>
				<div class="skilled">
					<div class="skilled-left"><span>擅</span><span>长</span></div>
					<div class="skilled-right">
						<div class="skilled-item">{{ item.skilled }}</div>
					</div>
				</div>
				<div class="recommend-time">
					营业时间 <span>{{ item.time }}</span>
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

const router = useRouter();
const navList = ref([
	'渝北区',
	'沙坪坝区',
	'九龙坡区',
	'渝中区',
	'南岸区',
	'大渡口区',
	'巴南区',
	'北碚区',
]);
const active = ref('');
const handleActiveRecommend = (item) => {
	console.log(item);
	active.value = item;
};

const recommendList = [
	{
		img: recommendXinan,
		name: '重庆西南医院',
		title: '三甲',
		secondaryName: '陆军军医大学第一附属医院',
		ranking1: '全国医院综合排名：27',
		ranking2: '西南地区医院声誉排名：3',
		skilled: '消化内科、中医与风湿免疫科、感染病科、心血管内科、肝胆外科',
		time: '上午8:00-12:00 下午13:00-14:30',
	},
	{
		img: recommendXinqiao,
		name: '重庆新桥医院',
		title: '三甲',
		secondaryName: '陆军军医大学第二附属医院',
		ranking1: '全国医院综合排名：97',
		ranking2: '西南地区医院声誉排名：7',
		skilled: '血液科、医学工程科、呼吸内科、整形外科、消化内科、眼科',
		time: '上午8:00-12:00 下午13:00-14:30',
	},
	{
		img: recommendDaping,
		name: '重庆大坪医院',
		title: '三甲',
		secondaryName: '陆军特色医学中心',
		ranking1: '西南地区医院声誉排名：9',
		ranking2: '',
		skilled: '血液科、医学工程科、呼吸内科、整形外科、消化内科、眼科',
		time: '上午8:00-12:00 下午13:00-14:30',
	},
];
const handleLinkDetail = () => {
	router.push('/recommendDetail');
};
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
		.iconfont {
			font-size: 28px;
			opacity: 0.47;
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
			height: 30px;
			overflow: auto;
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
				bottom: -11px;
				z-index: 2;
			}
		}
	}
	.recommend-item {
		display: flex;
		width: 750px;
		height: 325px;
		padding: 40px;
		box-sizing: border-box;
		margin: 0 auto 16px;
		position: relative;
		z-index: 2;
		background: #fff;
		.recommend-img {
			width: 160px;
			height: 250px;
		}
		.recommend-info {
			display: flex;
			flex-direction: column;
			margin-left: 10px;
			justify-content: space-between;
			.recommend-name {
				font-weight: bold;
				font-size: 30px;
				color: #061710;
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
				.ranking-left {
					background: #93f582;
					border-radius: 10px;
					border: 2px solid #000000;
					font-weight: 500;
					font-size: 24px;
					width: 100px;
					height: 42px;
					color: #000000;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.ranking-right {
					font-weight: 500;
					font-size: 20px;
					color: #000000;
					margin-left: 26px;
					line-height: 24px;
					width: 327px;
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
					margin-left: 26px;
					line-height: 24px;
					width: 327px;
				}
			}
			.recommend-time {
				font-weight: 500;
				font-size: 22px;
				color: #000000;
				margin-bottom: 13px;
				span {
					display: inline-block;
					margin-left: 26px;
				}
			}
		}
	}
}
</style>
