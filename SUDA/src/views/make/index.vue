<template>
	<div class="make-layout">
		<img :src="homeBg" alt="" class="home-bg-fix" />

		<div class="make-search">
			<div class="search-box">
				<img src="@/assets/images/icons/home-search.png" alt="" />
				<input type="text" placeholder="搜索兼职 / 向导" />
				<div class="search-submit">搜索</div>
			</div>
			<div class="sift" @click="showSiftbBox = true">
				<img src="@/assets/images/icons/make-sift.png" alt="" />
				筛选
			</div>
		</div>
		<div class="make-category">
			<div
				class="category-item"
				@click="active = 'wizard'"
				:class="{ active: active == 'wizard' }"
			>
				<span>本地向导</span>
			</div>
			<div
				class="category-item"
				@click="active = 'medical'"
				:class="{ active: active == 'medical' }"
			>
				<span> 陪诊就医 </span>
			</div>
		</div>
		<GoodsList />
		<!-- 筛选 -->
		<van-overlay :show="showSiftbBox" z-index="9999">
			<div class="sift-wrapper" @click.stop>
				<div class="sift-content">
					<div class="sift-title">性别</div>
					<div class="sift-sex">
						<div
							class="sex"
							@click="siftSex = 'man'"
							:class="{ activeSex: siftSex == 'man' }"
						>
							<img src="@/assets/images/icons/make-man.png" alt="" /> 男
						</div>
						<div
							class="sex"
							@click="siftSex = 'woman'"
							:class="{ activeSex: siftSex == 'woman' }"
						>
							<img src="@/assets/images/icons/make-women.png" alt="" />女
						</div>
					</div>
				</div>
				<div class="sift-content">
					<div class="sift-title">年龄</div>
					<div class="sift-age">
						<input type="tel" v-model="siftAge[0]" placeholder="最小" />
						<div class="border-line"></div>
						<input type="tel" v-model="siftAge[1]" placeholder="最大" />
					</div>
				</div>
				<div class="sift-content">
					<div class="sift-title">景点选择</div>
					<div class="sift-attractions">
						<van-collapse v-model="activeNames">
							<van-collapse-item name="1">
								<template #title>
									<div class="collapse active-collapse">
										<img src="@/assets/images/icons/make-position.png" alt="" />
										渝中区4
									</div>
								</template>
								<div class="place-list">
									<p class="active">临江门附二院</p>
									<p>七星岗妇幼保健院</p>
									<p>中山医院</p>
									<p>儿童医院</p>
								</div>
							</van-collapse-item>
							<van-collapse-item name="2">
								<template #title>
									<div class="collapse">
										<img src="@/assets/images/icons/make-position.png" alt="" />
										江北区
									</div>
								</template>
								<div class="place-list">
									<p>临江门附二院</p>
									<p>七星岗妇幼保健院</p>
									<p>中山医院</p>
									<p>儿童医院</p>
								</div>
							</van-collapse-item>
							<van-collapse-item name="3">
								<template #title>
									<div class="collapse">
										<img src="@/assets/images/icons/make-position.png" alt="" />
										南岸区
									</div>
								</template>
								<div class="place-list">
									<p>临江门附二院</p>
									<p>七星岗妇幼保健院</p>
									<p>中山医院</p>
									<p>儿童医院</p>
								</div>
							</van-collapse-item>
						</van-collapse>
					</div>
				</div>
				<div class="sift-btn">
					<div class="reset">重置</div>
					<div class="confirm" @click="handleConfirmSift">确认</div>
				</div>
			</div>
		</van-overlay>
	</div>
</template>

<script setup>
import homeBg from '@/assets/images/home/home-bg.png';
import GoodsList from '@/components/goodsList.vue';

const active = ref('wizard');
const searchValue = ref('');
const hanldeSearch = () => {
	console.log(searchValue.value);
};
const showSiftbBox = ref(false);
const activeNames = ref([]);
const siftSex = ref('man');
const siftAge = ref([null, null]);
const handleConfirmSift = () => {
	showSiftbBox.value = false;
};
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
		.active-collapse {
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
