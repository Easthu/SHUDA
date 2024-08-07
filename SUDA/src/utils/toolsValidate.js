/**
 * 2020.12.23 lsf 整理
 * 工具类函数集合，适用于平时开发
 */

import { showToast } from "vant";
// js的精度计算
import * as math from "mathjs";

// js的精度计算封装函数---->用来过滤价格显示
function printFn(value) {
  const precision = 14;
  return Number(math.format(value, precision));
}

// 计算价格的折扣,保留一位小数且不四舍五入
function discountPrice(salePrice, originPrice) {
  const precision = 3; //表示精确到后几位
  let priceNum = Number(
    math.format((salePrice / 100 / (originPrice / 100)) * 10, precision)
  );
  priceNum = priceNum.toString();
  let index = priceNum.indexOf(".");
  // 只带一位小数点
  if (index !== -1) {
    priceNum = priceNum.substring(0, 1 + index + 1);
  }
  //整数后面不用拼接0
  if (priceNum.indexOf(".0") !== -1) {
    priceNum = priceNum.substring(0, 1); //字符串截取第一位
  }
  // 大于自身价格就是没有折扣
  if (priceNum >= 10) {
    priceNum = "0";
  }
  return priceNum;
}

/**
 * [isDuringDate 比较当前时间是否在指定时间段内]
 * @param    date   [beginDateStr] [开始时间]
 * @param    date   [endDateStr]   [结束时间]
 * @return   Boolean
 */
function isDuringDate(beginDateStr, endDateStr) {
  let curDate = new Date(),
    beginDate = new Date(beginDateStr),
    endDate = new Date(endDateStr);
  if (curDate >= beginDate && curDate <= endDate) {
    return true;
  }
  return false;
  // 为true是未过期，false是已过期
  // 举个例子
  // date.isDuringDate('2018/09/17', '2030/09/17');
  // 当前时间是否在2018/09/17 - 2030/09/17 之间，输出 true
  // date.isDuringDate('2018/09/17 13:00', '2019/09/17 15:00');
  // 当前时间是否在2018/09/17 13:00 - 2019/09/17 15:00 之间，输出 false
  // date.isDuringDate('2018-09-17 13:00', '2019-09-17 15:00');
  // 当前时间是否在2018/09/17 13:00 - 2019-09-17 15:00 之间，输出 false
}

/**
 * 小数或整数(不可以负数)
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
function verifyNumberIntegerAndFloat(val) {
  // 匹配空格
  let v = val.replace(/(^\s*)|(\s*$)/g, "");
  // 只能是数字和小数点，不能是其他输入
  v = v.replace(/[^\d.]/g, "");
  // 以0开始只能输入一个
  v = v.replace(/^0{2}$/g, "0");
  // 保证第一位只能是数字，不能是点
  v = v.replace(/^\./g, "");
  // 小数只能出现1位
  v = v.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  // 小数点后面保留2位
  v = v.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
  // 返回结果
  return v;
}

/**
 * 正整数验证
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
function verifiyNumberInteger(val) {
  // 匹配空格
  let v = val.replace(/(^\s*)|(\s*$)/g, "");
  // 去掉 '.' , 防止贴贴的时候出现问题 如 0.1.12.12
  v = v.replace(/[\.]*/g, "");
  // 去掉以 0 开始后面的数, 防止贴贴的时候出现问题 如 00121323
  v = v.replace(/(^0[\d]*)$/g, "0");
  // 首位是0,只能出现一次
  v = v.replace(/^0\d$/g, "0");
  // 只匹配数字
  v = v.replace(/[^\d]/g, "");
  // 返回结果
  return v;
}



// 封装统一校验表单提交的工具函数
function formTestFun(testForm) {
  // 遍历对象的方法：for...of结合Object.entries
  for (let [key, value] of Object.entries(testForm)) {
    if (value) {
      showToast(key);
      return false;
    }
  }
  return true;
}

