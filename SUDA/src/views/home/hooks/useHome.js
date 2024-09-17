import hospitals from '@/assets/images/icons/recom-hospitals.png'
import cateing from '@/assets/images/icons/recom-cateing.png'
import attractions from '@/assets/images/icons/recom-attractions.png'
import hotel from '@/assets/images/icons/recom-hotel.png'

import { requestApi } from 'api/home';
import { showLoadingToast, closeToast } from 'vant';
export default function useHome(params) {
    const { proxy } = getCurrentInstance()
    const route = useRoute()
    const router = useRouter()
    const dataSource = reactive({
        position: '重庆',
        positionList: [
            { text: '重庆', value: '重庆' },
            { text: '成都', value: '成都' },
            { text: '贵州', value: '贵州' },
        ],

        // 推荐列表
        recommendList: [
            { text: '推荐酒店', src: hotel, classify: 1 },
            { text: '推荐餐饮', src: cateing, classify: 2 },
            { text: '推荐景点', src: attractions, classify: 3 },
            { text: '推荐医院', src: hospitals, classify: 4 },

        ],
        active: 1,//1:本地向导2陪诊就医
        bannerList: [],
        homeMakeList: []
    })


    const handle = reactive({
        handleLinkRecommend: (item) => {
            router.push(`/recommend?classify=${item.classify}`)
        }

    })

    const request = reactive({
        // 获取首页推荐信息
        handleApiMakeInfoList: async (nature = 1) => {
            const res = await requestApi({
                op: 'home',
                nature
            })
            console.log(res)
            dataSource.homeMakeList = res.staff
            // dataSource.staffInfoList = res.staff.map((item) => {
            //     item.scenicspot = JSON.parse(item.scenicspot)
            //     item.hospital = JSON.parse(item.hospital)
            //     return item
            // })
        },
        // 分类切换
        handleChangeNav: (active) => {
            dataSource.active = active
            request.getHomeInfo(active)
        },
        // 获取首页轮播图
        handleApiBanner: async () => {
            const res = await requestApi({
                op: 'banner',
            })
            console.log('res :>> ', res);
            dataSource.bannerList = res.banner
        },
        init: () => {
            showLoadingToast()
            Promise.all([
                request.handleApiBanner(),
                request.handleApiMakeInfoList(),

            ])
                .finally(() => {
                    closeToast()
                })
        }

    })

    return {
        ...toRefs(dataSource),
        ...toRefs(handle),
        ...toRefs(request),
    }

};
