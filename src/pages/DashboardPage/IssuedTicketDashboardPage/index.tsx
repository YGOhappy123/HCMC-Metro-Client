import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Popover, PopoverTrigger } from '@/components/ui/Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import SingleJourneyTicketTable from '@/pages/DashboardPage/IssuedTicketDashboardPage/SingleJourneyTicketTable'
import SubscriptionTicketTable from '@/pages/DashboardPage/IssuedTicketDashboardPage/SubscriptionTicketTable'
import SingleJourneyTicketFilter from '@/pages/DashboardPage/IssuedTicketDashboardPage/SingleJourneyTicketFilter'
import SubscriptionTicketFilter from '@/pages/DashboardPage/IssuedTicketDashboardPage/SubscriptionTicketFilter'
import useAxiosIns from '@/hooks/useAxiosIns'
import issuedSingleJourneyTicketService from '@/services/issuedSingleJourneyTicketService'
import issuedSubscriptionTicketService from '@/services/issuedSubscriptionTicketService'

const IssuedTicketDashboardPage = () => {
    const axios = useAxiosIns()
    const {
        tickets: sjTickets,
        total,
        page,
        limit,
        setPage,
        buildQuery,
        onFilterSearch,
        onResetFilterSearch
    } = issuedSingleJourneyTicketService({ enableFetching: true })

    const {
        tickets: sTickets,
        total: sTotal,
        page: sPage,
        limit: sLimit,
        setPage: sSetPage,
        buildQuery: sBuildQuery,
        onFilterSearch: sOnFilterSearch,
        onResetFilterSearch: sOnResetFilterSearch
    } = issuedSubscriptionTicketService({ enableFetching: true })

    const fetchAllStationsQuery = useQuery({
        queryKey: ['stations-all'],
        queryFn: () => axios.get<IResponseData<IStation[]>>('/stations/metro-stations'),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: true,
        select: res => res.data
    })
    const stations = fetchAllStationsQuery.data?.data || []

    const fetchAllSubscriptionTicketsQuery = useQuery({
        queryKey: ['subscription-tickets-all'],
        queryFn: () => axios.get<IResponseData<ISubscriptionTicket[]>>('/tickets/subscription'),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: true,
        select: res => res.data
    })
    const subscriptionTickets = fetchAllSubscriptionTicketsQuery.data?.data || []

    const [havingFilters, setHavingFilters] = useState<{ [key: string]: boolean }>({
        'single-journey': false,
        subscription: false
    })
    const [ticketType, setTicketType] = useState<'single-journey' | 'subscription'>('single-journey')

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between p-4">
                <h2 className="font-oswald flex items-center gap-4 text-3xl font-bold text-black/30 uppercase">
                    <span>
                        Tra cứu thông tin <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span className="text-primary">Vé đã phát hành</span>
                </h2>

                <div className="flex justify-center gap-4">
                    {ticketType === 'single-journey' && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="relative flex min-w-[120px] cursor-pointer items-center justify-center rounded-md border-2 border-solid border-black bg-black/10 px-6 py-3 font-medium text-black hover:opacity-90">
                                    Tìm kiếm
                                    {havingFilters[ticketType] && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></div>}
                                </div>
                            </PopoverTrigger>
                            <SingleJourneyTicketFilter
                                stations={stations}
                                activeTab={ticketType}
                                setHavingFilters={setHavingFilters}
                                onChange={buildQuery}
                                onSearch={onFilterSearch}
                                onReset={onResetFilterSearch}
                            />
                        </Popover>
                    )}
                    {ticketType === 'subscription' && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="relative flex min-w-[120px] cursor-pointer items-center justify-center rounded-md border-2 border-solid border-black bg-black/10 px-6 py-3 font-medium text-black hover:opacity-90">
                                    Tìm kiếm
                                    {havingFilters[ticketType] && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></div>}
                                </div>
                            </PopoverTrigger>
                            <SubscriptionTicketFilter
                                stations={stations}
                                subscriptionTickets={subscriptionTickets}
                                activeTab={ticketType}
                                setHavingFilters={setHavingFilters}
                                onChange={sBuildQuery}
                                onSearch={sOnFilterSearch}
                                onReset={sOnResetFilterSearch}
                            />
                        </Popover>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-center gap-10">
                <div className="flex items-center gap-1">
                    <input
                        type="radio"
                        id="single-journey"
                        name="ticketType"
                        value="single-journey"
                        checked={ticketType === 'single-journey'}
                        onChange={e => setTicketType(e.target.value as any)}
                        className="accent-primary h-4 w-4 cursor-pointer"
                    />
                    <label htmlFor="single-journey" className="cursor-pointer p-2">
                        Vé một chặng
                    </label>
                </div>
                <div className="flex items-center gap-1">
                    <input
                        type="radio"
                        id="subscription"
                        name="ticketType"
                        value="subscription"
                        checked={ticketType === 'subscription'}
                        onChange={e => setTicketType(e.target.value as any)}
                        className="accent-primary h-4 w-4 cursor-pointer"
                    />
                    <label htmlFor="subscription" className="cursor-pointer p-2">
                        Vé thời hạn
                    </label>
                </div>
            </div>

            {ticketType === 'single-journey' && (
                <SingleJourneyTicketTable tickets={sjTickets} total={total} page={page} limit={limit} setPage={setPage} />
            )}
            {ticketType === 'subscription' && (
                <SubscriptionTicketTable tickets={sTickets} total={sTotal} page={sPage} limit={sLimit} setPage={sSetPage} />
            )}
        </div>
    )
}

export default IssuedTicketDashboardPage
