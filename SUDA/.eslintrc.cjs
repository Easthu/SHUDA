module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-essential', './.eslintrc-auto-import.json'],
	parser: 'vue-eslint-parser',
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['vue'],
	rules: {
		'vue/multi-word-component-names': "off"
	},
	globals:{
		"PageSpy": true,
		"__bl": true,
		"initNECaptchaWithFallback": true,
		"YDRZAuthLogin":true,
		'CONFIG_ARMS_DATE':true,
	}
};
