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

type TicketDialogProps = {
    customer: ICustomer | null
    closeDialog: () => void
}

const TicketDialog = ({ customer, closeDialog }: TicketDialogProps) => {
    const [ticketType, setTicketType] = useState<'single-journey' | 'subscription'>('single-journey')

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
                const purchaseDate = row.original.purchaseDate
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
                        <span>{ticket?.name}</span>
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
                const purchaseDate = row.original.purchaseDate
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

    const tableData = customer?.orders?.reduce((data: any[], order) => {
        if (ticketType === 'single-journey') {
            data = [
                ...data,
                ...order.singleJourneyTickets!.map(tk => ({
                    ...tk,
                    paymentMethod: order.paymentMethod,
                    paymentTime: order.paymentTime
                }))
            ]
        } else {
            data = [
                ...data,
                ...order.subscriptionTickets!.map(tk => ({
                    ...tk,
                    paymentMethod: order.paymentMethod,
                    paymentTime: order.paymentTime
                }))
            ]
        }

        return data
    }, [])

    return (
        <DialogContent className="max-w-[1200px] bg-white">
            <DialogHeader>
                <DialogTitle>Các vé khách hàng đã mua</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="border-b-2"></div>
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
                        id="css"
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

export default TicketDialog
