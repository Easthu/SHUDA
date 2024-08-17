
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
            'https://picsum.photos/710/300',
            'https://picsum.photos/710/300',
        ],
        recommendList: [
            { text: '推荐酒店', src: 'https://picsum.photos/100' },
            { text: '推荐餐饮', src: 'https://picsum.photos/100' },
            { text: '推荐景点', src: 'https://picsum.photos/100' },
            { text: '推荐医院', src: 'https://picsum.photos/100' },

        ],
        active: 0,
    })


    const handle = reactive({
        handleLinkRecommend: (item) => {
            console.log('item.text :>> ', item.text);
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
