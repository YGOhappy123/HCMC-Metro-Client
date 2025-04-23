import { useEffect, useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import useAxiosIns from '@/hooks/useAxiosIns'
import PriceTable from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSubscription/PriceTable'
import FilterForm from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSubscription/FilterForm'
import ViewPriceHistoryDialog from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSubscription/ViewPriceHistoryDialog'
import UpdatePriceDialog from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSubscription/UpdatePriceDialog'

export interface IGroupedTicketPrice {
    ticket: ISubscriptionTicket
    prices: ISubscriptionTicketPrice[]
}

const UpdateSubscription = () => {
    const axios = useAxiosIns()
    const [prices, setPrices] = useState<IGroupedTicketPrice[]>([])
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(8)
    const [selectedTicket, setSelectedTicket] = useState<number>(0)
    const [selectedPriceGroup, setSelectedPriceGroup] = useState<IGroupedTicketPrice | null>(null)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)

    const handleSearch = async () => {
        const result = await axios.get<IResponseData<IGroupedTicketPrice[]>>(
            `/prices/subscription?skip=${limit * (page - 1)}&limit=${limit}&filter=${JSON.stringify(selectedTicket ? { ticketId: Number(selectedTicket) } : {})}`
        )

        setPrices(result?.data?.data ?? [])
        setTotal(result?.data?.total ?? 0)
    }

    useEffect(() => {
        handleSearch()
    }, [page, limit])

    return (
        <div className="flex flex-col gap-8 py-4">
            <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
                <ViewPriceHistoryDialog priceGroup={selectedPriceGroup} closeDialog={() => setIsHistoryDialogOpen(false)} />
            </Dialog>

            <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
                <UpdatePriceDialog
                    priceGroup={selectedPriceGroup}
                    closeDialog={() => setIsUpdateModalOpen(false)}
                    onUpdateDone={() => handleSearch()}
                />
            </Dialog>

            <FilterForm axios={axios} handleSearch={handleSearch} selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket} />

            <PriceTable
                prices={prices}
                total={total}
                page={page}
                limit={limit}
                setPage={setPage}
                onViewHistory={(group: IGroupedTicketPrice) => {
                    setSelectedPriceGroup(group)
                    setIsHistoryDialogOpen(true)
                }}
                onUpdatePrice={(group: IGroupedTicketPrice) => {
                    setSelectedPriceGroup(group)
                    setIsUpdateModalOpen(true)
                }}
            />
        </div>
    )
}

export default UpdateSubscription
