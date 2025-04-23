import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import { onError } from '@/utils/errorsHandler'
import { getMappedSort } from '@/utils/apiSortMapping'
import { getMappedMessage } from '@/utils/resMessageMapping'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

export type TripSortAndFilterParams = {
    searchEntryStation: number
    searchExitStation: number
    sort: string
    rangeEntry: string[] | any[] | undefined
    rangeExit: string[] | any[] | undefined
}

const tripService = ({ enableFetching }: { enableFetching: boolean }) => {
    const queryClient = useQueryClient()
    const axios = useAxiosIns()
    const [trips, setTrips] = useState<ITrip[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isSearching, setIsSearching] = useState(false)

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(8)
    const [query, setQuery] = useState<string>('')
    const [sort, setSort] = useState<string>('')

    const buildQuery = ({ searchEntryStation, searchExitStation, sort, rangeEntry, rangeExit }: TripSortAndFilterParams) => {
        const query: any = {}
        if (searchEntryStation) query.entryStationId = searchEntryStation
        if (searchExitStation) query.exitStationId = searchExitStation
        if (rangeEntry) {
            if (rangeEntry[0]) {
                query.startEntryTime = dayjs(rangeEntry[0]).format('YYYY-MM-DD')
            }
            if (rangeEntry[1]) {
                query.endEntryTime = dayjs(rangeEntry[1]).format('YYYY-MM-DD')
            }
        }
        if (rangeExit) {
            if (rangeExit[0]) {
                query.startExitTime = dayjs(rangeExit[0]).format('YYYY-MM-DD')
            }
            if (rangeExit[1]) {
                query.endExitTime = dayjs(rangeExit[1]).format('YYYY-MM-DD')
            }
        }
        setQuery(JSON.stringify(query))
        console.log(query)
        if (sort) setSort(JSON.stringify(getMappedSort(sort)))
    }

    const searchTripsQuery = useQuery({
        queryKey: ['search-trips', query, sort],
        queryFn: () => {
            return axios.get<IResponseData<ITrip[]>>(`/trips/?skip=${limit * (page - 1)}&limit=${limit}&filter=${query}&sort=${sort}`)
        },
        enabled: false
    })

    useEffect(() => {
        if (searchTripsQuery.isSuccess && searchTripsQuery.data) {
            setTrips(searchTripsQuery.data.data?.data)
            setTotal(searchTripsQuery.data.data?.total as number)
        }
    }, [searchTripsQuery.isSuccess, searchTripsQuery.data])

    const getAllTripsQuery = useQuery({
        queryKey: ['trips', page, limit],
        queryFn: () => {
            if (!isSearching) {
                return axios.get<IResponseData<ITrip[]>>(`/trips/?skip=${limit * (page - 1)}&limit=${limit}`)
            }
        },
        enabled: enableFetching,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 10000
    })

    useEffect(() => {
        if (getAllTripsQuery.isSuccess && getAllTripsQuery.data && !isSearching) {
            setTrips(getAllTripsQuery.data.data?.data)
            setTotal(getAllTripsQuery.data.data?.total as number)
        }
    }, [getAllTripsQuery.isSuccess, getAllTripsQuery.data])

    const onFilterSearch = () => {
        setPage(1)
        setIsSearching(true)
        setTimeout(() => searchTripsQuery.refetch(), 300)
    }

    const onResetFilterSearch = () => {
        setPage(1)
        setIsSearching(false)
        setQuery('')
        setSort('')
        setTimeout(() => getAllTripsQuery.refetch(), 300)
    }

    useEffect(() => {
        if (isSearching) {
            searchTripsQuery.refetch()
        }
    }, [page])

    return {
        trips,
        total,
        page,
        limit,
        setPage,
        onFilterSearch,
        onResetFilterSearch,
        buildQuery
    }
}

export default tripService
