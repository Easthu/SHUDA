<template>
	<div class="mine-layout">
		<img :src="homeBg" alt="" class="home-bg-fix" />
		<div class="user-info">
			<van-image
				round
				class="avatar-img"
				:src="
					userInfo
						? userInfo.head
						: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
				"
			/>
			<div class="user-name-id">
				<div class="user-name">{{ userInfo ? userInfo.nickname : '' }}</div>
				<div class="user-id">ID:{{ userInfo ? userInfo.id : '' }}</div>
			</div>
		</div>
		<div class="mine-btn">
			<div
				class="partTime"
				:style="{
					backgroundImage: `url(${partTimeBtn})`,
				}"
				@click="handleLinkPartTime"
			>
				<p>兼职入职</p>
				<span>给你恰到好处的陪伴</span>
			</div>
			<div
				class="agents"
				:style="{
					backgroundImage: `url(${agentsBtn})`,
				}"
				@click="handleLinkAgents"
			>
				<p>代理申请</p>
				<span>给你恰到好处的陪伴</span>
			</div>
		</div>

		<div class="menu-list">
			<!-- <van-cell title="预约考证" is-link to="/makeTextualResearch" />
			<van-cell title="用户协议" is-link to="/userAgreement" />
			<van-cell title="联系客服" is-link to="" />
			<van-cell title="关于我们" is-link to="/aboutUs" /> -->
			<div
				class="menu-item"
				v-for="item in menuList"
				:key="item.name"
				@click="handleLinkMenu(item)"
			>
				<img :src="item.icon" alt="" />
				<div class="name">{{ item.name }}</div>
				<div class="arrow">
					<img :src="arrow" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup name="mine">
import homeBg from '@/assets/images/home/home-bg.png';
import partTimeBtn from '@/assets/images/icons/partTime-btn.png';
import agentsBtn from '@/assets/images/icons/agents-btn.png';
import arrow from '@/assets/images/icons/arrow.png';

import collection from '@/assets/images/icons/my-collection.png';
import conpon from '@/assets/images/icons/my-conpon.png';
import examination from '@/assets/images/icons/my-examination.png';
import agreement from '@/assets/images/icons/my-agreement.png';
import customer from '@/assets/images/icons/my-customer.png';
import about from '@/assets/images/icons/my-about.png';

const router = useRouter();
const handleLinkPartTime = () => {
	router.push('/partTime');
};
const handleLinkAgents = () => {
	router.push('/agents');
};

const userInfo = ref(null);
if (JSON.parse(localStorage.getItem('userInfo'))) {
	userInfo.value = JSON.parse(localStorage.getItem('userInfo'));
}

const menuList = ref([
	{
		name: '我的收藏',
		icon: collection,
	},
	{
		name: '我的卡券',
		icon: conpon,
	},
	{
		name: '预约考证',
		icon: examination,
		path: '/makeTextualResearch',
	},
	{
		name: '用户协议',
		icon: agreement,
		path: '/userAgreement',
	},
	{
		name: '联系客服',
		icon: customer,
	},
	{
		name: '关于我们',
		icon: about,
		path: '/aboutUs',
	},
]);
const handleLinkMenu = (item) => {
	if (item.path) {
		router.push(item.path);
	}
};
</script>
<style lang="less" scoped>
.mine-layout {
	min-width: 100vw;
	min-height: 100vh;
	background: #f2f3f7;
	box-sizing: border-box;
	position: relative;
	padding-top: 40px;
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
.user-info {
	display: flex;
	align-items: center;
	border-radius: 8px;
	height: 158px;
	position: relative;
	z-index: 2;
	margin: 0 0 40px 40px;
	.avatar-img {
		width: 158px;
		height: 158px;
	}

	.user-name-id {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		height: 100%;
		margin-left: 20px;
		.user-name {
			font-weight: 500;
			font-size: 34px;
			color: #010000;
			margin-bottom: 16px;
		}
		.user-id {
			font-weight: 500;
			font-size: 34px;
			color: #010000;
		}
	}
}
.mine-btn {
	position: relative;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	margin: 0 40px;

	margin-bottom: 42px;
	.partTime,
	.agents {
		width: 318px;
		height: 107px;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		padding: 24px;
		box-sizing: border-box;
		background-size: 100%;
		background-repeat: no-repeat;
		p {
			font-weight: bold;
			font-size: 36px;
			color: #fefefe;
			margin-bottom: 8px;
		}
		span {
			font-weight: bold;
			font-size: 14px;
			color: #ffffff;
		}
	}
}
.menu-list {
	display: flex;
	flex-direction: column;
	margin: 0 47px;
	position: relative;
	z-index: 2;
	width: 669px;
	border-radius: 31px;
	background: #fff;
	padding-bottom: 40px;
	.menu-item {
		display: flex;
		align-items: center;
		margin-top: 30px;
		img {
			width: 40px;
			height: 40px;
			margin-left: 22px;
			margin-right: 30px;
		}
		.name {
			font-weight: 500;
			font-size: 30px;
			color: #000000;
		}
		.arrow {
			margin-left: auto;
			margin-right: 30px;
			img {
				width: 19px;
				height: 29px;
			}
		}
	}
}
</style>
