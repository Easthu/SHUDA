import hospitals from '@/assets/images/icons/recom-hospitals.png'
import cateing from '@/assets/images/icons/recom-cateing.png'
import attractions from '@/assets/images/icons/recom-attractions.png'
import hotel from '@/assets/images/icons/recom-hotel.png'

import { homeInfo } from 'api/home';
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

        recommendList: [
            { text: '推荐酒店', src: hotel },
            { text: '推荐餐饮', src: cateing },
            { text: '推荐景点', src: attractions },
            { text: '推荐医院', src: hospitals },

        ],
        active: 'wizard',
        bannerList: [],
        staffInfoList: []
    })


    const handle = reactive({
        handleLinkRecommend: (item) => {
            router.push('/recommend')
        }

    })

    const request = reactive({
        getHomeInfo: async (nature = 1) => {
            showLoadingToast()
            const res = await homeInfo(nature)
            closeToast()
            console.log(res)
            dataSource.bannerList = res.banner
            dataSource.staffInfoList = res.staff.map((item) => {
                item.scenicspot = JSON.parse(item.scenicspot)
                item.hospital = JSON.parse(item.hospital)
                return item
            })
            console.log('dataSource.staffInfoList :>> ', dataSource.staffInfoList);
        },
        handleChangeNav: (active) => {
            console.log('active :>> ', active);
            dataSource.active = active
            request.getHomeInfo(active == 'wizard' ? 1 : 2)
        }

    })

    return {
        ...toRefs(dataSource),
        ...toRefs(handle),
        ...toRefs(request),
    }

};
