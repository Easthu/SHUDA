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
		<div class="goods-loyout">
			<van-list v-model:loading="loading" :finished="finished" @load="onLoad" ref="listRef">
				<div v-for="item in makeList" :key="item" class="goods-item">
					<img :src="item.picture" alt="" class="goods-img" />
					<div class="goods-info">
						<div class="goods-name">
							<span class="name">
								{{ item.name }}
							</span>
							<img
								src="@/assets/images/icons/make-man.png"
								alt=""
								v-if="item.sex == 1"
							/>
							<img
								src="@/assets/images/icons/make-women.png"
								alt=""
								v-if="item.sex == 2"
							/>
							<span class="age">{{ item.age }}岁</span>
						</div>
						<div class="goods-license" @click="router.push('/personalBusinessLicense')">
							<img src="@/assets/images/icons/home-detail-license.png" alt="" />
							个人营业执照
						</div>
						<div
							class="goods-project van-ellipsis"
							v-if="item.scenicspot && item.nature == 1"
						>
							{{
								JSON.parse(item.scenicspot)
									.map((item) => item.name)
									.join(',')
							}}
						</div>
						<div
							class="goods-project van-ellipsis"
							v-if="item.hospital && item.nature == 2"
						>
							{{
								JSON.parse(item.hospital)
									.map((item) => item.name)
									.join(',')
							}}
						</div>
						<div class="goods-comments-like">
							<div class="comments">
								<img src="@/assets/images/icons/home-comments.png" alt="" />{{
									item.appraise
								}}
							</div>
							<div class="like">
								<img src="@/assets/images/icons/make-like.png" alt="" />{{
									item.lovesum
								}}
							</div>
						</div>
					</div>
					<div class="done-make-btn">
						<div class="score">
							<img src="@/assets/images/icons/make-star.png" alt="" />
							{{ item.score }}
						</div>
						<div class="done-num">已完成{{ item.odersum }}单</div>
						<div class="make-right" @click="handleLinkMakeDetail(item)">立即预约</div>
					</div>
				</div>
			</van-list>
		</div>
		<!-- 筛选 -->
		<van-overlay
			:show="showSiftbBox"
			z-index="9999"
			@click="showSiftbBox = false"
			:lock-scroll="false"
		>
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
					<div class="sift-title">{{ searchForm.type == 1 ? '景点' : '医院' }}选择</div>
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
import { requestApi } from 'api/home';
import { showLoadingToast, closeToast } from 'vant';

const router = useRouter();
const route = useRoute();

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
const loading = ref(false);
const finished = ref(false);
const listRef = ref(null);

if (route.query.sys) {
	searchForm.value.sys = route.query.sys;
}
if (route.query.type) {
	searchForm.value.type = route.query.type;
}

const onLoad = () => {
	handleApiMakeList();
	searchForm.value.currentPage++;
};

// 顶部搜索
const hanldeSearch = () => {
	searchForm.value.currentPage = 1;
	makeList.value = [];
	finished.value = false;
};

// 筛选框
const showSiftbBox = ref(false);

// 筛选确认
const handleConfirmSift = () => {
	showSiftbBox.value = false;
	makeList.value = [];
	searchForm.value.currentPage = 1;
	finished.value = false;
	handleApiMakeList();
};
// 筛选重置
const handleReset = () => {
	searchForm.value.sex = null;
	searchForm.value.agemin = null;
	searchForm.value.agemax = null;
	searchForm.value.sys = null;
	searchForm.value.name = null;
};

// 切换预约类型
const handleTypeChange = (type) => {
	handleReset();
	searchForm.value.type = type;
	makeList.value = [];
	requestRecommendList();
	nextTick(() => {
		searchForm.value.currentPage = 1;
		finished.value = false;
		handleApiMakeList();
	});
};

// 向导/陪诊人员数量数据
const makeList = ref([]);
// 获取向导/陪诊人员数量
const handleApiMakeList = async () => {
	const res = await requestApi(searchForm.value);
	console.log('res :>> ', res);
	// makeList.value = [...makeList.value, ...res.data];
	res.data.forEach((item) => {
		const find = makeList.value.find((i) => i.id === item.id);
		if (!find) {
			makeList.value.push(item);
		}
	});
	if (res.data.length == 0) {
		finished.value = true;
	}
	loading.value = false;
	// if (makeList.value.length <= 6 && res.data.length > 0) {
	// 	searchForm.value.currentPage++;
	// 	handleApiMakeList();
	// }
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
const handleLinkMakeDetail = (item) => {
	sessionStorage.setItem('makeDetailJson', JSON.stringify(item));
	router.push('/makeDetail?nature=' + item.nature);
};

onMounted(() => {
	// handleApiMakeList();
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
	min-height: 100vh;
	overflow-y: auto;
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
.goods-loyout {
	display: flex;
	flex-wrap: wrap;
	position: relative;
	z-index: 2;
	.goods-item {
		width: 715px;
		height: 254px;
		background: #ffffff;
		background: #ffffff;
		margin-bottom: 8px;
		padding: 6px 20px 6px 14px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.goods-img {
			width: 232px;
			height: 231px;
			margin-right: 20px;
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
					width: 30px;
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
				img {
					width: 19px;
					height: 30px;
					margin-right: 10px;
				}
			}
			.goods-project {
				font-weight: 400;
				font-size: 22px;
				color: #010000;
				margin-bottom: 22px;
				width: 270px;
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
					img {
						width: 28px;
						height: 29px;
						margin-right: 13px;
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
