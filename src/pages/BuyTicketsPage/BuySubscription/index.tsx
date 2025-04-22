import { useState } from 'react'
import TicketChoosingForm from '@/pages/BuyTicketsPage/BuySubscription/TicketChoosingForm'
import BuyTicketForm from '@/pages/BuyTicketsPage/BuySubscription/BuyTicketForm'

const BuySubscription = () => {
    const [selectedTicket, setSelectedTicket] = useState<ISubscriptionTicket | null>(null)

    return (
        <>
            <TicketChoosingForm setSelectedTicket={setSelectedTicket} />
            {selectedTicket && (
                <div className="grid grid-cols-3 items-start gap-9">
                    <div className="col-span-2 flex flex-col items-center gap-6 rounded-3xl bg-white p-[50px]">
                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-primary text-3xl font-semibold">Thông tin {selectedTicket.ticketName.toLowerCase()}</h3>
                            <h4 className="text-primary text-2xl font-semibold">
                                Giá tiền:{' '}
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((selectedTicket.price ?? 0) * 1000)}
                            </h4>
                        </div>

                        <div className="flex w-full flex-col gap-3 text-lg">
                            <div className="border-b-2"></div>
                            <div className="flex items-center justify-between">
                                <b>Tên vé</b>
                                <span>{selectedTicket.ticketName}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <b>Số ngày hiệu lực</b>
                                <span>{selectedTicket.validityDays.toString().padStart(2, '0')} ngày</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <b>Yêu cầu khi mua vé</b>
                                <span>{selectedTicket.requirements ?? 'Không có yêu cầu đặc biệt'}</span>
                            </div>
                            <div className="border-b-2"></div>
                        </div>

                        <div className="flex w-full flex-col">
                            <i className="text-lg">
                                <b>Giá vé thời hạn:</b> Giá vé = Giá vé được niêm yết sẵn tại nhà ga.
                            </i>
                            <i className="text-lg">
                                <b>Ngày hết hạn của vé:</b> Ngày hết hạn = Thời điểm mua vé + Thời hạn ghi trên vé.
                            </i>
                            <i className="mt-4 text-lg">
                                <b>Lưu ý:</b> Hiện tại mua vé online chỉ hỗ trợ phương thức ví điện tử VnPay.
                            </i>
                            <i className="text-lg">
                                <b>Lưu ý:</b> Vé thời hạn không giới hạn số lần sử dụng trong thời gian hiệu lực.
                            </i>
                            <i className="text-lg">
                                <b>Lưu ý:</b> Vé thời hạn có thể check-in và check-out ở mọi nhà ga của HCMC Metro.
                            </i>
                            <i className="text-lg">
                                <b>Lưu ý:</b> Vé mua rồi miễn đổi trả, bán lại dưới mọi hình thức.
                            </i>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <BuyTicketForm selectedTicket={selectedTicket} />
                    </div>
                </div>
            )}
        </>
    )
}

export default BuySubscription
