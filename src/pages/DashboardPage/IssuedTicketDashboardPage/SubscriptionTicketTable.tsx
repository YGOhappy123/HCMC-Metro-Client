import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import dayjs from '@/libs/dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons'
import formatCurrency from '@/utils/formatCurrency'
import TicketNameTag from '@/components/ui/TicketNameTag'
import { QRCodeCanvas } from 'qrcode.react'

type SubscriptionTicketTableProps = {
    tickets: IIssuedSubscriptionTicket[]
    total: number
    page: number
    limit: number
    setPage: (page: number) => void
}

const SubscriptionTicketTable = ({ tickets, total, page, limit, setPage }: SubscriptionTicketTableProps) => {
    const columns: ColumnDef<IIssuedSubscriptionTicket>[] = [
        {
            accessorKey: 'ticketId',
            header: 'Mã vé'
        },
        {
            accessorKey: 'orderId',
            header: 'Mã đơn hàng',
            enableHiding: true,
            cell: ({ row }) => {
                const orderId = row.original.orderId
                return `#${orderId}`
            }
        },
        {
            accessorKey: 'code',
            header: () => <div className="text-center">Mã Code</div>,
            cell: ({ row }) => {
                const code = row.original.code

                return (
                    <div className="flex justify-center">
                        <QRCodeCanvas value={code!} size={80} />
                    </div>
                )
            }
        },
        {
            accessorKey: 'ticketName',
            header: () => <div className="text-center">Loại vé</div>,
            enableHiding: true,
            cell: ({ row }) => {
                const ticketName = row.original.subscriptionTicket?.ticketName

                return <TicketNameTag ticketName={ticketName || ''} />
            }
        },
        {
            accessorKey: 'price',
            header: () => <div className="text-center">Giá vé</div>,
            enableHiding: true,
            cell: ({ row }) => {
                const price = row.original.price
                return (
                    <div className="flex justify-center">
                        <div className="flex w-24 justify-end rounded-xl bg-orange-100">
                            <span className="rounded px-2 py-1 text-right text-lg font-semibold text-green-800">{formatCurrency(price)}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'issuedStation',
            header: () => <div className="text-center">Nơi mua vé</div>,
            enableHiding: true,
            cell: ({ row }) => {
                const issuedStation = row.original.issuedStation?.stationName

                if (!issuedStation)
                    return (
                        <div className="flex justify-center">
                            <div className="table-tag-orange">Mua trực tuyến</div>
                        </div>
                    )

                return (
                    <div className="flex justify-center">
                        <div className="table-tag-pink">Ga {issuedStation}</div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'issuedExpiredAt',
            header: 'Thời gian hiệu lực',
            enableHiding: true,
            cell: ({ row }) => {
                const issuedAt = row.original.issuedAt
                const expiredAt = row.original.expiredAt

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Ngày mua: </span>
                            {dayjs(issuedAt).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                        <div>
                            <span className="font-semibold">Ngày hết hạn: </span>
                            {dayjs(expiredAt).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'status',
            header: () => <div className="text-center">Trạng thái thanh toán</div>,
            enableHiding: true,
            cell: ({ row }) => {
                const isPaid = row.original.status === 'paid'
                return (
                    <div className="flex justify-center">
                        {isPaid ? (
                            <FontAwesomeIcon icon={faCheckCircle} className="min-w-max text-green-400" size="xl" />
                        ) : (
                            <FontAwesomeIcon icon={faClock} className="min-w-max text-yellow-300" size="xl" />
                        )}
                    </div>
                )
            }
        }
    ]

    const lastPage = Math.ceil(total / limit)

    return (
        <div className="flex flex-col gap-8">
            <DataTable columns={columns} data={tickets} />
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

export default SubscriptionTicketTable