// 回显网络图片
function getImageUrl(fileId) {
  // 优先做排空操作
  switch (typeof fileId) {
    case "undefined":
      return fileId;
    case "string":
      if (fileId.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return fileId;
      break;
    case "boolean":
      if (!fileId) return fileId;
      break;
    case "number":
      if (fileId === 0 || isNaN(fileId)) return fileId;
      break;
    case "object":
      if (fileId === null || fileId.length === 0) return fileId;
      for (const i in fileId) {
        return false;
      }
      return fileId;
  }
  return import.meta.env.VITE_APP_BASE_IMG + fileId;
}

// 判断数据为空的函数封装
function isEmpty(value) {
  // if (val === "") return true; //检验空字符串
  // if (val === "null") return true; //检验字符串类型的null
  // if (val === "undefined") return true; //检验字符串类型的 undefined
  // if (!val && val !== 0 && val !== "") return true; //检验 undefined 和 null
  // if (Array.prototype.isPrototypeOf(val) && val.length === 0) return true; //检验空数组
  // if (Object.prototype.isPrototypeOf(val) && Object.keys(val).length === 0) return true; //检验空对象
  // return false;
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true;
      break;
    case "boolean":
      if (!value) return true;
      break;
    case "number":
      if (value === 0 || isNaN(value)) return true;
      break;
    case "object":
      if (value === null || value.length === 0) return true;
      for (const i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 去掉中文及空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
function verifyCnAndSpace(val) {
  // 匹配中文与空格
  let v = val.replace(/[\u4e00-\u9fa5\s]+/g, "");
  // 匹配空格
  v = v.replace(/(^\s*)|(\s*$)/g, "");
  // 返回结果
  return v;
}

/**
 * 去掉英文及空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
function verifyEnAndSpace(val) {
  // 匹配英文与空格
  let v = val.replace(/[a-zA-Z]+/g, "");
  // 匹配空格
  v = v.replace(/(^\s*)|(\s*$)/g, "");
  // 返回结果
  return v;
}

/**
 * 禁止输入空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
function verifyAndSpace(val) {
  // 匹配空格
  let v = val.replace(/(^\s*)|(\s*$)/g, "");
  // 返回结果
  return v;
}

/**
 * 金额用 `,` 区分开
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
function verifyNumberComma(val) {
  // 调用小数或整数(不可以负数)方法
  let v = verifyNumberIntegerAndFloat(val);
  // 字符串转成数组
  v = v.toString().split(".");
  // \B 匹配非单词边界，两边都是单词字符或者两边都是非单词字符
  v[0] = v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // 数组转字符串
  v = v.join(".");
  // 返回结果
  return v;
}

/**
 * 匹配文字变色（搜索时）
 * @param val 当前值字符串
 * @param text 要处理的字符串值
 * @param color 搜索到时字体高亮颜色
 * @returns 返回处理后的字符串
 */
function verifyTextColor(val, text = "", color = "red") {
  // 返回内容，添加颜色
  let v = text.replace(
    new RegExp(val, "gi"),
    `<span style='color: ${color}'>${val}</span>`
  );
  // 返回结果
  return v;
}

/**
 * 数字转中文大写
 * @param val 当前值字符串
 * @param unit 默认：仟佰拾亿仟佰拾万仟佰拾元角分
 * @returns 返回处理后的字符串
 */
function verifyNumberCnUppercase(
  val,
  unit = "仟佰拾亿仟佰拾万仟佰拾元角分",
  v = ""
) {
  // 当前内容字符串添加 2个0，为什么??
  val += "00";
  // 返回某个指定的字符串值在字符串中首次出现的位置，没有出现，则该方法返回 -1
  let lookup = val.indexOf(".");
  // substring：不包含结束下标内容，substr：包含结束下标内容
  if (lookup >= 0) val = val.substring(0, lookup) + val.substr(lookup + 1, 2);
  // 根据内容 val 的长度，截取返回对应大写
  unit = unit.substr(unit.length - val.length);
  // 循环截取拼接大写
  for (let i = 0; i < val.length; i++) {
    v += "零壹贰叁肆伍陆柒捌玖".substr(val.substr(i, 1), 1) + unit.substr(i, 1);
  }
  // 正则处理
  v = v
    .replace(/零角零分$/, "整")
    .replace(/零[仟佰拾]/g, "零")
    .replace(/零{2,}/g, "零")
    .replace(/零([亿|万])/g, "$1")
    .replace(/零+元/, "元")
    .replace(/亿零{0,3}万/, "亿")
    .replace(/^元/, "零元");
  // 返回结果
  return v;
}

/**
 * 手机号码
 * @param val 当前值字符串
 * @returns 返回 true: 手机号码正确
 */
function verifyPhone(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
 * 国内电话号码
 * @param val 当前值字符串
 * @returns 返回 true: 国内电话号码正确
 */
function verifyTelPhone(val) {
  // false: 国内电话号码不正确
  if (!/\d{3}-\d{8}|\d{4}-\d{7}/.test(val)) return false;
  // true: 国内电话号码正确
  else return true;
}

/**
 * 登录账号 (字母开头，允许5-16字节，允许字母数字下划线)
 * @param val 当前值字符串
 * @returns 返回 true: 登录账号正确
 */
function verifyAccount(val) {
  // false: 登录账号不正确
  if (!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(val)) return false;
  // true: 登录账号正确
  else return true;
}

/**
 * 密码 (以字母开头，长度在6~16之间，只能包含字母、数字和下划线)
 * @param val 当前值字符串
 * @returns 返回 true: 密码正确
 */
function verifyPassword(val) {
  // false: 密码不正确
  if (!/^[a-zA-Z]\w{5,15}$/.test(val)) return false;
  // true: 密码正确
  else return true;
}

/**
 * 强密码 (字母+数字+特殊字符，长度在6-16之间)
 * @param val 当前值字符串
 * @returns 返回 true: 强密码正确
 */
function verifyPasswordPowerful(val) {
  // false: 强密码不正确
  if (
    !/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&\.*]+$)(?![\d!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(
      val
    )
  )
    return false;
  // true: 强密码正确
  else return true;
}

/**
 * 密码强度
 * @param val 当前值字符串
 * @description 弱：纯数字，纯字母，纯特殊字符
 * @description 中：字母+数字，字母+特殊字符，数字+特殊字符
 * @description 强：字母+数字+特殊字符
 * @returns 返回处理后的字符串：弱、中、强
 */
function verifyPasswordStrength(val) {
  let v = "";
  // 弱：纯数字，纯字母，纯特殊字符
  if (/^(?:\d+|[a-zA-Z]+|[!@#$%^&\.*]+){6,16}$/.test(val)) v = "弱";
  // 中：字母+数字，字母+特殊字符，数字+特殊字符
  if (
    /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(
      val
    )
  )
    v = "中";
  // 强：字母+数字+特殊字符
  if (
    /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&\.*]+$)(?![\d!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(
      val
    )
  )
    v = "强";
  // 返回结果
  return v;
}

/**
 * IP地址
 * @param val 当前值字符串
 * @returns 返回 true: IP地址正确
 */
function verifyIPAddress(val) {
  // false: IP地址不正确
  if (
    !/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
      val
    )
  )
    return false;
  // true: IP地址正确
  else return true;
}

/**
 * 邮箱
 * @param val 当前值字符串
 * @returns 返回 true: 邮箱正确
 */
function verifyEmail(val) {
  // false: 邮箱不正确
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val
    )
  )
    return false;
  // true: 邮箱正确
  else return true;
}

/**
 * 身份证
 * @param val 当前值字符串
 * @returns 返回 true: 身份证正确
 */
function verifyIdCard(val) {
  // false: 身份证不正确
  if (
    !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
      val
    )
  )
    return false;
  // true: 身份证正确
  else return true;
}

/**
 * 姓名
 * @param val 当前值字符串
 * @returns 返回 true: 姓名正确
 */
function verifyFullName(val) {
  // false: 姓名不正确
  if (!/^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/.test(val))
    return false;
  // true: 姓名正确
  else return true;
}

/**
 * 邮政编码
 * @param val 当前值字符串
 * @returns 返回 true: 邮政编码正确
 */
function verifyPostalCode(val) {
  // false: 邮政编码不正确
  if (!/^[1-9][0-9]{5}$/.test(val)) return false;
  // true: 邮政编码正确
  else return true;
}

/**
 * url 处理
 * @param val 当前值字符串
 * @returns 返回 true: url 正确
 */
function verifyUrl(val) {
  // false: url不正确
  if (
    !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      val
    )
  )
    return false;
  // true: url正确
  else return true;
}

/**
 * 车牌号
 * @param val 当前值字符串
 * @returns 返回 true：车牌号正确
 */
function verifyCarNum(val) {
  // false: 车牌号不正确
  if (
    !/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(
      val
    )
  )
    return false;
  // true：车牌号正确
  else return true;
}

/**
 * 防抖函数
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
let timeout;
function Debounce(func, wait = 500, immediate = false) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === "function" && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === "function" && func();
    }, wait);
  }
}

/**
 * 节流函数
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
let timer, flag;
function Throttle(func, wait = 2000, immediate = true) {
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === "function" && func();
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(() => {
        flag = false;
        typeof func === "function" && func();
      }, wait);
    }
  }
}

// 获取微信定位，r=后面换成回跳页面的地址，回跳时会带参数latitude,latitude,err
function weChatLocation() {
  let currentPathUrl = window.location.href;
  window.location.replace(
    "https://weixin.cne-c.com/jdmall/h5/app/pages/activity/nanshanfuzi/20220307/location.php?r=" +
    currentPathUrl
  );
  return;
}

// 字符串加密
function encryption(str, start = 2, ellipsis = 4) {
  if (!str) return ''
  let arr = str.split('')
  for (let i = 0; i < ellipsis; i++) {
    arr.splice(i + start, 1, '*')
  }
  return arr.join('')
}

// 数组去重，根据数组里面的对象某个值
// 参数arr是数组类型，val是字符串类型
function arrayIncludesObjectUnique(arr, val) {
  const res = new Map();
  return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
}
// 数组去重，简单数组：例如 [1, 1, 1, 1, 2, 3, 4, 4, 5, 3]
// 参数arr是数组类型
function simpleArrayUnique(arr) {
  return Array.from(new Set(arr));
}

// 去掉链接上的某个参数
function delUrlKey(key, url = window.location.href) {
  const newUrl = new URL(url)
  let urlParam = newUrl.search.substr(1) || newUrl.hash.split("?")[1];   //页面参数
  let beforeUrl = url.substr(0, url.indexOf("?"));   //页面主地址（参数之前地址）
  let nextUrl = "";

  let arr = new Array();
  if (urlParam && urlParam != "" && urlParam.indexOf('&') > 1) {
    let urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
    for (let i = 0; i < urlParamArr.length; i++) {
      let paramArr = urlParamArr[i].split("="); //将参数键，值拆开
      //如果键雨要删除的不一致，则加入到参数中
      if (paramArr[0] != key) {
        arr.push(urlParamArr[i]);
      }
    }
  }
  if (arr.length > 0) {
    nextUrl = "?" + arr.join("&");
  }
  url = beforeUrl + nextUrl;
  return url;
}

function getUrlKey(name) {
  let urlKey = (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  )

  if (urlKey && urlKey.indexOf('?') > -1) {
    urlKey = urlKey.split('?')[0]
  }
  return urlKey
}



//参考文档 https://www.clicksun.cn/mis/bbs/showbbs.asp?id=20779
//npm install fingerprintjs2 -S
//设备 指纹获取
function getFingerprint() {
  let option = {
    fonts: {
      extendedJsFonts: true
    },
    //bub
    excludes: {
      userAgent: true,
      deviceMemory: true,
      plugins: true,
      cpuClass: true,
      openDatabase: true,
      addBehavior: true,
      webgl: true,
      adBlock: true,
      hasLiedLanguages: true,
      fonts: true,
      enumerateDevices: true,

    }
  }
}

export {
  delUrlKey,//去掉链接上的某个参数
  simpleArrayUnique,//数组去重，简单数组
  arrayIncludesObjectUnique,//数组去重，根据数组里面的对象某个值
  encryption,//字符串加密
  Debounce,//防抖函数
  verifyCarNum,//车牌号不正确
  verifyUrl,//判断URL链接格式是否正确
  verifyPostalCode,//邮政编码是否正确
  verifyFullName,//判断姓名是否正确
  verifyIdCard,//判断身份证是否正确
  verifyEmail,//判断邮政编码是否正确
  verifyIPAddress,//判断IP地址是否正确
  verifyPasswordStrength,//密码强度
  verifyPasswordPowerful,//强密码
  verifyTelPhone,//电话号码是否正确
  verifyNumberCnUppercase,//数字转中文大写
  verifyNumberComma,//金额用 `,` 区分开
  verifyAndSpace,//去空格
  verifyEnAndSpace,//去掉英文及空格
  isEmpty,//判断是否为空
  getImageUrl,//回写网路图片
  getUrlKey,//获取url中的指定键值参数，这个项目用来获取url里面的openid
  formTestFun,//封装统一校验表单提交的工具函数
  verifiyNumberInteger,//正整数验证
  verifyNumberIntegerAndFloat,//输入小数或整数(不可以负数)
  isDuringDate,//正整数验证
  discountPrice,// 计算价格的折扣,保留一位小数且不四舍五入
  Throttle,//防抖
  printFn,//js的精度计算封装函数---->用来过滤价格显示
}