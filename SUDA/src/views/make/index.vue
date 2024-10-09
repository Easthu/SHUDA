<template>
	<div class="make-layout">
		<img :src="homeBg" alt="" class="home-bg-fix" />

		<div class="make-search">
			<div class="search-box">
				<img src="@/assets/images/icons/home-search.png" alt="" />
				<input type="text" placeholder="搜索兼职 / 向导" v-model="searchForm.name" />
				<div class="search-submit" @click="hanldeSearch">搜索</div>
			</div>
			<div class="sift" @click="showSiftbBox = true">
				<img src="@/assets/images/icons/make-sift.png" alt="" />
				筛选
			</div>
		</div>
		<div class="make-category">
			<div
				class="category-item"
				@click="handleTypeChange(1)"
				:class="{ active: searchForm.type == 1 }"
			>
				<span>本地向导</span>
			</div>
			<div
				class="category-item"
				@click="handleTypeChange(2)"
				:class="{ active: searchForm.type == 2 }"
			>
				<span> 陪诊就医 </span>
			</div>
		</div>
		<GoodsList :makeList="makeList" :nature="searchForm.type" />
		<!-- 筛选 -->
		<van-overlay :show="showSiftbBox" z-index="9999" @click="showSiftbBox = false">
			<div class="sift-wrapper" @click.stop>
				<div class="sift-content">
					<div class="sift-title">性别</div>
					<div class="sift-sex">
						<div
							class="sex"
							@click="searchForm.sex = 1"
							:class="{ activeSex: searchForm.sex == 1 }"
						>
							<img src="@/assets/images/icons/make-man.png" alt="" /> 男
						</div>
						<div
							class="sex"
							@click="searchForm.sex = 2"
							:class="{ activeSex: searchForm.sex == 2 }"
						>
							<img src="@/assets/images/icons/make-women.png" alt="" />女
						</div>
					</div>
				</div>
				<div class="sift-content">
					<div class="sift-title">年龄</div>
					<div class="sift-age">
						<input type="tel" v-model="searchForm.agemin" placeholder="最小" />
						<div class="border-line"></div>
						<input type="tel" v-model="searchForm.agemax" placeholder="最大" />
					</div>
				</div>
				<div class="sift-content">
					<div class="sift-title">景点选择</div>
					<div class="sift-attractions">
						<van-collapse v-model="clickAreaId" accordion @change="handleClickArea">
							<van-collapse-item
								:name="item.id"
								v-for="item in areaLsit"
								:key="item.id"
							>
								<template #title>
									<div class="collapse">
										<img src="@/assets/images/icons/make-position.png" alt="" />
										<span :class="{ activeCollapse: item.id == clickAreaId }">
											{{ item.area }}
										</span>
									</div>
								</template>
								<div class="place-list" v-for="row in twoareaList" :key="row.id">
									<p
										:class="{ active: row.name == searchForm.sys }"
										@click.stop="searchForm.sys = row.name"
									>
										{{ row.name }}
									</p>
								</div>
							</van-collapse-item>
						</van-collapse>
					</div>
				</div>
				<div class="sift-btn">
					<div class="reset" @click="handleReset">重置</div>
					<div class="confirm" @click="handleConfirmSift">确认</div>
				</div>
			</div>
		</van-overlay>
	</div>
</template>

<script setup>
import homeBg from '@/assets/images/home/home-bg.png';
import GoodsList from '@/components/goodsList.vue';
import { requestApi } from 'api/home';
import { showLoadingToast, closeToast } from 'vant';
import { ref } from 'vue';

const searchForm = ref({
	name: null, //名字查询
	sex: null, //性别性别 1男 2女
	agemin: null, //最小年龄
	agemax: null, //最大年龄
	sys: null, //医院或者景区名字查询
	type: 1, // 2陪诊就医        1本地向导
	currentPage: 1,
	op: 'yuyue',
});

// 顶部搜索
const hanldeSearch = () => {
	searchForm.currentPage = 1;
	handleApiMakeList();
};

// 筛选框
const showSiftbBox = ref(false);

// 筛选确认
const handleConfirmSift = () => {
	showSiftbBox.value = false;
	handleApiMakeList();
};
// 筛选重置
const handleReset = () => {
	searchForm.value.sex = null;
	searchForm.value.agemin = null;
	searchForm.value.agemax = null;
	searchForm.value.sys = null;
};

// 切换预约类型
const handleTypeChange = (type) => {
	searchForm.value.type = type;
	handleApiMakeList();
};

// 向导/陪诊人员数量数据
const makeList = ref([]);
// 获取向导/陪诊人员数量
const handleApiMakeList = async () => {
	const res = await requestApi(searchForm.value);
	console.log(res);
	makeList.value = res.data;
};

