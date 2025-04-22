import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Popover, PopoverTrigger } from '@/components/ui/Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import SingleJourneyTicketTable from '@/pages/DashboardPage/IssuedTicketDashboardPage/SingleJourneyTicketTable'
import SubscriptionTicketTable from '@/pages/DashboardPage/IssuedTicketDashboardPage/SubscriptionTicketTable'
import SfcCardTable from '@/pages/DashboardPage/IssuedTicketDashboardPage/SfcCardTable'
import SingleJourneyTicketFilter from '@/pages/DashboardPage/IssuedTicketDashboardPage/SingleJourneyTicketFilter'
import SubscriptionTicketFilter from '@/pages/DashboardPage/IssuedTicketDashboardPage/SubscriptionTicketFilter'
import SfcCardFilter from '@/pages/DashboardPage/IssuedTicketDashboardPage/SfcCardFilter'
import useAxiosIns from '@/hooks/useAxiosIns'
import TabContainer from '@/components/ui/TabContainer'
import issuedSingleJourneyTicketService from '@/services/issuedSingleJourneyTicketService'
import issuedSubscriptionTicketService from '@/services/issuedSubscriptionTicketService'
import issuedSfcCardService from '@/services/issuedSfcCardService'

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

    const {
        tickets: sfcTickets,
        total: sfcTotal,
        page: sfcPage,
        limit: sfcLimit,
        setPage: sfcSetPage,
        buildQuery: sfcBuildQuery,
        onFilterSearch: sfcOnFilterSearch,
        onResetFilterSearch: sfcOnResetFilterSearch
    } = issuedSfcCardService({ enableFetching: true })

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

    const [havingFilters, setHavingFilters] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const tabs = ['Vé một chặng', 'Vé thời hạn', 'Thẻ SFC']

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
                    {activeTab === 0 && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="relative flex min-w-[120px] cursor-pointer items-center justify-center rounded-md border-2 border-solid border-black bg-black/10 px-6 py-3 font-medium text-black hover:opacity-90">
                                    Tìm kiếm
                                    {havingFilters && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></div>}
                                </div>
                            </PopoverTrigger>
                            <SingleJourneyTicketFilter
                                stations={stations}
                                activeTab={activeTab}
                                setHavingFilters={setHavingFilters}
                                onChange={buildQuery}
                                onSearch={onFilterSearch}
                                onReset={onResetFilterSearch}
                            />
                        </Popover>
                    )}
                    {activeTab === 1 && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="relative flex min-w-[120px] cursor-pointer items-center justify-center rounded-md border-2 border-solid border-black bg-black/10 px-6 py-3 font-medium text-black hover:opacity-90">
                                    Tìm kiếm
                                    {havingFilters && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></div>}
                                </div>
                            </PopoverTrigger>
                            <SubscriptionTicketFilter
                                stations={stations}
                                subscriptionTickets={subscriptionTickets}
                                setHavingFilters={setHavingFilters}
                                onChange={sBuildQuery}
                                onSearch={sOnFilterSearch}
                                onReset={sOnResetFilterSearch}
                            />
                        </Popover>
                    )}
                    {activeTab === 2 && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="relative flex min-w-[120px] cursor-pointer items-center justify-center rounded-md border-2 border-solid border-black bg-black/10 px-6 py-3 font-medium text-black hover:opacity-90">
                                    Tìm kiếm
                                    {havingFilters && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></div>}
                                </div>
                            </PopoverTrigger>
                            <SfcCardFilter
                                stations={stations}
                                setHavingFilters={setHavingFilters}
                                onChange={sfcBuildQuery}
                                onSearch={sfcOnFilterSearch}
                                onReset={sfcOnResetFilterSearch}
                            />
                        </Popover>
                    )}
                </div>
            </div>

            <TabContainer tabs={tabs} activeIndex={activeTab} onChange={setActiveTab} />

            {activeTab === 0 && <SingleJourneyTicketTable tickets={sjTickets} total={total} page={page} limit={limit} setPage={setPage} />}
            {activeTab === 1 && <SubscriptionTicketTable tickets={sTickets} total={sTotal} page={sPage} limit={sLimit} setPage={sSetPage} />}
            {activeTab === 2 && <SfcCardTable tickets={sfcTickets} total={sfcTotal} page={sfcPage} limit={sfcLimit} setPage={sfcSetPage} />}
        </div>
    )
}

export default IssuedTicketDashboardPage
