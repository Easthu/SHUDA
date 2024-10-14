import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// css补全
import autoprefixer from 'autoprefixer'
// px转rem
import postCssPxToRem from 'postcss-pxtorem'
import path from 'path';
import Components from 'unplugin-vue-components/vite'
import {
  VantResolver,
} from 'unplugin-vue-components/resolvers'
// 使用jsx
import vueJsx from '@vitejs/plugin-vue-jsx'
// 生成资源使用占比
import { visualizer } from 'rollup-plugin-visualizer';
// vite-plugin-compression 开启gzip压缩
import viteCompression from 'vite-plugin-compression'
// 自动引入vue vuerouter => api
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log('env :>> ', env.VITE_NODE_APP_BASE);
  return {

    // 插件
    plugins: [
      vue(),
      vueJsx(),
      visualizer(),

      AutoImport({
        imports: [
          // 预设
          'vue',
          'vue-router',
          'pinia'
        ],
        json: "/.eslintrc-auto-import.json",
        eslintrc: {
          enabled: false,  // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
        },
      }),
      Components({
        // ui库解析器，也可以自定义
        resolvers: [
          VantResolver(),
        ]
      }),
      viteCompression({
        //生成压缩包gz
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      })
    ],
    base: "./",
    // 服务
    server: {
      host: '0.0.0.0',
      https: false,
      // cors: true,
      open: true,
      port: '8000',
      // strictPort: false,
      hmr: true,
      proxy: {
        '/api': {
          target: 'http://h.cqhyjr.com',    // 接口域名,接口服务器地止
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/assets/style/global.less";',
        },
      },
      postcss: {
        plugins: [
          postCssPxToRem({
            // rootValue: 37.5,
            rootValue({ file }) {
              return file.includes('/node_modules/vant') ? 37.5 : 75.0;
            },
            propList: ['*'],
            // selectorBlackList: ['van']

          }),
          autoprefixer({ // 自动添加前缀
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8"
              //'last 2 versions', // 所有主流浏览器最近2个版本
            ],
            grid: true
          })
        ]
      }
    },
    resolve: {
      // 别名
      alias: {
        '@': path.resolve(__dirname, './src'),
        'assets': path.resolve(__dirname, './src/assets'),
        'api': path.resolve(__dirname, './src/api'),
        'utils': path.resolve(__dirname, './src/utils'),
        'store': path.resolve(__dirname, './src/store'),
        'components': path.resolve(__dirname, './src/components'),
      }
    },
    // 打包
    build: {
      //打包后移除console和注释
      esbuild: {
        drop: ["console", "debugger"],
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) { //静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
  }

})
