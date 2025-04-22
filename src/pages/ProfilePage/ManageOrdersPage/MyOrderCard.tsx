import { twMerge } from 'tailwind-merge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion'
import dayjs from 'dayjs'
import { getMappedPaymentMethod } from '@/utils/paymentMethodMapping'

type MyOrderCardProps = {
    order: IOrder
}

const baseButtonClass =
    'min-w-[120px] rounded-md border-2 border-solid px-6 py-3 font-medium hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
const statusTheme = {
    unpaid: 'bg-pink-100 border-pink-600 text-pink-600',
    paid: 'bg-green-100 border-green-600 text-green-600',
    Cancelled: 'bg-red-100 border-red-600 text-red-600',
    CheckedIn: 'bg-blue-100 border-blue-600 text-blue-600',
    CheckedOut: 'bg-blue-100 border-blue-600 text-blue-600',
    PaymentDone: 'bg-yellow-100 border-yellow-600 text-yellow-600'
}

const MyOrderCard = ({ order }: MyOrderCardProps) => {
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
                            {/* {order.orderRooms.map((room, index) => (
                                <div key={index} className="mt-3 flex flex-col gap-2">
                                    <h4 className="text-secondary text-xl font-semibold">Phòng {(index + 1).toString().padStart(2, '0')}:</h4>
                                    <p className="flex items-center justify-between text-lg">
                                        <span className="font-semibold">Thông tin phòng: </span>
                                        Mã {room!.roomNumber} - Tầng {room!.floor} - Loại {room!.roomClass}
                                    </p>
                                    <p className="flex items-center justify-between text-lg">
                                        <span className="font-semibold">Số khách thuê: </span>
                                        {room.numberOfGuests?.toString().padStart(2, '0')} người
                                    </p>
                                    <p className="flex items-center justify-between text-lg">
                                        <span className="font-semibold">Đơn giá theo ngày: </span>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.unitPrice!)}
                                    </p>
                                    {index !== order.orderRooms.length - 1 && <div className="mt-1 h-0.5 bg-black/10"></div>}
                                </div>
                            ))} */}
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
