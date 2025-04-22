import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosIns from '@/hooks/useAxiosIns'

interface IStatistics {
    currentCount: number
    previousCount: number
}

type StatisticsResponse = {
    users: IStatistics
    ticketCount: IStatistics
    revenues: IStatistics
}

type PopularDataResponse = {
    newestCustomers: ICustomer[]
    highestRevenueCustomers: ICustomer[]
}

export type StatisticCriteria = 'daily' | 'weekly' | 'monthly' | 'yearly'

const statisticService = ({ enableFetching }: { enableFetching: boolean }) => {
    const axios = useAxiosIns()
    const [type, setType] = useState<StatisticCriteria>('daily')

    const getSummaryDataQuery = useQuery({
        queryKey: ['statistics', type],
        queryFn: () => axios.get<IResponseData<StatisticsResponse>>(`/statistics?type=${type}`),
        refetchOnWindowFocus: true,
        refetchInterval: 10000,
        refetchIntervalInBackground: true,
        enabled: enableFetching,
        select: res => res.data.data
    })

    const getPopularDataQuery = useQuery({
        queryKey: ['statistics-popular', type],
        queryFn: () => axios.get<IResponseData<PopularDataResponse>>(`/statistics/popular?type=${type}`),
        refetchOnWindowFocus: true,
        refetchInterval: 10000,
        refetchIntervalInBackground: true,
        enabled: enableFetching,
        select: res => res.data.data
    })

    const getRevenuesChartQuery = useQuery({
        queryKey: ['revenues-chart', type],
        queryFn: () => axios.get<IResponseData<any>>(`/statistics/revenue-chart?type=${type}`),
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: true,
        refetchInterval: 10000,
        enabled: enableFetching,
        select: res => res.data?.data
    })

    const getOriginsChartQuery = useQuery({
        queryKey: ['origins-chart', type],
        queryFn: () => axios.get<IResponseData<any>>(`/statistics/origin-chart?type=${type}`),
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: true,
        refetchInterval: 10000,
        enabled: enableFetching,
        select: res => res.data?.data
    })

    return {
        getSummaryDataQuery,
        getPopularDataQuery,
        getRevenuesChartQuery,
        getOriginsChartQuery,
        type,
        setType
    }
}

export default statisticService
