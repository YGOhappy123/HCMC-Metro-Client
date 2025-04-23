import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Popover, PopoverTrigger } from '@/components/ui/Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import useAxiosIns from '@/hooks/useAxiosIns'
import tripService from '@/services/tripService'
import TripTable from './TripTable'
import TripFilter from './TripFilter'
import { Dialog } from '@/components/ui/Dialog'

const TripDashboardPage = () => {
    const axios = useAxiosIns()
    const { trips, total, page, limit, setPage, buildQuery, onFilterSearch, onResetFilterSearch } = tripService({ enableFetching: true })

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
    const [isTicketDetailModalOpen, setIsTicketDetailModalOpen] = useState(false)

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between p-4">
                <h2 className="font-oswald flex items-center gap-4 text-3xl font-bold text-black/30 uppercase">
                    <span>
                        Tra cứu thông tin <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span className="text-primary">Danh sách chuyến đi</span>
                </h2>

                <div className="flex justify-center gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="relative flex min-w-[120px] cursor-pointer items-center justify-center rounded-md border-2 border-solid border-black bg-black/10 px-6 py-3 font-medium text-black hover:opacity-90">
                                Tìm kiếm
                                {havingFilters && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></div>}
                            </div>
                        </PopoverTrigger>
                        <TripFilter
                            stations={stations}
                            subscriptionTickets={subscriptionTickets}
                            setHavingFilters={setHavingFilters}
                            onChange={buildQuery}
                            onSearch={onFilterSearch}
                            onReset={onResetFilterSearch}
                        />
                    </Popover>

                    {/* <Dialog open={isTicketDetailModalOpen} onOpenChange={setIsTicketDetailModalOpen}>
                        <UpdateStaffDialog
                            selectedStaff={selectedStaff}
                            isOpen={isTicketDetailModalOpen}
                            stations={stations}
                            closeDialog={() => setIsTicketDetailModalOpen(false)}
                            updateStaffMutation={updateStaffMutation}
                        />
                    </Dialog> */}
                </div>
            </div>

            <TripTable trips={trips} total={total} page={page} limit={limit} setPage={setPage} />
        </div>
    )
}

export default TripDashboardPage
