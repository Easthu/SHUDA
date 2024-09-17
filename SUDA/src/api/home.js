import request from "@/utils/request";
import qs from "qs";

function requestApi(params) {
  return request({
    url: "/MoMo/WeiXin",
    method: "get",
    data: qs.stringify(params),
  });
}


export {
  requestApi
}
