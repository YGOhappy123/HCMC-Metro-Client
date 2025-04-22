import { useEffect, useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import useAxiosIns from '@/hooks/useAxiosIns'
import FilterForm from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSingleJourney/FilterForm'
import PriceTable from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSingleJourney/PriceTable'
import ViewPriceHistoryDialog from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSingleJourney/ViewPriceHistoryDialog'
import UpdatePriceDialog from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSingleJourney/UpdatePriceDialog'

export interface IGroupedTicketPrice {
    stations: [IStation, IStation]
    prices: ISingleJourneyTicketPrice[]
}

const UpdateSingleJourney = () => {
    const axios = useAxiosIns()
    const [prices, setPrices] = useState<IGroupedTicketPrice[]>([])
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(8)
    const [selectedLine, setSelectedLine] = useState<number>(0)
    const [selectedStation, setSelectedStation] = useState<number>(0)
    const [selectedPriceGroup, setSelectedPriceGroup] = useState<IGroupedTicketPrice | null>(null)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)

    const handleSearch = async () => {
        if (!selectedLine) return

        const result = await axios.get<IResponseData<IGroupedTicketPrice[]>>(
            `/prices/single-journey?skip=${limit * (page - 1)}&limit=${limit}&filter=${JSON.stringify({
                line: Number(selectedLine),
                stations: selectedStation ? [Number(selectedStation)] : []
            })}`
        )

        setPrices(result?.data?.data ?? [])
        setTotal(result?.data?.total ?? 0)
    }

    useEffect(() => {
        handleSearch()
    }, [page, limit])

    useEffect(() => {
        setSelectedStation(0)
    }, [selectedLine])

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

            <FilterForm
                axios={axios}
                handleSearch={async () => {
                    if (page !== 1) {
                        setPage(1)
                    } else {
                        handleSearch()
                    }
                }}
                selectedLine={selectedLine}
                setSelectedLine={setSelectedLine}
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
            />

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

export default UpdateSingleJourney
