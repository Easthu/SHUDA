import { showToast, closeToast } from 'vant';
import { JudgeEnvironment, fetchWeChatLocation } from "@/utils/weChatFunction"
import { getCityInfomap } from '@/api/home.js'
import { getMobileTypeConfigList } from 'utils/globalConfiguration'

function getDefaultLocationData() {
  const defLlocation = getMobileTypeConfigList().defLlocation
  const currentCityName = getMobileTypeConfigList().defaultCityName
  return { defLlocation, currentCityName }
}


// 设置默认本地经纬度和城市编码
function setDefaultLocationData(msg = "定位获取失败，获取定位权限不成功") {
  console.log('定位失败，使用默认定位')
  const { defLlocation, currentCityName } = getDefaultLocationData()

  if (!localStorage.getItem('defLlocation')) {
    localStorage.setItem("defLlocation", JSON.stringify(defLlocation))
  }
  localStorage.setItem("LocationData", JSON.stringify(defLlocation))
  localStorage.setItem("currentCityName", currentCityName)

  showToast(msg);
  setTimeout(() => {
    closeToast()
  }, 2000)
  return defLlocation
}


// 是否需要重新获取经纬度
function compareDefaultLocationData() {

  let LocationData = localStorage.getItem('LocationData') ? JSON.parse(localStorage.getItem('LocationData')) : null
  let defLlocation = localStorage.getItem('defLlocation') ? JSON.parse(localStorage.getItem('defLlocation')) : null
  // 没有经纬度缓存
  if (!LocationData || !defLlocation) {
    return true
  }

  // 经纬度缓存和默认经纬度一致
  if (LocationData && LocationData.longitude == defLlocation.longitude) {
    return true
  }
  return false

}

// 通过第三方api获取经纬度
function getCurrentCityLocationData() {
  let locationNoData = compareDefaultLocationData()
  console.log('是否需要重新获取经纬度 :>> ', locationNoData);
  return new Promise(async (resolve, reject) => {
    if (locationNoData) {
      console.log('通过第三方api获取经纬度 :>> ');
      let isWxEnv = await JudgeEnvironment() !== 'no-wx'
      let isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1
      //微信环境下的定位
      if (isWxEnv) {
        console.log('----------微信定位----------')
        fetchWeChatLocation()
          .then(wxPosition => {
            closeToast();
            if (wxPosition && wxPosition.latitude) {
              resolve(wxPosition)
            } else {
              //获取经纬度失败 返回默认
              let defLlocation = setDefaultLocationData('微信定位失败')
              resolve(defLlocation)
            }
          })
      }
    } else {
      // let defLlocation = setDefaultLocationData('更换城市信息')
      let LocationData = JSON.parse(localStorage.getItem('LocationData'))
      reject(LocationData)
    }
  })
}

// 通过经纬度获取城市信息
function getCityInfo(position) {
  console.log('通过经纬度获取城市信息 :>> ');
  return new Promise(async (resolve, reject) => {
    let res = await getCityInfomap({ location: `${position.latitude},${position.longitude}` })
      .catch(err => {
        let defLlocation = setDefaultLocationData(err)
        resolve(defLlocation)
      })
    const { defLlocation } = getDefaultLocationData()
    console.log('defLlocation :>> ', defLlocation);
    if (res && res.status == 'OK') {
      if (!localStorage.getItem('defLlocation')) {
        localStorage.setItem("defLlocation", JSON.stringify(defLlocation))
      }
      resolve(res.data)
    } else {
      console.log('接口失败', res)
      let defLlocation = setDefaultLocationData(res.errorMessage)
      resolve(defLlocation)
    }

  })

}

// 结合方法整理
function getCurrentCityLocationDataAndGetCityInfo() {

  return new Promise((resolve, reject) => {
    getCurrentCityLocationData()
      .then(
        position => {
          getCityInfo(position)
            .then(data => {
              let cityData
              if (data.address_component) {
                console.log('最终城市信息', data)
                // 城市名
                let currentCityName = data.address_component.city
                currentCityName = currentCityName.replace("市", "")
                // 城市code码
                let city_code = data.ad_info.city_code.substring(3)
                // 城市经纬度坐标
                cityData = {
                  longitude: data.location.lng,
                  latitude: data.location.lat,
                  cityCode: city_code
                }

                // 缓存信息
                localStorage.setItem("LocationData", JSON.stringify(cityData))
                localStorage.setItem("isManualPositioning", 'YES');

                // 获取的位置与缓存不一致 刷新页面
                if (currentCityName != localStorage.getItem("currentCityName")) {
                  localStorage.setItem("currentCityName", currentCityName);
                  closeToast();
                }
                localStorage.setItem("currentCityName", currentCityName)
                closeToast();
              }
              resolve(cityData)
            })
        }
      )
      .catch(err => {
        closeToast();
        console.log('不需要重新获取经纬度', err)
        resolve(err)
      })
  })
}

export {
  getCurrentCityLocationDataAndGetCityInfo,
}