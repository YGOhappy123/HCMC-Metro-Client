import { DataTable } from '@/components/ui/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { IGroupedTicketPrice } from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSingleJourney'
import { PAYMENT_METHOD_MAPPING } from '@/utils/paymentMethodMapping'
import Button from '@/components/common/Button'

type PriceTableProps = {
    prices: IGroupedTicketPrice[]
    total: number
    page: number
    limit: number
    setPage: (value: number) => void
    onViewHistory: (group: IGroupedTicketPrice) => void
    onUpdatePrice: (group: IGroupedTicketPrice) => void
}

const PriceTable = ({ prices, total, page, limit, setPage, onViewHistory, onUpdatePrice }: PriceTableProps) => {
    const columns: ColumnDef<IGroupedTicketPrice>[] = [
        {
            accessorKey: 'firstStation',
            header: () => <div className="text-center">Nhà ga thứ nhẩt</div>,
            cell: ({ row }) => {
                const station = row.original.stations?.[0]

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Mã nhà ga: </span>
                            {station?.stationId}
                        </div>
                        <div>
                            <span className="font-semibold">Tên nhà ga: </span>
                            {station?.stationName}
                        </div>
                        <div>
                            <span className="font-semibold">Địa chỉ: </span>
                            {station?.location}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'secondStation',
            header: () => <div className="text-center">Nhà ga thứ hai</div>,
            cell: ({ row }) => {
                const station = row.original.stations?.[1]

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Mã nhà ga: </span>
                            {station?.stationId}
                        </div>
                        <div>
                            <span className="font-semibold">Tên nhà ga: </span>
                            {station?.stationName}
                        </div>
                        <div>
                            <span className="font-semibold">Địa chỉ: </span>
                            {station?.location}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'prices',
            header: () => <div className="text-center">Giá vé mới nhất</div>,
            cell: ({ row }) => {
                const prices = row.original.prices

                return (
                    <div>
                        {Object.entries(PAYMENT_METHOD_MAPPING).map(([method, mappedMethod]) => (
                            <div key={method}>
                                <span className="font-semibold">{mappedMethod}: </span>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                    (prices?.find(rec => rec.paymentMethod === method)?.price ?? 0)! * 1000
                                )}
                            </div>
                        ))}
                    </div>
                )
            }
        },
        {
            accessorKey: 'actions',
            header: () => <div className="text-center">Hành Động</div>,
            cell: ({ row }) => {
                const group = row.original

                return (
                    <div className="grid grid-cols-1 gap-2 xl:grid-cols-1">
                        <Button
                            text="Lịch sử cập nhật"
                            variant="info"
                            onClick={() => onViewHistory(group)}
                            className="min-w-fit rounded px-3 py-1.5 text-xs"
                        />
                        <Button
                            text="Cập nhật giá vé"
                            variant="warning"
                            onClick={() => onUpdatePrice(group)}
                            className="min-w-fit rounded px-3 py-1.5 text-xs"
                        />
                    </div>
                )
            }
        }
    ]

    const lastPage = Math.ceil(total / limit)

    return (
        <div className="flex flex-col gap-8">
            <DataTable columns={columns} data={prices} noDataMessage="Không tìm thấy dữ liệu." />

            {total > 0 && (
                <div className="join flex w-full justify-center">
                    <div className="join">
                        <button
                            className="join-item btn border-primary cursor-pointer disabled:opacity-70"
                            disabled={page === 1}
                            onClick={() => setPage(page === 1 ? 1 : page - 1)}
                        >
                            «
                        </button>
                        <button className="join-item btn border-primary">
                            Trang {page}/{lastPage}
                        </button>
                        <button
                            className="join-item btn border-primary cursor-pointer disabled:opacity-70"
                            disabled={page === lastPage}
                            onClick={() => setPage(page === lastPage ? lastPage : page + 1)}
                        >
                            »
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PriceTable
