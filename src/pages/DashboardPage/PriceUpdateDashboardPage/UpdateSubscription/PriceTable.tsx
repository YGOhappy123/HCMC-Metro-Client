import { DataTable } from '@/components/ui/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { IGroupedTicketPrice } from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSubscription'
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
            accessorKey: 'ticketId',
            header: 'Mã vé',
            cell: ({ row }) => {
                const ticket = row.original.ticket
                return ticket.subscriptionTicketId
            }
        },
        {
            accessorKey: 'ticket',
            header: () => 'Thông tin vé',
            cell: ({ row }) => {
                const ticket = row.original.ticket
                return (
                    <div>
                        <div>
                            <span className="font-semibold">Tên vé: </span>
                            {ticket?.ticketName}
                        </div>
                        <div>
                            <span className="font-semibold">Số ngày hiệu lực: </span>
                            {ticket?.validityDays} ngày
                        </div>
                        <div>
                            <span className="font-semibold">Yêu cầu khi mua vé: </span>
                            {ticket?.requirements ?? 'Không có yêu cầu đặc biệt'}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'prices',
            header: () => 'Giá vé mới nhất',
            cell: ({ row }) => {
                const prices = row.original.prices
                return (
                    <div>
                        <span className="font-semibold">Tất cả phương thức: </span>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((prices?.[0]?.price ?? 0)! * 1000)}
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
