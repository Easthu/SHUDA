/*
 * @Author: Est
 * @Date: 2023-04-17 20:52:43
 * @LastEditors: Est
 * @LastEditTime: 2023-04-23 11:23:31
 * @FilePath: \public-zone美食专区\src\utils\globalProperties.js
 * @Description: 
 */

// 引入防抖与节流函数，进行全局注册，如果是vue3就使用： app.config.globalProperties.$debounce = Debounce
import {
    Debounce,
    Throttle,
    getImageUrl,
    encryption,
    printFn
} from "@/utils/toolsValidate.js"
import clipboard from 'utils/clipboard.js'
import { mathDivide } from 'utils/mathjsTool';

// 配置全局经纬度
import { getCurrentCityLocationDataAndGetCityInfo } from '@/utils/position.js'

// 全局方法挂载
export default function globalProperties(app) {
    // 鉴权
    app.config.globalProperties.$Debounce = Debounce
    app.config.globalProperties.$Throttle = Throttle
    app.config.globalProperties.$getImageUrl = getImageUrl//回显图片
    app.config.globalProperties.$encryption = encryption//字符串加密
    app.config.globalProperties.$printFn = printFn//math方法 价格处理
    app.config.globalProperties.$clipboard = clipboard//复制文本
    app.config.globalProperties.$mathDivide = mathDivide//复制文本

    app.config.globalProperties.$getCurrentCityLocationDataAndGetCityInfo = getCurrentCityLocationDataAndGetCityInfo//经纬度获取

}
