import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { getMappedPaymentMethod, getMappedTicketStatus } from '@/utils/paymentMethodMapping'
import { QRCodeCanvas } from 'qrcode.react'
import Button from '@/components/common/Button'
import dayjs from 'dayjs'

type MyOrderCardProps = {
    order: IOrder
}

const statusTheme = {
    unpaid: 'bg-pink-100 border-pink-600 text-pink-600',
    paid: 'bg-green-100 border-green-600 text-green-600',
    Cancelled: 'bg-red-100 border-red-600 text-red-600',
    CheckedIn: 'bg-blue-100 border-blue-600 text-blue-600',
    CheckedOut: 'bg-blue-100 border-blue-600 text-blue-600',
    PaymentDone: 'bg-yellow-100 border-yellow-600 text-yellow-600'
}

const MyOrderCard = ({ order }: MyOrderCardProps) => {
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
            header: () => <div className="text-center">Ngày Hết Hạn</div>,
            cell: ({ row }) => {
                const expiredAt = row.original.expiredAt

                return <div className="text-center">{dayjs(expiredAt).format('DD/MM/YYYY HH:mm:ss')}</div>
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
            header: () => <div className="text-center">Ngày Hết Hạn</div>,
            cell: ({ row }) => {
                const expiredAt = row.original.expiredAt

                return <div className="text-center">{dayjs(expiredAt).format('DD/MM/YYYY HH:mm:ss')}</div>
            }
        }
    ]

    return (
        <Accordion type="single" collapsible className="w-full">
            <div className="border-primary flex flex-col gap-3 rounded-2xl border-2 bg-white px-11 py-9">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-accent text-2xl font-semibold">Mã đơn hàng: {order.orderId}</h2>
                        <p className="text-lg">
                            <span className="font-semibold">Ngày đặt:</span>{' '}
                            {dayjs(order.singleJourneyTickets?.[0]?.issuedAt || order.subscriptionTickets?.[0]?.issuedAt).format(
                                'DD/MM/YYYY HH:mm:ss'
                            )}
                        </p>
                    </div>
                    <div
                        className={twMerge(
                            `flex min-w-[160px] items-center justify-center rounded-full border-2 px-5 py-2 font-semibold ${statusTheme[order.paymentTime ? 'paid' : 'unpaid']}`
                        )}
                    >
                        {order.paymentTime ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </div>
                </div>

                <div className="h-1 bg-black/10"></div>
                <div className="flex flex-col gap-3">
                    <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger>
                            <h3 className="text-primary text-xl font-semibold">Các vé được mua</h3>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            <div className="mt-3">
                                {!!order.singleJourneyTickets?.length && (
                                    <DataTable columns={singleJourneyColumns} data={order.singleJourneyTickets!} noDataMessage="" />
                                )}
                                {!!order.subscriptionTickets?.length && (
                                    <DataTable columns={subscriptionColumns} data={order.subscriptionTickets!} noDataMessage="" />
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </div>

                {order.paymentTime && (
                    <>
                        <div className="h-1 bg-black/10"></div>
                        <div className="flex flex-col gap-3">
                            <AccordionItem value="item-3" className="border-none">
                                <AccordionTrigger>
                                    <h3 className="text-primary text-xl font-semibold">Thông tin thanh toán</h3>
                                </AccordionTrigger>
                                <AccordionContent className="p-0">
                                    <p className="mt-3 flex items-center justify-between text-lg">
                                        <span className="font-semibold">Hình thức giao dịch:</span>
                                        {getMappedPaymentMethod(order.paymentMethod!)}
                                    </p>
                                    <p className="mt-3 flex items-center justify-between text-lg">
                                        <span className="font-semibold">Thời gian giao dịch: </span>
                                        {dayjs(order.paymentTime).format('DD/MM/YYYY HH:mm:ss')}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </div>
                    </>
                )}

                <div className="h-1 bg-black/10"></div>
                <div className="flex flex-col gap-3">
                    <h3 className="text-primary text-xl font-semibold">Tổng cộng</h3>
                    <p className="flex items-center justify-between text-lg">
                        <span className="font-semibold">Tổng số lượng vé: </span>
                        {((order.singleJourneyTickets?.length ?? 0) + (order.subscriptionTickets?.length ?? 0)).toString().padStart(2, '0')} vé
                    </p>
                    <p className="flex items-center justify-between text-lg">
                        <span className="font-semibold">Tổng giá trị đơn hàng: </span>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total * 1000)}
                    </p>
                </div>
            </div>
        </Accordion>
    )
}

export default MyOrderCard
