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
    searchStation: number
    searchIsWorking: string | undefined
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

    const buildQuery = ({ searchName, searchEmail, searchPhoneNumber, searchStation, searchIsWorking, sort, range }: StaffSortAndFilterParams) => {
        const query: any = {}
        if (searchName) query.fullName = searchName.trim()
        if (searchEmail) query.email = searchEmail.trim()
        if (searchPhoneNumber) query.phoneNumber = searchPhoneNumber.trim()
        if (searchStation) query.workingStationId = searchStation
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

    const searchStaffsQuery = useQuery({
        queryKey: ['search-staffs', query, sort],
        queryFn: () => {
            return axios.get<IResponseData<IStaff[]>>(`/personnel/staffs?skip=${limit * (page - 1)}&limit=${limit}&filter=${query}&sort=${sort}`)
        },
        enabled: false
    })

    useEffect(() => {
        if (searchStaffsQuery.isSuccess && searchStaffsQuery.data) {
            setStaffs(searchStaffsQuery.data.data?.data)
            setTotal(searchStaffsQuery.data.data?.total as number)
        }
    }, [searchStaffsQuery.isSuccess, searchStaffsQuery.data])

    const getAllStaffsQuery = useQuery({
        queryKey: ['staffs', page, limit],
        queryFn: () => {
            if (!isSearching) {
                return axios.get<IResponseData<IStaff[]>>(`/personnel/staffs?skip=${limit * (page - 1)}&limit=${limit}`)
            }
        },
        enabled: enableFetching,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 10000
    })

    useEffect(() => {
        if (getAllStaffsQuery.isSuccess && getAllStaffsQuery.data && !isSearching) {
            setStaffs(getAllStaffsQuery.data.data?.data)
            setTotal(getAllStaffsQuery.data.data?.total as number)
        }
    }, [getAllStaffsQuery.isSuccess, getAllStaffsQuery.data])

    const onFilterSearch = () => {
        setPage(1)
        setIsSearching(true)
        setTimeout(() => searchStaffsQuery.refetch(), 300)
    }

    const onResetFilterSearch = () => {
        setPage(1)
        setIsSearching(false)
        setQuery('')
        setSort('')
        setTimeout(() => getAllStaffsQuery.refetch(), 300)
    }

    useEffect(() => {
        if (isSearching) {
            searchStaffsQuery.refetch()
        }
    }, [page])

    const createStaffMutation = useMutation({
        mutationFn: (data: Partial<IStaff>) => {
            return axios.post<IResponseData<IStaff>>('/personnel/staffs', data)
        },
        onError: onError,
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries({ queryKey: ['search-staffs'] })
                searchStaffsQuery.refetch()
            } else {
                queryClient.invalidateQueries({ queryKey: ['staffs'] })
            }
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const updateStaffMutation = useMutation({
        mutationFn: ({ staffId, data }: { staffId: number; data: Partial<IStaff> }) =>
            axios.patch<IResponseData<any>>(`/personnel/staffs/${staffId}/update-info`, data),
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries({ queryKey: ['search-staffs'] })
                searchStaffsQuery.refetch()
            } else {
                queryClient.invalidateQueries({ queryKey: ['staffs'] })
            }
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        },
        onError: onError
    })

    const deactivateStaffMutation = useMutation({
        mutationFn: (staffId: number) => {
            return axios.post<IResponseData<any>>(`/personnel/staffs/${staffId}/deactivate-account`)
        },
        onError: onError,
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries({ queryKey: ['search-staffs'] })
                searchStaffsQuery.refetch()
            } else {
                queryClient.invalidateQueries({ queryKey: ['staffs'] })
            }
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    return {
        staffs,
        total,
        page,
        limit,
        setPage,
        onFilterSearch,
        onResetFilterSearch,
        buildQuery,
        createStaffMutation,
        updateStaffMutation,
        deactivateStaffMutation
    }
}

export default staffService
