import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import { onError } from '@/utils/errorsHandler'
import { getMappedSort } from '@/utils/apiSortMapping'
import { getMappedMessage } from '@/utils/resMessageMapping'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

export type AdminSortAndFilterParams = {
    searchName: string
    searchEmail: string
    searchPhoneNumber: string
    searchIsWorking: string | undefined
    sort: string
    range: string[] | any[] | undefined
}

const adminService = ({ enableFetching }: { enableFetching: boolean }) => {
    const queryClient = useQueryClient()
    const axios = useAxiosIns()
    const [admins, setAdmins] = useState<IAdmin[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isSearching, setIsSearching] = useState(false)

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(8)
    const [query, setQuery] = useState<string>('')
    const [sort, setSort] = useState<string>('')

    const buildQuery = ({ searchName, searchEmail, searchPhoneNumber, searchIsWorking, sort, range }: AdminSortAndFilterParams) => {
        const query: any = {}
        if (searchName) query.fullName = searchName.trim()
        if (searchEmail) query.email = searchEmail.trim()
        if (searchPhoneNumber) query.phoneNumber = searchPhoneNumber.trim()
        if (searchIsWorking) query.isWorking = searchIsWorking
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

    const searchAdminsQuery = useQuery({
        queryKey: ['search-admins', query, sort],
        queryFn: () => {
            return axios.get<IResponseData<IAdmin[]>>(`/personnel/admins?skip=${limit * (page - 1)}&limit=${limit}&filter=${query}&sort=${sort}`)
        },
        enabled: false
    })

    useEffect(() => {
        if (searchAdminsQuery.isSuccess && searchAdminsQuery.data) {
            setAdmins(searchAdminsQuery.data.data?.data)
            setTotal(searchAdminsQuery.data.data?.total as number)
        }
    }, [searchAdminsQuery.isSuccess, searchAdminsQuery.data])

    const getAllAdminsQuery = useQuery({
        queryKey: ['admins', page, limit],
        queryFn: () => {
            if (!isSearching) {
                return axios.get<IResponseData<IAdmin[]>>(`/personnel/admins?skip=${limit * (page - 1)}&limit=${limit}`)
            }
        },
        enabled: enableFetching,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 10000
    })

    useEffect(() => {
        if (getAllAdminsQuery.isSuccess && getAllAdminsQuery.data && !isSearching) {
            setAdmins(getAllAdminsQuery.data.data?.data)
            setTotal(getAllAdminsQuery.data.data?.total as number)
        }
    }, [getAllAdminsQuery.isSuccess, getAllAdminsQuery.data])

    const onFilterSearch = () => {
        setPage(1)
        setIsSearching(true)
        setTimeout(() => searchAdminsQuery.refetch(), 300)
    }

    const onResetFilterSearch = () => {
        setPage(1)
        setIsSearching(false)
        setQuery('')
        setSort('')
        setTimeout(() => getAllAdminsQuery.refetch(), 300)
    }

    useEffect(() => {
        if (isSearching) {
            searchAdminsQuery.refetch()
        }
    }, [page])

    const createAdminMutation = useMutation({
        mutationFn: (data: Partial<IAdmin>) => {
            return axios.post<IResponseData<IAdmin>>('/personnel/admins', data)
        },
        onError: onError,
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries({ queryKey: ['search-admins'] })
                searchAdminsQuery.refetch()
            } else {
                queryClient.invalidateQueries({ queryKey: ['admins'] })
            }
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const updateAdminMutation = useMutation({
        mutationFn: ({ data }: { data: Partial<IAdmin> }) => axios.patch<IResponseData<any>>('/personnel/admins/update-info', data),
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries({ queryKey: ['search-admins'] })
                searchAdminsQuery.refetch()
            } else {
                queryClient.invalidateQueries({ queryKey: ['admins'] })
            }
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        },
        onError: onError
    })

    const deactivateAdminMutation = useMutation({
        mutationFn: (adminId: number) => {
            return axios.post<IResponseData<any>>(`/personnel/admins/${adminId}/deactivate-account`)
        },
        onError: onError,
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries({ queryKey: ['search-admins'] })
                searchAdminsQuery.refetch()
            } else {
                queryClient.invalidateQueries({ queryKey: ['admins'] })
            }
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    return {
        admins,
        total,
        page,
        limit,
        setPage,
        onFilterSearch,
        onResetFilterSearch,
        buildQuery,
        createAdminMutation,
        updateAdminMutation,
        deactivateAdminMutation
    }
}

export default adminService
