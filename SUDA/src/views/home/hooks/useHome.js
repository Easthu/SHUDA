
import banner from '@/assets/images/home/banner.png';

import hospitals from '@/assets/images/icons/recom-hospitals.png'
import cateing from '@/assets/images/icons/recom-cateing.png'
import attractions from '@/assets/images/icons/recom-attractions.png'
import hotel from '@/assets/images/icons/recom-hotel.png'
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
        images: [
            banner,
            banner,
        ],
        recommendList: [
            { text: '推荐酒店', src: hotel },
            { text: '推荐餐饮', src: cateing },
            { text: '推荐景点', src: attractions },
            { text: '推荐医院', src: hospitals },

        ],
        active: 'wizard',
    })


    const handle = reactive({
        handleLinkRecommend: (item) => {
            router.push('/recommend')
        }

    })

    const request = reactive({


    })

    return {
        ...toRefs(dataSource),
        ...toRefs(handle),
        ...toRefs(request),
    }

};
