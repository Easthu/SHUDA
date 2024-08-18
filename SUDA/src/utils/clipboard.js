import { showToast } from "vant";

import useClipboard from 'vue-clipboard3';
const { toClipboard } = useClipboard();

function clipboardSuccess() {
    showToast("复制成功")
}

function clipboardError() {
    showToast("该浏览器不支持自动复制");
}

/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 复制数据
 * @param text
 */
export default async function handleClipboard(text) {
    try {
        await toClipboard(text);
        showToast("复制成功")
    } catch (e) {
        clipboardError();
        console.log(e);
    }
}