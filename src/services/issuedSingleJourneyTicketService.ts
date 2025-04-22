import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import { onError } from '@/utils/errorsHandler'
import { getMappedSort } from '@/utils/apiSortMapping'
import { getMappedMessage } from '@/utils/resMessageMapping'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

export type IssuedSingleJourneyTicketSortAndFilterParams = {
    searchCustomerName: string
    searchOrderId: string
    searchPrice: string
    searchPaymentStatus: string
    searchIssuedStation: number
    searchEntryStation: number
    searchExitStation: number
    sort: string
    range: string[] | any[] | undefined
}

const issuedSingleJourneyTicketService = ({ enableFetching }: { enableFetching: boolean }) => {
    const queryClient = useQueryClient()
    const axios = useAxiosIns()
    const [tickets, setTickets] = useState<IIssuedSingleJourneyTicket[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isSearching, setIsSearching] = useState(false)

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(8)
    const [query, setQuery] = useState<string>('')
    const [sort, setSort] = useState<string>('')

    const buildQuery = ({
        searchCustomerName,
        searchOrderId,
        searchPrice,
        searchPaymentStatus,
        searchIssuedStation,
        searchEntryStation,
        searchExitStation,
        sort,
        range
    }: IssuedSingleJourneyTicketSortAndFilterParams) => {
        const query: any = {}
        if (searchCustomerName) query.fullName = searchCustomerName.trim()
        if (searchOrderId) query.orderId = parseInt(searchOrderId.trim())
        if (searchPrice) query.price = parseInt(searchPrice.trim())
        if (searchPaymentStatus) query.status = searchPaymentStatus.trim()
        if (searchIssuedStation) query.issuedStationId = searchIssuedStation
        if (searchEntryStation) query.entryStationId = searchEntryStation
        if (searchExitStation) query.exitStationId = searchExitStation
        if (range) {
            if (range[0]) {
                query.startIssuedTime = dayjs(range[0]).format('YYYY-MM-DD')
            }
            if (range[1]) {
                query.endIssuedTime = dayjs(range[1]).format('YYYY-MM-DD')
            }
        }
        setQuery(JSON.stringify(query))
        if (sort) setSort(JSON.stringify(getMappedSort(sort)))
    }

    const searchTicketsQuery = useQuery({
        queryKey: ['search-issued-single-journey-tickets', query, sort],
        queryFn: () => {
            return axios.get<IResponseData<IIssuedSingleJourneyTicket[]>>(
                `/issued-tickets/single-journey?skip=${limit * (page - 1)}&limit=${limit}&filter=${query}&sort=${sort}`
            )
        },
        enabled: false
    })

    useEffect(() => {
        if (searchTicketsQuery.isSuccess && searchTicketsQuery.data) {
            setTickets(searchTicketsQuery.data.data?.data)
            setTotal(searchTicketsQuery.data.data?.total as number)
        }
    }, [searchTicketsQuery.isSuccess, searchTicketsQuery.data])

    const getAllTicketsQuery = useQuery({
        queryKey: ['issued-single-journey-tickets', page, limit],
        queryFn: () => {
            if (!isSearching) {
                return axios.get<IResponseData<IIssuedSingleJourneyTicket[]>>(
                    `/issued-tickets/single-journey?skip=${limit * (page - 1)}&limit=${limit}`
                )
            }
        },
        enabled: enableFetching,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 10000
    })

    useEffect(() => {
        if (getAllTicketsQuery.isSuccess && getAllTicketsQuery.data && !isSearching) {
            setTickets(getAllTicketsQuery.data.data?.data)
            setTotal(getAllTicketsQuery.data.data?.total as number)
        }
    }, [getAllTicketsQuery.isSuccess, getAllTicketsQuery.data])

    const onFilterSearch = () => {
        setPage(1)
        setIsSearching(true)
        setTimeout(() => searchTicketsQuery.refetch(), 300)
    }

    const onResetFilterSearch = () => {
        setPage(1)
        setIsSearching(false)
        setQuery('')
        setSort('')
        setTimeout(() => getAllTicketsQuery.refetch(), 300)
    }

    useEffect(() => {
        if (isSearching) {
            searchTicketsQuery.refetch()
        }
    }, [page])

    return {
        tickets,
        total,
        page,
        limit,
        setPage,
        onFilterSearch,
        onResetFilterSearch,
        buildQuery
    }
}

export default issuedSingleJourneyTicketService
