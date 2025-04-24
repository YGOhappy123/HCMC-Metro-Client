import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import { onError } from '@/utils/errorsHandler'
import { getMappedSort } from '@/utils/apiSortMapping'
import { getMappedMessage } from '@/utils/resMessageMapping'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'
import { useLocation } from 'react-router-dom'

export type StationSortAndFilterParams = {
    searchName: string
    searchLocation: string
    // sort: string
}

const StationService = ({ enableFetching }: { enableFetching: boolean }) => {
    const queryClient = useQueryClient()
    const axios = useAxiosIns()
    const [Stations, setStations] = useState<IStation[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isSearching, setIsSearching] = useState(false)

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(8)
    const lineId = parseInt((new URLSearchParams(useLocation().search)).get('lineId') ?? '');
    const [query, setQuery] = useState<string>(lineId ? JSON.stringify({ lineId }) : '')
    const [sort, setSort] = useState<string>('')

    useEffect(() => {
        setPage(1)
        if (lineId) {
            setQuery(JSON.stringify({ lineId }));
        } else {
            setQuery('')
        }
    }, [lineId])

    const buildQuery = ({ searchName, searchLocation, /*sort*/ }: StationSortAndFilterParams) => {
        const query: any = {}
        if (lineId) query.lineId = lineId
        if (searchName) query.stationName = searchName.trim()
        if (searchLocation) query.location = searchLocation.trim()
        setQuery(JSON.stringify(query))
        if (sort) setSort(JSON.stringify(getMappedSort(sort)))
    }

    const searchStationsQuery = useQuery({
        queryKey: ['search-Stations', query, page, limit, sort],
        queryFn: () => {
            return axios.get<IResponseData<IStation[]>>(`/stations/search?skip=${limit * (page - 1)}&limit=${limit}&filter=${query}&sort=${sort}`)
        },
        enabled: !!query
    })

    useEffect(() => {
        if (searchStationsQuery.isSuccess && searchStationsQuery.data) {
            console.log(searchStationsQuery.data.data?.data)
            setStations(searchStationsQuery.data.data?.data)
            setTotal(searchStationsQuery.data.data?.total as number)
        }
    }, [searchStationsQuery.isSuccess, searchStationsQuery.data])

    const getAllStationsQuery = useQuery({
        queryKey: ['Stations', page, limit],
        queryFn: () => {
            if (!isSearching) {
                return axios.get<IResponseData<IStation[]>>(`/stations/metro-stations?skip=${limit * (page - 1)}&limit=${limit}`)
            }
        },
        enabled: enableFetching && !query,
    })

    useEffect(() => {
        if (getAllStationsQuery.isSuccess && getAllStationsQuery.data && !isSearching) {
            console.log(getAllStationsQuery.data.data?.data)
            setStations(getAllStationsQuery.data.data?.data)
            setTotal(getAllStationsQuery.data.data?.total as number)
        }
    }, [getAllStationsQuery.isSuccess, getAllStationsQuery.data])

    const onFilterSearch = () => {
        setPage(1)
        setIsSearching(true)
        setTimeout(() => searchStationsQuery.refetch(), 300)
    }

    const onResetFilterSearch = () => {
        setPage(1)
        setIsSearching(false)
        setQuery('')
        setSort('')
        setTimeout(() => getAllStationsQuery.refetch(), 300)
    }

    useEffect(() => {
        if (isSearching) {
            searchStationsQuery.refetch()
        }
    }, [page])

    const updateStationMutation = useMutation({
        mutationFn: ({ StationId, data }: { StationId: number; data: Partial<IStation> }) =>
            axios.patch<IResponseData<any>>(`/personnel/Stations/${StationId}/update-info`, data),
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries({ queryKey: ['search-Stations'] })
                searchStationsQuery.refetch()
            } else {
                queryClient.invalidateQueries({ queryKey: ['Stations'] })
            }
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        },
        onError: onError
    })


    return {
        Stations,
        total,
        page,
        limit,
        setPage,
        onFilterSearch,
        onResetFilterSearch,
        buildQuery,
        updateStationMutation,
    }
}

export default StationService
