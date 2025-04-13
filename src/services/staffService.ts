import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import { onError } from '@/utils/errorsHandler'
import { getMappedSort } from '@/utils/apiSortMapping'
import { getMappedMessage } from '@/utils/resMessageMapping'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

export type StaffSortAndFilterParams = {
    searchName: string
    searchEmail: string
    searchPhoneNumber: string
    sort: string
    range: string[] | any[] | undefined
}

const staffService = ({ enableFetching }: { enableFetching: boolean }) => {
    const queryClient = useQueryClient()
    const axios = useAxiosIns()
    const [staffs, setStaffs] = useState<IStaff[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isSearching, setIsSearching] = useState(false)

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(8)
    const [query, setQuery] = useState<string>('')
    const [sort, setSort] = useState<string>('')

    const buildQuery = ({ searchName, searchEmail, searchPhoneNumber, sort, range }: StaffSortAndFilterParams) => {
        const query: any = {}
        if (searchName) query.name = searchName.trim()
        if (searchEmail) query.email = searchEmail.trim()
        if (searchPhoneNumber) query.phoneNumber = searchPhoneNumber.trim()
        if (range) {
            if (range[0]) {
                query.startTime = dayjs(range[0]).format('YYYY-MM-DD')
            }
            if (range[1]) {
                query.endTime = dayjs(range[1]).format('YYYY-MM-DD')
            }
        }
        setQuery(JSON.stringify(query))
        if (sort) setSort(JSON.stringify(getMappedSort(sort)))
    }

    // const searchStaffsQuery = useQuery(['search-staffs', query, sort], {
    //     queryFn: () => {
    //         return axios.get<IResponseData<IStaff[]>>(`/staffs?skip=${limit * (page - 1)}&limit=${limit}&filter=${query}&sort=${sort}`)
    //     },
    //     keepPreviousData: true,
    //     enabled: false,
    //     onError: onError,
    //     onSuccess: res => {
    //         if (!res) return
    //         setStaffs(res.data.data)
    //         setTotal(res.data.total as number)
    //     }
    // })

    // const getAllStaffsQuery = useQuery(['staffs', page, limit], {
    //     queryFn: () => {
    //         if (!isSearching) {
    //             return axios.get<IResponseData<IStaff[]>>(`/staffs?skip=${limit * (page - 1)}&limit=${limit}`)
    //         }
    //     },
    //     keepPreviousData: true,
    //     enabled: enableFetching,
    //     refetchOnWindowFocus: false,
    //     refetchIntervalInBackground: true,
    //     refetchInterval: 10000,
    //     onError: onError,
    //     onSuccess: res => {
    //         if (!res) return
    //         setStaffs(res.data.data)
    //         setTotal(res.data.total as number)
    //     }
    // })

    // const getCsvStaffsQuery = useQuery(['search-csv-staffs', query, sort], {
    //     queryFn: () => {
    //         return axios.get<IResponseData<IStaff[]>>(`/staffs?filter=${query}&sort=${sort}`)
    //     },
    //     keepPreviousData: true,
    //     enabled: false,
    //     onError: onError
    // })

    const onFilterSearch = () => {
        setPage(1)
        setIsSearching(true)
        // setTimeout(() => searchStaffsQuery.refetch(), 300)
    }

    const onResetFilterSearch = () => {
        setPage(1)
        setIsSearching(false)
        setQuery('')
        setSort('')
        // setTimeout(() => getAllStaffsQuery.refetch(), 300)
    }

    useEffect(() => {
        if (isSearching) {
            // searchStaffsQuery.refetch()
        }
    }, [page])

    // const createNewStaffMutation = useMutation({
    //     mutationFn: (data: Partial<IStaff>) => {
    //         return axios.post<IResponseData<IStaff>>('/staffs', data)
    //     },
    //     onError: onError,
    //     onSuccess: res => {
    //         if (isSearching) {
    //             queryClient.invalidateQueries('search-staffs')
    //             searchStaffsQuery.refetch()
    //         } else {
    //             queryClient.invalidateQueries('staffs')
    //         }
    //         toast(getMappedMessage(res.data.message), toastConfig('success'))
    //     }
    // })

    const updateStaffMutation = useMutation({
        mutationFn: ({ staffId, data }: { staffId: number; data: Partial<IStaff> }) =>
            axios.patch<IResponseData<any>>(`/personnel/staffs/${staffId}/update-info`, data),
        onSuccess: res => {
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        },
        onError: onError
    })

    // const toggleActiveMutation = useMutation({
    //     mutationFn: (staffId: number) => {
    //         return axios.post<IResponseData<any>>('/staffs/deactivate-staff/${staffId}')
    //     },
    //     onError: onError,
    //     onSuccess: res => {
    //         if (isSearching) {
    //             queryClient.invalidateQueries('search-staffs')
    //             searchStaffsQuery.refetch()
    //         } else {
    //             queryClient.invalidateQueries('staffs')
    //         }
    //         toast(getMappedMessage(res.data.message), toastConfig('success'))
    //     }
    // })

    return {
        staffs,
        total,
        page,
        limit,
        setPage,
        onFilterSearch,
        onResetFilterSearch,
        buildQuery,

        // searchStaffsQuery,
        // getAllStaffsQuery,
        // getCsvStaffsQuery,
        // createNewStaffMutation,
        updateStaffMutation
        // toggleActiveMutation
    }
}

export default staffService
