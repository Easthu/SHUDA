<template>
	<div class="goods-loyout">
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list v-model:loading="loading" :finished="finished" @load="onLoad">
				<div v-for="item in goodsList" :key="item" class="goods-item">
					<img src="https://picsum.photos/180" alt="" class="goods-img" />
					<div class="goods-info">
						<div class="goods-name">子非鱼</div>
						<div class="goods-license">个人营业执照</div>
						<div class="goods-project">洪崖洞 李子坝 朝天门 ...</div>
						<div class="goods-comments-like"><span>178</span><span>293</span></div>
					</div>
					<div class="done-make-btn">
						<span>4.3</span>
						<div class="done-num">已完成43单</div>
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
const onRefresh = () => {
	// 清空列表数据
	goodsList.value = [];
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
		for (let i = 0; i < 10; i++) {
			goodsList.value.push(goodsList.value.length + 1);
		}
		// 加载状态结束
		loading.value = false;
		// 数据全部加载完成
		if (goodsList.value.length >= 40) {
			finished.value = true;
		}
	}, 1000);
};
const handleLinkMakeDetail = () => {
	console.log('立即预约');
	router.push('/makeDetail');
};
const goodsList = ref([1, 2, 3]);
</script>

<style lang="less" scoped>
.goods-loyout {
	display: flex;
	flex-wrap: wrap;
	.goods-item {
		width: 710px;
		height: 210px;
		margin: 12px 0;
		border-radius: 10px;
		padding: 20px;
		border: 2px solid #ccc;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.goods-img {
			height: 180px;
			width: 180px;
			border-radius: 10px;
			margin-right: 60px;
		}
		.goods-info {
			display: flex;
			flex-direction: column;
			.goods-name {
				font-size: 26px;
				font-weight: 600;
				margin-bottom: 16px;
				color: #575757;
			}
			.goods-license {
				font-size: 24px;
				font-weight: 600;
				margin-bottom: 16px;
				color: #575757;
			}
			.goods-project {
				font-size: 24px;
				font-weight: 600;
				margin-bottom: 16px;
				color: #575757;
			}
			.goods-comments-like {
				font-size: 24px;
				font-weight: 600;
				margin-bottom: 16px;
				color: #575757;
				span {
					margin-right: 20px;
				}
			}
		}
		.done-make-btn {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			height: 100%;
			margin-left: auto;
			span {
				font-size: 24px;
				font-weight: 600;
				color: #575757;
				margin-bottom: 16px;
			}
			.done-num {
				font-size: 24px;
				font-weight: 600;
				color: #575757;
			}
			.make-right {
				font-size: 24px;
				margin-top: auto;
				font-weight: 600;
				color: #fff;
				border: 2px solid #ccc;
				padding: 10px 20px;
				border-radius: 10px;
				color: #575757;
			}
		}
	}
}
</style>
