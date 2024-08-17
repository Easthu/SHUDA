<template>
	<div class="make-layout">
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
		<div class="make-search">
			<van-search
				v-model="searchValue"
				placeholder="请输入向导/陪诊名称或者目的地"
				clearable
				left-icon=""
				@click="hanldeSearch"
			/>
			<div class="sift" @click="showSiftbBox = true">
				<van-icon name="filter-o" size="20" />筛选
			</div>
		</div>
		<GoodsList />
		<!-- 筛选 -->
		<van-overlay :show="showSiftbBox">
			<div class="sift-wrapper" @click.stop>
				<div class="sift-content">
					<div class="sift-title">性别</div>
					<div class="sift-sex">
						<van-radio-group v-model="siftSex" direction="horizontal">
							<van-radio name="1">男</van-radio>
							<van-radio name="2">女</van-radio>
						</van-radio-group>
					</div>
				</div>
				<div class="sift-content">
					<div class="sift-title">年龄</div>
					<div class="sift-age">
						<van-slider v-model="siftAge" range :min="0" :max="100" bar-height="5px">
							<template #left-button>
								<div class="custom-button">{{ siftAge[0] }}</div>
							</template>
							<template #right-button>
								<div class="custom-button">{{ siftAge[1] }}</div>
							</template>
						</van-slider>
					</div>
				</div>
				<div class="sift-content">
					<div class="sift-title">景点选择</div>
					<div class="sift-attractions">
						<van-collapse v-model="activeNames">
							<van-collapse-item name="1">
								<template #title>
									<div><van-icon name="wap-home-o" />渝中区3</div>
								</template>
								代码是写出来给人看的，附带能在机器上运行。
							</van-collapse-item>
							<van-collapse-item name="2">
								<template #title>
									<div><van-icon name="wap-home-o" />渝中区3</div>
								</template>
								技术无非就是那些开发它的人的共同灵魂。
							</van-collapse-item>
							<van-collapse-item name="3">
								<template #title>
									<div><van-icon name="wap-home-o" />渝中区3</div>
								</template>
								在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
							</van-collapse-item>
						</van-collapse>
					</div>
				</div>
				<div class="sift-btn">
					<van-button type="primary" block size="small" @click="handleConfirmSift"
						>确定</van-button
					>
					<van-button type="default" block size="small">重置</van-button>
				</div>
			</div>
		</van-overlay>
	</div>
</template>

<script setup>
import GoodsList from '@/components/goodsList.vue';

const active = ref(0);
const searchValue = ref('');
const hanldeSearch = () => {
	console.log(searchValue.value);
};
const showSiftbBox = ref(false);
const activeNames = ref([]);
const siftSex = ref('');
const siftAge = ref([20, 40]);
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
}
.make-search {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20px;
	.van-search {
		width: 600px;
	}
	.sift {
		font-size: 28px;
		color: #3a3a3a;
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
	padding: 20px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding-bottom: 130px;
	bottom: calc(130px + constant(safe-area-inset-bottom));
	bottom: calc(130px + env(safe-area-inset-bottom));
	.sift-content {
		margin-bottom: 20px;
		.sift-title {
			font-size: 32px;
			margin-bottom: 16px;
		}
		.sift-age {
			height: 50px;
			display: flex;
			align-items: center;
			.custom-button {
				width: 50px;
				color: #fff;
				font-size: 26px;
				text-align: center;
				background-color: var(--van-primary-color);
				border-radius: 100px;
			}
		}
	}
	.sift-btn {
		margin-top: auto;
		display: flex;
		justify-content: space-around;
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
</style>
