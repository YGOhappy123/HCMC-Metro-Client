import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { getMappedPaymentMethod, getMappedTicketStatus } from '@/utils/paymentMethodMapping'
import { QRCodeCanvas } from 'qrcode.react'
import Button from '@/components/common/Button'
import dayjs from 'dayjs'

type TicketDetailDialogProps = {
    ticket: IIssuedSingleJourneyTicket | IIssuedSubscriptionTicket | null
    closeDialog: () => void
}

const TicketDetailDialog = ({ ticket, closeDialog }: TicketDetailDialogProps) => {
    // const [ticketType, setTicketType] = useState<'single-journey' | 'subscription'>('single-journey')

    if (!ticket) return null

    let ticketType: 'single-journey' | 'subscription' = 'single-journey'

    if ('subscriptionTicketId' in ticket) {
        ticketType = 'subscription'
    }

    const singleJourneyColumns: ColumnDef<IIssuedSingleJourneyTicket>[] = [
        {
            accessorKey: 'ticketId',
            header: 'Mã Vé'
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
            accessorKey: 'stations',
            header: () => <div className="text-center">Ga Khởi Hành Và Đích Đến</div>,
            cell: ({ row }) => {
                const entryStation = row.original.entryStation
                const exitStation = row.original.exitStation

                return (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span>{entryStation?.stationName}</span>
                        <FontAwesomeIcon icon={faArrowDown} />
                        <span>{exitStation?.stationName}</span>
                    </div>
                )
            }
        },
        {
            accessorKey: 'price',
            header: () => <div className="text-center">Giá Tiền</div>,
            cell: ({ row }) => {
                const price = row.original.price

                return (
                    <div className="flex justify-center">
                        <div className="table-tag-green">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price! * 1000)}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'method',
            header: () => <div className="text-center">Phương Thức Thanh Toán</div>,
            cell: ({ row }) => {
                const method = row.original.paymentMethod

                return (
                    <div className="flex justify-center">
                        <div className="table-tag-blue">{getMappedPaymentMethod(method!)}</div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'status',
            header: () => <div className="text-center">Trạng Thái Vé</div>,
            cell: ({ row }) => {
                const status = row.original.status

                return (
                    <div className="flex justify-center">
                        <div className="table-tag-pink">{getMappedTicketStatus(status!)}</div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'dates',
            header: 'Ngày Mua',
            cell: ({ row }) => {
                const purchaseDate = row.original.issuedAt
                const expiredAt = row.original.expiredAt
                const paymentTime = row.original.paymentTime

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Ngày mua: </span>
                            {dayjs(purchaseDate).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                        <div>
                            <span className="font-semibold">Hết hạn: </span>
                            {dayjs(expiredAt).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                        <div>
                            <span className="font-semibold">Thanh toán: </span>
                            {paymentTime ? dayjs(paymentTime).format('DD/MM/YYYY HH:mm:ss') : '(Chưa thanh toán)'}
                        </div>
                    </div>
                )
            }
        }
    ]

    const subscriptionColumns: ColumnDef<IIssuedSubscriptionTicket>[] = [
        {
            accessorKey: 'ticketId',
            header: 'Mã Vé'
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
            accessorKey: 'stations',
            header: () => <div className="text-center">Loại Vé</div>,
            cell: ({ row }) => {
                const ticket = row.original.subscriptionTicket

                return (
                    <div className="flex items-center justify-center gap-2">
                        <span>{ticket?.ticketName}</span>
                    </div>
                )
            }
        },
        {
            accessorKey: 'price',
            header: () => <div className="text-center">Giá Tiền</div>,
            cell: ({ row }) => {
                const price = row.original.price

                return (
                    <div className="flex justify-center">
                        <div className="table-tag-green">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price! * 1000)}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'method',
            header: () => <div className="text-center">Phương Thức Thanh Toán</div>,
            cell: ({ row }) => {
                const method = row.original.paymentMethod

                return (
                    <div className="flex justify-center">
                        <div className="table-tag-blue">{getMappedPaymentMethod(method!)}</div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'status',
            header: () => <div className="text-center">Trạng Thái Vé</div>,
            cell: ({ row }) => {
                const status = row.original.status

                return (
                    <div className="flex justify-center">
                        <div className="table-tag-pink">{getMappedTicketStatus(status!)}</div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'dates',
            header: 'Ngày Mua',
            cell: ({ row }) => {
                const purchaseDate = row.original.issuedAt
                const expiredAt = row.original.expiredAt
                const paymentTime = row.original.paymentTime

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Ngày mua: </span>
                            {dayjs(purchaseDate).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                        <div>
                            <span className="font-semibold">Hết hạn: </span>
                            {dayjs(expiredAt).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                        <div>
                            <span className="font-semibold">Thanh toán: </span>
                            {paymentTime ? dayjs(paymentTime).format('DD/MM/YYYY HH:mm:ss') : '(Chưa thanh toán)'}
                        </div>
                    </div>
                )
            }
        }
    ]

    // const tableData = ticket?.order?.reduce((data: any[], order) => {
    //     if (ticketType === 'single-journey') {
    //         data = [
    //             ...data,
    //             ...order.singleJourneyTickets!.map(tk => ({
    //                 ...tk,
    //                 paymentMethod: order.paymentMethod,
    //                 paymentTime: order.paymentTime
    //             }))
    //         ]
    //     } else {
    //         data = [
    //             ...data,
    //             ...order.subscriptionTickets!.map(tk => ({
    //                 ...tk,
    //                 paymentMethod: order.paymentMethod,
    //                 paymentTime: order.paymentTime
    //             }))
    //         ]
    //     }

    //     return data
    // }, [])

    const { order, ...value } = ticket
    const tableData = [{ ...value, paymentTime: ticket.order.paymentTime, paymentMethod: ticket.order.paymentMethod }]

    return (
        <DialogContent className="max-w-[1200px] bg-white">
            <DialogHeader>
                <DialogTitle>Thông tin vé</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="border-b-2"></div>
            <div className="max-h-[400px] overflow-y-auto">
                <DataTable
                    columns={ticketType === 'single-journey' ? singleJourneyColumns : subscriptionColumns}
                    data={tableData ?? []}
                    noDataMessage="Khách hàng chưa từng mua loại vé này."
                />
            </div>
            <div className="border-b-2"></div>
            <DialogFooter>
                <Button text="Đóng" variant="danger" onClick={closeDialog} />
            </DialogFooter>
        </DialogContent>
    )
}

export default TicketDetailDialog
