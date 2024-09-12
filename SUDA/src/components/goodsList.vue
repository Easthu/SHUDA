<template>
	<div class="goods-loyout">
		<!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
		<!-- <van-list v-model:loading="loading" :finished="finished" @load="onLoad"> -->
		<div v-for="item in staffInfoList" :key="item" class="goods-item">
			<img :src="item.picture" alt="" class="goods-img" />
			<div class="goods-info">
				<div class="goods-name">
					<span class="name">
						{{ item.name }}
					</span>
					<img src="@/assets/images/icons/make-man.png" alt="" v-if="item.Sex == 1" />
					<img src="@/assets/images/icons/make-women.png" alt="" v-if="item.Sex == 2" />
					<span class="age">{{ item.age }}岁</span>
				</div>
				<div class="goods-license" v-if="item.ifbusiness">
					<i class="iconfont">&#xe60b;</i> 个人营业执照
				</div>
				<div class="goods-project" v-if="item.scenicspot.length > 0 && item.nature == 1">
					{{ item.scenicspot.map((item) => item.name).join(',') }}
				</div>
				<div class="goods-project" v-if="item.hospital.length > 0 && item.nature == 2">
					{{ item.hospital.map((item) => item.name).join(',') }}
				</div>
				<div class="goods-comments-like">
					<div class="comments"><i class="iconfont">&#xe607;</i>{{ item.appraise }}</div>
					<div class="like">
						<img src="@/assets/images/icons/make-like.png" alt="" />{{ item.lovesum }}
					</div>
				</div>
			</div>
			<div class="done-make-btn">
				<div class="score">
					<img src="@/assets/images/icons/make-star.png" alt="" />
					{{ item.Score }}
				</div>
				<div class="done-num">已完成{{ item.odersum }}单</div>
				<div class="make-right" @click="handleLinkMakeDetail">立即预约</div>
			</div>
		</div>
		<!-- </van-list> -->
		<!-- </van-pull-refresh> -->
	</div>
</template>

<script setup>
const router = useRouter();
const refreshing = ref(false);
const loading = ref(false);
const finished = ref(false);
import zhouxingle from '@/assets/images/home/zhouxingle.png';
import zhaoheng from '@/assets/images/home/zhaoheng.png';
import zhangzhongke from '@/assets/images/home/zhangzhongke.png';
import tuliaoning from '@/assets/images/home/tuliaoning.png';
import wangli from '@/assets/images/home/wangli.png';
import xiezhirong from '@/assets/images/home/xiezhirong.png';
import qinhuilin from '@/assets/images/home/qinhuilin.png';

const props = defineProps({
	staffInfoList: {
		type: Array,
		default: () => [],
	},
});

const personList = [
	{
		img: zhouxingle,
		name: '周兴乐',
		project: '洪崖洞 李子坝 朝天门 ...',
		comments: 178,
		like: 236,
		doneNum: 20,
		score: 4.8,
	},
	{
		img: zhaoheng,
		name: '赵恒',
		project: '洪崖洞 李子坝 朝天门 ...',
		comments: 178,
		like: 236,
		doneNum: 20,
		score: 4.8,
	},
	{
		img: zhangzhongke,
		name: '张重科',
		project: '洪崖洞 李子坝 朝天门 ...',
		comments: 178,
		like: 236,
		doneNum: 20,
		score: 4.8,
	},
	{
		img: xiezhirong,
		name: '谢芝容',
		project: '洪崖洞 李子坝 朝天门 ...',
		comments: 178,
		like: 236,
		doneNum: 20,
		score: 4.8,
	},
	{
		img: wangli,
		name: '王丽',
		project: '洪崖洞 李子坝 朝天门 ...',
		comments: 178,
		like: 236,
		doneNum: 20,
		score: 4.8,
	},
	{
		img: tuliaoning,
		name: '凃辽林',
		project: '洪崖洞 李子坝 朝天门 ...',
		comments: 178,
		like: 236,
		doneNum: 20,
		score: 4.8,
	},
	{
		img: qinhuilin,
		name: '秦慧琳',
		project: '洪崖洞 李子坝 朝天门 ...',
		comments: 178,
		like: 236,
		doneNum: 20,
		score: 4.8,
	},
	{
		img: zhouxingle,
		name: '周兴乐',
		project: '洪崖洞 李子坝 朝天门 ...',
		comments: 178,
		like: 236,
		doneNum: 20,
		score: 4.8,
	},
];
const goodsList = ref([personList[0], personList[1]]);

const onRefresh = () => {
	// 清空列表数据
	goodsList.value = [personList[0], personList[1]];
	// 重新加载数据
	// 将 loading 设置为 true，表示处于加载状态
	loading.value = true;
	// 重新加载数据
	onLoad();
	refreshing.value = false;
};
const onLoad = () => {
	// 异步更新数据
	// setTimeout 仅做示例，真实场景中一般为 ajax 请求
	setTimeout(() => {
		goodsList.value.push(personList[goodsList.value.length]);
		// 加载状态结束
		loading.value = false;
		// 数据全部加载完成
		if (goodsList.value.length >= 7) {
			finished.value = true;
		}
	}, 1000);
};
const handleLinkMakeDetail = () => {
	console.log('立即预约');
	router.push('/makeDetail');
};
</script>

<style lang="less" scoped>
.goods-loyout {
	display: flex;
	flex-wrap: wrap;
	position: relative;
	z-index: 2;
	.goods-item {
		width: 715px;
		height: 212px;
		background: #ffffff;
		margin-bottom: 8px;
		padding: 6px 20px 6px 14px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.goods-img {
			height: 200px;
			width: 200px;
			margin-right: 32px;
		}
		.goods-info {
			display: flex;
			flex-direction: column;
			height: 100%;
			.goods-name {
				display: flex;
				align-items: center;
				margin: 26px 0;
				.name {
					margin-right: 10px;
					font-weight: 500;
					font-size: 30px;
					color: #010000;
				}
				img {
					width: 22px;
					height: 30px;
				}
				.age {
					font-weight: 500;
					font-size: 22px;
					color: #010000;
					margin-left: 8px;
				}
			}
			.goods-license {
				font-weight: 400;
				font-size: 22px;
				color: #010000;
				margin-bottom: 14px;
				display: flex;
				align-items: center;
				.iconfont {
					font-size: 30px;
					color: #a9f79b;
				}
			}
			.goods-project {
				font-weight: 400;
				font-size: 22px;
				color: #010000;
				margin-bottom: 22px;
			}
			.goods-comments-like {
				display: flex;
				align-items: center;
				div {
					margin-right: 55px;
					display: flex;
					align-items: center;
					font-weight: 500;
					font-size: 26px;
					color: #010000;
					.iconfont {
						font-size: 22px;
						margin-right: 8px;
					}
				}
				.comments {
					.iconfont {
						color: #93f582;
					}
				}
				.like {
					img {
						width: 31px;
						height: 26px;
						margin-right: 7px;
					}
				}
			}
		}
		.done-make-btn {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			height: 100%;
			margin-left: auto;
			.score {
				font-weight: 500;
				font-size: 22px;
				color: #010000;
				margin-top: 22px;
				img {
					width: 22px;
					height: 21px;
				}
			}
			.done-num {
				font-weight: 400;
				font-size: 22px;
				color: #b2b0b0;
				margin-top: 30px;
			}
			.make-right {
				width: 142px;
				height: 52px;
				background: #93f582;
				border-radius: 26px;
				font-weight: 400;
				font-size: 24px;
				color: #061710;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 46px;
				padding-top: 4px;
			}
		}
	}
}
</style>
