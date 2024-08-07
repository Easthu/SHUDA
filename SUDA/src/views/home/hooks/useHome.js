
export default function useHome(params) {
    const { proxy } = getCurrentInstance()
    const route = useRoute()
    const router = useRouter()


    const dataSource = reactive({

    })


    const handle = reactive({


    })

    const request = reactive({


    })

    return {
        ...toRefs(dataSource),
        ...toRefs(handle),
        ...toRefs(request),
    }

};
