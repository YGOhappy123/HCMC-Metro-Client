import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import dayjs from '@/libs/dayjs'
import Button from '@/components/common/Button'

type TripTableProps = {
    trips: ITrip[]
    total: number
    page: number
    limit: number
    setPage: (page: number) => void
    onSelectTicket: (ticket: IIssuedSingleJourneyTicket | IIssuedSubscriptionTicket) => void
    // deactivateStaffMutation: any
}

const TripTable = ({ trips, total, page, limit, setPage, onSelectTicket }: TripTableProps) => {
    const columns: ColumnDef<ITrip>[] = [
        {
            accessorKey: 'tripId',
            header: 'Mã Chuyến Đi'
        },
        {
            accessorKey: 'ticketType',
            header: () => <div className="text-center">Loại vé</div>,
            enableHiding: true,
            cell: ({ row }) => {
                const subscriptionTicketName = row.original.subscriptionTicket?.subscriptionTicket?.ticketName

                if (subscriptionTicketName)
                    return (
                        <div className="flex justify-center gap-1">
                            <div className="table-tag-pink">Vé thời hạn</div>
                            <div>-</div>
                            <div className="table-tag-green">{subscriptionTicketName}</div>
                        </div>
                    )
                else
                    return (
                        <div className="flex justify-center">
                            <div className="table-tag-blue">Vé 1 chặng</div>
                        </div>
                    )
            }
        },
        {
            accessorKey: 'checkin',
            header: () => <div className="text-center">Thông tin check-in</div>,
            enableHiding: true,
            cell: ({ row }) => {
                const checkinStation = row.original.entryStation?.stationName
                const entryTime = row.original.entryTime

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Ga check-in: </span>
                            {checkinStation}
                        </div>
                        <div>
                            <span className="font-semibold">Thời gian check-in: </span>
                            {dayjs(entryTime).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'checkout',
            header: () => <div className="text-center">Thông tin check-out</div>,
            enableHiding: true,
            cell: ({ row }) => {
                const checkoutStation = row.original.exitStation?.stationName
                const exitTime = row.original.exitTime

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Ga check-out: </span>
                            {checkoutStation ? checkoutStation : 'Chưa ghi nhận'}
                        </div>
                        <div>
                            <span className="font-semibold">Thời gian check-out: </span>
                            {exitTime ? dayjs(exitTime).format('DD/MM/YYYY HH:mm:ss') : 'Chưa ghi nhận'}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'actions',
            header: () => <div className="text-center">Hành Động</div>,
            cell: ({ row }) => {
                const ticket = row.original.singleJourneyTicket || row.original.subscriptionTicket!

                return (
                    <div className="grid grid-cols-1 gap-2 xl:grid-cols-1">
                        <Button
                            text="Xem chi tiết vé"
                            variant="info"
                            onClick={() => onSelectTicket(ticket)}
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
            <DataTable columns={columns} data={trips} />
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
        </div>
    )
}

export default TripTable
