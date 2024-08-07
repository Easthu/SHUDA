import request from "@/utils/request";
import qs from "qs";
// get请求使用qs.stringify(params)，post请求使用qs.parse(params)


// 美食专区分类用这个，这个和品牌相关的，之前是和商品相关的
function foodzoneBrandType(params) {
  return request({
    url: "/foodzone/common/query/getTypeByBrand",
    method: "post",
    data: qs.parse(params),
  });
}



// 获取热门搜索列表
function fetchPopSearch(params) {
  return request({
    url: "/foodzone/ln/query/getPopSearch",
    method: "post",
    data: qs.stringify(params),
  });
}

// 获取美食专区的banner列表
function bannerList(params) {
  return request({
    url: "/admin/biz-advertisement/list",
    method: "post",
    data: qs.parse(params),
  });
}


// 美食专区：今日商品推荐位
function recommendProduct(params) {
  return request({
    url: "/foodzone/ln/query/pageByRecommend",
    method: "post",
    data: qs.parse(params),
  });
}



// 分类获取全部品牌套餐列表
function fetchBrandListByType(params) {
  return request({
    url: '/foodzone/common/query/mapByBrand',
    method: 'post',
    data: qs.parse(params)
  })
}

// 根据经纬度获取城市信息
function getCityInfomap(data) {
  return request({
    url: '/tencent/map/getLocationDetail',
    method: 'post',
    data
  })
}

// 获取美食专区浮窗图片列表
function foodzoneFloatWindow(data) {
  return request({
    url: '/admin/foodzone-float-window/h5/list',
    method: 'post',
    data
  })
}
// 美食专区商品分类-----》商圈
function fetchCityList(params) {
  return request({
    url: '/foodzone/common/query/foodzone/brand/Area',
    method: 'post',
    data: qs.parse(params)
  })
}

//分页获取在线点餐品牌列表
function hw365Page(params) {
  return request({
    url: '/admin/hw365/page/brand',
    method: 'post',
    data: qs.parse(params)
  })
}
//分页获取在线点餐品牌列表
function banner(params) {
  return request({
    url: '/admin/biz-advertisement/list',
    method: 'post',
    data: qs.parse(params)
  })
}
export {
  bannerList,
  recommendProduct,
  foodzoneBrandType,
  getCityInfomap,
  fetchBrandListByType,
  fetchPopSearch,
  fetchCityList,
  hw365Page,//分页获取在线点餐品牌列表
  banner
}
