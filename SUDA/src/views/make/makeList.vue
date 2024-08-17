<template>
	<div class="make-list-layout">
		<div class="mae-list-top">
			<p class="header-position" @click="showPicker = true">
				<van-icon name="location-o" />{{ fieldValue }}
			</p>
			<van-search
				v-model="searchValue"
				placeholder="请输入搜索关键词"
				@search="onSearch"
				background="#f5f5f5"
				clearable
				shape="round"
				left-icon=""
				right-icon="search"
				@click-right-icon="onSearch(searchValue)"
				@cancel="onCancel"
			/>
		</div>
		<div class="make-list-content">
			<div
				class="make-list-item"
				v-for="item in 6"
				:key="item"
				@click="router.push('/makeDetail')"
			>
				<img src="" alt="" class="goods-img" />
				<div class="goods-info">
					<div class="name">子非鱼</div>
					<div class="sex">27</div>
					<div class="mess-num">178</div>
					<div class="love-num">293</div>
				</div>
				<div class="make-btn">立即预约</div>
			</div>
		</div>
		<van-popup v-model:show="showPicker" round position="bottom">
			<van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
		</van-popup>
	</div>
</template>

<script setup>
const router = useRouter();
const columns = [
	{ text: '杭州', value: 'Hangzhou' },
	{ text: '宁波', value: 'Ningbo' },
	{ text: '温州', value: 'Wenzhou' },
	{ text: '绍兴', value: 'Shaoxing' },
	{ text: '湖州', value: 'Huzhou' },
];
const fieldValue = ref('杭州');
const showPicker = ref(false);
const searchValue = ref('');
const onSearch = (val) => {
	console.log(val);
};
const onCancel = () => {
	console.log('取消');
};

const onConfirm = ({ selectedOptions }) => {
	showPicker.value = false;
	fieldValue.value = selectedOptions[0].text;
};
</script>

<style lang="less" scoped>
.make-list-layout {
	padding: 24px;
	min-width: 100vw;
	min-height: 100vh;
	background-color: #f5f5f5;
	box-sizing: border-box;
	.mae-list-top {
		display: flex;
		align-items: center;
		.header-position {
			font-size: 28px;
			color: #333;
			.van-icon {
				margin-right: 8px;
			}
		}
		.van-search {
			flex: 1;
		}
	}
	.make-list-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.make-list-item {
			width: 340px;
			background: #fff;
			margin: 12px 0;
			border-radius: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			.goods-img {
				width: 100%;
				height: 400px;
				border-radius: 20px 20px 0 0;
			}
			.goods-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 50%;
				padding: 0 20px;
				box-sizing: border-box;
				flex-wrap: wrap;
				.name {
					width: 50%;
					font-size: 24px;
				}
				.sex {
					width: 50%;
					font-size: 20px;
					height: 24px;
					color: #fff;
					background-color: rgb(25, 137, 250);
					text-align: center;
					border-radius: 10px;
				}
				.mess-num {
					width: 50%;
					font-size: 16px;
					color: #999;
				}
				.love-num {
					width: 50%;
					font-size: 16px;
					color: #999;
				}
			}
			.make-btn {
				width: 43%;
				height: 50px;
				background: #ff6600;
				color: #fff;
				text-align: center;
				line-height: 50px;
				font-size: 16px;
				border-radius: 10px;
				margin: 20px 0;
			}
		}
	}
}
</style>
