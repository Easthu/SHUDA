<template>
	<div class="goods-loyout">
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list v-model:loading="loading" :finished="finished" @load="onLoad">
				<div v-for="item in goodsList" :key="item" class="goods-item">
					<img :src="item.img" alt="" class="goods-img" />
					<div class="goods-info">
						<div class="goods-name">
							<span class="name">
								{{ item.name }}
							</span>
							<i class="iconfont">&#xe618;</i>
							<span class="age">25岁</span>
						</div>
						<div class="goods-license">
							<i class="iconfont">&#xe60b;</i> 个人营业执照
						</div>
						<div class="goods-project">{{ item.project }}</div>
						<div class="goods-comments-like">
							<span class="comments"
								><i class="iconfont">&#xe607;</i>{{ item.comments }}</span
							><span class="like"
								><i class="iconfont">&#xe85c;</i>{{ item.like }}</span
							>
						</div>
					</div>
					<div class="done-make-btn">
						<span class="score"><i class="iconfont">&#xe64b;</i> {{ item.score }}</span>
						<div class="done-num">已完成{{ item.doneNum }}单</div>
						<div class="make-right" @click="handleLinkMakeDetail">立即预约</div>
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
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
				.iconfont {
					font-size: 30px;
					color: #f03589;
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
				span {
					margin-right: 55px;
					display: flex;
					align-items: center;
					font-weight: 500;
					font-size: 16px;
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
					.iconfont {
						color: #f6585e;
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
				.iconfont {
					font-size: 20px;
					color: #f9ca02;
				}
			}
			.done-num {
				font-weight: 400;
				font-size: 22px;
				color: #b2b0b0;
				margin-top: 30px;
			}
			.make-right {
				width: 165px;
				height: 61px;
				background: #93f582;
				border-radius: 29px;
				font-weight: bold;
				font-size: 28px;
				color: #061710;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 46px;
			}
		}
	}
}
</style>
