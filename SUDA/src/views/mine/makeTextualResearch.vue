<template>
	<div class="makeTextualResearch">
		<van-form @submit="handleSubmit">
			<van-cell-group inset>
				<van-field
					v-model="makeForm.project"
					is-link
					readonly
					name="picker"
					placeholder="报考项目"
					@click="showProject = true"
				/>
				<van-popup v-model:show="showProject" position="bottom">
					<van-picker
						:columns="columns"
						@confirm="onConfirm"
						@cancel="showPicker = false"
					/>
				</van-popup>
				<van-field
					v-model="makeForm.username"
					name="姓名"
					label="姓名"
					placeholder="姓名"
					:rules="[{ required: true, message: '请填写姓名' }]"
				/>
				<van-field name="radio" label="性别">
					<template #input>
						<van-radio-group v-model="makeForm.sex" direction="horizontal">
							<van-radio name="1">男</van-radio>
							<van-radio name="2">女</van-radio>
						</van-radio-group>
					</template>
				</van-field>
				<van-field name="stepper" label="年龄">
					<template #input>
						<van-stepper v-model="makeForm.age" />
					</template>
				</van-field>
				<van-field v-model="makeForm.tel" type="tel" label="手机号" />
				<van-field
					v-model="makeForm.sms"
					center
					clearable
					label="验证码"
					placeholder="请输入验证码"
				>
					<template #button>
						<van-button size="small" type="primary">发送验证码</van-button>
					</template>
				</van-field>
			</van-cell-group>
			<div class="bottom-btn">
				<van-button round block @click="hanldeBack"> 返回 </van-button>
				<van-button round block type="primary" native-type="submit"> 提交 </van-button>
			</div>
		</van-form>
	</div>
</template>

<script setup>
const makeForm = reactive({
	username: '',
	sex: '',
	project: '',
	age: 0,
	tel: '',
	makeForm: '',
});
const showProject = ref(false);
const onConfirm = (value) => {
	makeForm.project = value.text;
	showProject.value = false;
};
const columns = [
	{ text: '杭州', value: 'Hangzhou' },
	{ text: '宁波', value: 'Ningbo' },
	{ text: '温州', value: 'Wenzhou' },
	{ text: '绍兴', value: 'Shaoxing' },
	{ text: '湖州', value: 'Huzhou' },
];

const handleSubmit = () => {
	console.log('提交');
};
const router = useRouter();
const hanldeBack = () => {
	router.back();
};
</script>

<style lang="less" scoped>
.makeTextualResearch {
	min-height: 100vh;
	width: 100vw;
	background-color: #f5f5f5;
	padding: 20px;
	box-sizing: border-box;
	font-size: 26px;
	.bottom-btn {
		display: flex;
		justify-content: space-around;
		margin-top: 50px;
		.van-button {
			width: 40%;
		}
	}
}
</style>