const areaLsit = ref([]);
const clickAreaId = ref(null);
const twoareaList = ref([]);
const requestRecommendList = async () => {
	showLoadingToast();
	const res = await requestApi({
		op: 'area',
		classify: searchForm.value.type == 1 ? 3 : 4, //1酒店 2餐饮 3景点 4医院
		city: '重庆',
	}).finally(() => {
		closeToast();
	});
	console.log('res :>> ', res.data);
	areaLsit.value = res.data;
};
const handleClickArea = async (id) => {
	if (!id) return;
	clickAreaId.value = id;
	twoareaList.value = [];
	const res = await requestApi({
		op: 'twoarea',
		type: searchForm.value.type == 1 ? 3 : 4, //1酒店 2餐饮 3景点 4医院
		areaid: id,
	}).finally(() => {
		closeToast();
	});
	twoareaList.value = res.data;
};

onMounted(() => {
	handleApiMakeList();
	requestRecommendList();
});
</script>

<style lang="less" scoped>
.make-layout {
	padding: 20px;
	box-sizing: border-box;
	min-width: 100vw;
	min-height: 100vh;
	background-color: #fff;
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
}
.make-search {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20px;
	position: relative;
	z-index: 2;
	margin-bottom: 44px;
	.search-box {
		display: flex;
		align-items: center;
		width: 528px;
		height: 66px;
		background: #ffffff;
		border-radius: 33px;
		border: 4px solid #000000;
		box-sizing: border-box;
		img {
			width: 29px;
			height: 28px;
			margin-right: 11px;
			margin-left: 28px;
		}
		input {
			flex: 1;
			font-weight: 300;
			font-size: 24px;
			color: #061710;
			background: #fff;
			border: none;
			outline: none;
			&::placeholder {
				color: #000;
			}
		}
		.search-submit {
			width: 114px;
			height: 49px;
			background: #93f582;
			border-radius: 25px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			font-size: 26px;
			color: #061710;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 10px;
		}
	}
	.sift {
		display: flex;
		align-items: center;
		font-weight: 400;
		font-size: 30px;
		color: #061710;
		img {
			width: 42px;
			height: 31px;
			color: #061710;
			margin-right: 11px;
		}
	}
}
.van-overlay {
	display: flex;
}
.sift-wrapper {
	margin-left: auto;
	width: 60vw;
	height: 100vh;
	background-color: #fff;
	font-size: 28px;
	padding-top: 102px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding-bottom: 130px;
	bottom: calc(130px + constant(safe-area-inset-bottom));
	bottom: calc(130px + env(safe-area-inset-bottom));
	.sift-content {
		margin-bottom: 30px;
		.sift-title {
			font-weight: 500;
			font-size: 26px;
			color: #010000;
			margin-bottom: 30px;
			margin-left: 39px;
		}
		.sift-sex {
			display: flex;
			margin-left: 39px;
			.sex {
				width: 152px;
				height: 53px;
				font-weight: 400;
				font-size: 26px;
				color: #010000;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					width: 18px;
					height: 18px;
					margin-right: 18px;
				}
			}
			.activeSex {
				background: #e9e9e9;
			}
		}
		.sift-age {
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			input {
				width: 118px;
				height: 48px;
				background: #defcd9;
				font-weight: 400;
				font-size: 24px;
				color: #00be12;
				border: none;
				outline: none;
				text-align: center;
			}
			.border-line {
				width: 68px;
				height: 3px;
				background: #e0e0e0;
				margin: 0 5px;
			}

			.custom-button {
				width: 50px;
				font-weight: 500;
				font-size: 24px;
				color: #00be12;
				text-align: center;
				background: #defcd9;
			}
		}
		.collapse {
			display: flex;
			align-items: center;
			font-weight: 600;
			font-size: 26px;
			color: #010000;
			img {
				width: 22px;
				height: 31px;
				margin-right: 14px;
			}
		}
		.activeCollapse {
			color: #93f582;
			.iconfont {
				color: #93f582;
			}
		}
		::v-deep(.van-collapse-item__content) {
			padding: 0;
		}
		.place-list {
			font-weight: 400;
			font-size: 26px;
			color: #010000;

			p {
				padding: 20px 81px;
				text-align: left;
				background: #f1f1f1;
			}
			.active {
				background: rgba(147, 245, 130, 0.3);
			}
		}
	}
	.sift-btn {
		margin-top: auto;
		display: flex;
		justify-content: space-around;
		div {
			width: 196px;
			height: 65px;
			border-radius: 11px;
			font-weight: 500;
			font-size: 34px;
			color: #000000;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.reset {
			background: #66c0f8;
		}
		.confirm {
			background: #93f582;
		}
	}
}
.make-category {
	display: flex;
	align-items: center;
	position: relative;
	margin-bottom: 34px;
	.category-item {
		font-weight: 600;
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
</style>
