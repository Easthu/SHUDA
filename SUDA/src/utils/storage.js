// 注意前端安全，使用加密解密机制
// encodeURIComponent()加密
// decodeURIComponent()解码

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const LocalStorage = {
    // 设置永久缓存
    set(key, val) {
        window.localStorage.setItem(key, encodeURIComponent(JSON.stringify(val)));
    },
    // 获取永久缓存
    get(key) {
        let json = decodeURIComponent(window.localStorage.getItem(key));
        return JSON.parse(json);
    },
    // 移除永久缓存
    remove(key) {
        window.localStorage.removeItem(key);
    },
    // 移除全部永久缓存
    clear() {
        window.localStorage.clear();
    }
};

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const SessionStorage = {
    // 设置临时缓存
    set(key, val) {
        window.sessionStorage.setItem(key, JSON.stringify(val));
    },
    // 获取临时缓存
    get(key) {
        let json = window.sessionStorage.getItem(key);
        return JSON.parse(json);
    },
    // 移除临时缓存
    remove(key) {
        window.sessionStorage.removeItem(key);
    },
    // 移除全部临时缓存
    clear() {
        window.sessionStorage.clear();
    }
};