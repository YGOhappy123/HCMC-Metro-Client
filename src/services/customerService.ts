import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import { onError } from '@/utils/errorsHandler'
import { getMappedSort } from '@/utils/apiSortMapping'
import { getMappedMessage } from '@/utils/resMessageMapping'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

export type CustomerSortAndFilterParams = {
    searchName: string
    searchEmail: string
    searchPhoneNumber: string
    startTime: string
    endTime: string
    sort: string
}

const customerService = ({ enableFetching }: { enableFetching: boolean }) => {
    const queryClient = useQueryClient()
    const axios = useAxiosIns()
    const [customers, setCustomers] = useState<ICustomer[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isSearching, setIsSearching] = useState(false)

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(8)
    const [query, setQuery] = useState<string>('')
    const [sort, setSort] = useState<string>('')

    const buildQuery = ({ searchName, searchEmail, searchPhoneNumber, startTime, endTime, sort }: CustomerSortAndFilterParams) => {
        const query: any = {}
        if (searchName?.trim()) query.name = searchName.trim() // Truyền giá trị tên người dùng vào query
        if (searchEmail) query.email = searchEmail.trim()
        if (searchPhoneNumber) query.phoneNumber = searchPhoneNumber.trim()
        if (startTime && endTime) {
            query.startTime = dayjs(startTime).format('YYYY-MM-DD')
            query.endTime = dayjs(endTime).format('YYYY-MM-DD')
        }
        setQuery(JSON.stringify(query)) // Truyền query dưới dạng JSON
        if (sort) setSort(JSON.stringify(getMappedSort(sort)))
    }

    // const searchCustomersQuery = useQuery({
    //     queryKey: ['search-customers', query, sort],
    //     queryFn: () => {
    //         return axios.get<IResponseData<ICustomer[]>>(`/guests?skip=${limit * (page - 1)}&limit=${limit}&filter=${query}&sort=${sort}`)
    //     },
    //     enabled: false,
    //     onSuccess: (res: any) => {
    //         if (!res) return
    //         setCustomers(res.data.data)
    //         setTotal(res.data.total as number)
    //     }
    // })

    // const getAllCustomersQuery = useQuery({
    //     queryKey: ['customers', page, limit],
    //     queryFn: () => {
    //         if (!isSearching) {
    //             return axios.get<IResponseData<ICustomer[]>>(`/guests?skip=${limit * (page - 1)}&limit=${limit}`)
    //         }
    //     },
    //     enabled: enableFetching,
    //     refetchOnWindowFocus: false,
    //     refetchIntervalInBackground: true,
    //     refetchInterval: 10000,
    //     onSuccess: res => {
    //         if (!res) return
    //         setCustomers(res.data.data)
    //         setTotal(res.data.total as number)
    //     }
    // })

    // const getCsvCustomersQuery = useQuery({
    //     queryKey: ['csv-customers', query, sort],
    //     queryFn: () => {
    //         return axios.get<IResponseData<ICustomer[]>>(`/guests?filter=${query}&sort=${sort}`)
    //     },
    //     enabled: false,
    //     onError: onError
    // })

    const onFilterSearch = () => {
        setPage(1)
        setIsSearching(true)
        // setTimeout(() => searchCustomersQuery.refetch(), 300)
    }

    const onResetFilterSearch = () => {
        setPage(1)
        setIsSearching(false)
        setQuery('')
        setSort('')
        // setTimeout(() => getAllCustomersQuery.refetch(), 300)
    }

    useEffect(() => {
        if (isSearching) {
            // searchCustomersQuery.refetch()
        }
    }, [page])

    const updateCustomerMutation = useMutation({
        mutationFn: ({ data }: { data: Partial<ICustomer> }) => axios.patch<IResponseData<any>>('/customers/update-info', data),
        onError: onError,
        onSuccess: res => {
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    // const deactivateAccountMutation = useMutation({
    //     mutationFn: (data: { targetUserId: number; targetUserRole: IRole }) =>
    //         axios.post<IResponseData<any>>('/auth/deactivate-account', {
    //             targetUserId: data.targetUserId,
    //             targetUserRole: data.targetUserRole
    //         }),
    //     onError: onError,
    //     onSuccess: res => {
    //         if (isSearching) {
    //             queryClient.invalidateQueries('search-customers')
    //             searchCustomersQuery.refetch()
    //         } else {
    //             queryClient.invalidateQueries('customers')
    //         }
    //         toast(getMappedMessage(res.data.message), toastConfig('success'))
    //     }
    // })

    return {
        customers,
        total,
        page,
        limit,
        setPage,
        onFilterSearch,
        onResetFilterSearch,
        buildQuery,
        // searchCustomersQuery,
        // getAllCustomersQuery,
        // getCsvCustomersQuery,
        updateCustomerMutation
        // deactivateAccountMutation
    }
}

export default customerService
