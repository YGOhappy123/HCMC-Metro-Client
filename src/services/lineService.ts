import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { onError } from '@/utils/errorsHandler'
import { getMappedSort } from '@/utils/apiSortMapping'
import { getMappedMessage } from '@/utils/resMessageMapping'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'
import { useLocation } from 'react-router-dom'

export type LineSortAndFilterParams = {
    searchName?: string
    searchLocation?: string
    // sort: string
}

const LineService = ({ enableFetching }: { enableFetching: boolean }) => {
    const queryClient = useQueryClient()
    const axios = useAxiosIns()
    const [Lines, setLines] = useState<ILine[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isSearching, setIsSearching] = useState(false)

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(8)
    const stationId = parseInt((new URLSearchParams(useLocation().search)).get('stationId') ?? '');
    const [query, setQuery] = useState<string>(stationId ? JSON.stringify({stationId}) : '');
    const [sort, setSort] = useState<string>('')
    
    useEffect(() => {
        setPage(1)
        if (stationId) {
            setQuery(JSON.stringify({stationId}));
        } else {
            setQuery('')
        }
    }, [stationId])

    const buildQuery = ({searchName, searchLocation, /*sort*/ }: LineSortAndFilterParams) => {
        const query: any = {}
        if (stationId) query.stationId = stationId;
        if (searchName) query.lineName = searchName.trim()
        if (searchLocation) query.location = searchLocation.trim()
        setQuery(JSON.stringify(query))
        if (sort) setSort(JSON.stringify(getMappedSort(sort)))
    }

    const searchLinesQuery = useQuery({
        queryKey: ['search-Lines', query, page, limit, sort],
        queryFn: () => {
            return axios.get<IResponseData<ILine[]>>(`/lines/search?skip=${limit * (page - 1)}&limit=${limit}&filter=${query}&sort=${sort}`)
        },
        enabled: !!query || !!sort
    })

    useEffect(() => {
        if (searchLinesQuery.isSuccess && searchLinesQuery.data) {
            setLines(searchLinesQuery.data.data?.data)
            setTotal(searchLinesQuery.data.data?.total as number)
        }
    }, [searchLinesQuery.isSuccess, searchLinesQuery.data])

    const getAllLinesQuery = useQuery({
        queryKey: ['Lines', page, limit],
        queryFn: () => {
            if (!isSearching) {
                return axios.get<IResponseData<ILine[]>>(`/lines/metro-lines?skip=${limit * (page - 1)}&limit=${limit}`)
            }
        },
        enabled: enableFetching && !query,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 10000
    })

    useEffect(() => {
        if (getAllLinesQuery.isSuccess && getAllLinesQuery.data && !isSearching) {
            setLines(getAllLinesQuery.data.data?.data)
            setTotal(getAllLinesQuery.data.data?.total as number)
        }
    }, [getAllLinesQuery.isSuccess, getAllLinesQuery.data])

    const onFilterSearch = () => {
        setPage(1)
        setIsSearching(true)
        setTimeout(() => searchLinesQuery.refetch(), 300)
    }

    const onResetFilterSearch = () => {
        setPage(1)
        setIsSearching(false)
        setQuery('')
        setSort('')
        setTimeout(() => getAllLinesQuery.refetch(), 300)
    }

    useEffect(() => {
        if (isSearching) {
            searchLinesQuery.refetch()
        }
    }, [page])

    const updateLineMutation = useMutation({
        mutationFn: ({ LineId, data }: { LineId: number; data: Partial<ILine> }) =>
            axios.patch<IResponseData<any>>(`/personnel/Lines/${LineId}/update-info`, data),
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries({ queryKey: ['search-Lines'] })
                searchLinesQuery.refetch()
            } else {
                queryClient.invalidateQueries({ queryKey: ['Lines'] })
            }
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        },
        onError: onError
    })


    return {
        Lines,
        total,
        page,
        limit,
        setPage,
        onFilterSearch,
        onResetFilterSearch,
        buildQuery,
        updateLineMutation,
    }
}

export default LineService
