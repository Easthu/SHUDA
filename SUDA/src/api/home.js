import request from "@/utils/request";


function homeInfo(params) {
  return request({
    url: "/MoMo/WeiXin?op=home&nature=" + params,
    method: "post",
  });
}

export {
  homeInfo
}
