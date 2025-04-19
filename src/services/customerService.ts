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
    searchIsActive: string | undefined
    sort: string
    range: string[] | any[] | undefined
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

    const buildQuery = ({ searchName, searchEmail, searchPhoneNumber, searchIsActive, sort, range }: CustomerSortAndFilterParams) => {
        const query: any = {}
        if (searchName) query.fullName = searchName.trim()
        if (searchEmail) query.email = searchEmail.trim()
        if (searchPhoneNumber) query.phoneNumber = searchPhoneNumber.trim()
        if (searchIsActive) query.isActive = searchIsActive
        if (range) {
            if (range[0]) {
                query.startHireTime = dayjs(range[0]).format('YYYY-MM-DD')
            }
            if (range[1]) {
                query.endHireTime = dayjs(range[1]).format('YYYY-MM-DD')
            }
        }
        setQuery(JSON.stringify(query))
        if (sort) setSort(JSON.stringify(getMappedSort(sort)))
    }

    const searchCustomersQuery = useQuery({
        queryKey: ['search-customers', query, sort],
        queryFn: () => {
            return axios.get<IResponseData<ICustomer[]>>(`/customers?skip=${limit * (page - 1)}&limit=${limit}&filter=${query}&sort=${sort}`)
        },
        enabled: false
    })

    useEffect(() => {
        if (searchCustomersQuery.isSuccess && searchCustomersQuery.data) {
            setCustomers(searchCustomersQuery.data.data?.data)
            setTotal(searchCustomersQuery.data.data?.total as number)
        }
    }, [searchCustomersQuery.isSuccess, searchCustomersQuery.data])

    const getAllCustomersQuery = useQuery({
        queryKey: ['customers', page, limit],
        queryFn: () => {
            if (!isSearching) {
                return axios.get<IResponseData<ICustomer[]>>(`/customers?skip=${limit * (page - 1)}&limit=${limit}`)
            }
        },
        enabled: enableFetching,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 10000
    })

    useEffect(() => {
        if (getAllCustomersQuery.isSuccess && getAllCustomersQuery.data && !isSearching) {
            setCustomers(getAllCustomersQuery.data.data?.data)
            setTotal(getAllCustomersQuery.data.data?.total as number)
        }
    }, [getAllCustomersQuery.isSuccess, getAllCustomersQuery.data])

    const onFilterSearch = () => {
        setPage(1)
        setIsSearching(true)
        setTimeout(() => searchCustomersQuery.refetch(), 300)
    }

    const onResetFilterSearch = () => {
        setPage(1)
        setIsSearching(false)
        setQuery('')
        setSort('')
        setTimeout(() => getAllCustomersQuery.refetch(), 300)
    }

    useEffect(() => {
        if (isSearching) {
            searchCustomersQuery.refetch()
        }
    }, [page])

    const updateCustomerMutation = useMutation({
        mutationFn: ({ data }: { data: Partial<ICustomer> }) => axios.patch<IResponseData<any>>('/customers/update-info', data),
        onError: onError,
        onSuccess: res => {
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const deactivateCustomerMutation = useMutation({
        mutationFn: (customerId: number) => {
            return axios.post<IResponseData<any>>(`/customers/${customerId}/deactivate-account`)
        },
        onError: onError,
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries({ queryKey: ['search-customers'] })
                searchCustomersQuery.refetch()
            } else {
                queryClient.invalidateQueries({ queryKey: ['customers'] })
            }
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    return {
        customers,
        total,
        page,
        limit,
        setPage,
        onFilterSearch,
        onResetFilterSearch,
        buildQuery,
        updateCustomerMutation,
        deactivateCustomerMutation
    }
}

export default customerService
