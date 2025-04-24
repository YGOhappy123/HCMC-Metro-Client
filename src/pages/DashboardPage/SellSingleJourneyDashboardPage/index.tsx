import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { SegmentDisplay } from '@/components/ui/SegmentDisplay'
import SellTicketForm from '@/pages/DashboardPage/SellSingleJourneyDashboardPage/SellTicketForm'
import StationsChoosingForm from '@/pages/DashboardPage/SellSingleJourneyDashboardPage/StationsChoosingForm'

const SellSingleJourneyDashboardPage = () => {
    const [path, setPath] = useState<IPath | undefined>(undefined)
    const [entryStation, setEntryStation] = useState<IStation | null>(null)
    const [exitStation, setExitStation] = useState<IStation | null>(null)
    const [method, setMethod] = useState<PaymentMethod>('cash')

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between p-4">
                <h2 className="font-oswald flex items-center gap-4 text-3xl font-bold text-black/30 uppercase">
                    <span>
                        Hỗ trợ mua vé <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span className="text-primary">Vé một chặng</span>
                </h2>
            </div>

            <StationsChoosingForm setPath={setPath} setEntry={setEntryStation} setExit={setExitStation} setMethod={setMethod} />
            {path && (
                <div className="mt-4 grid grid-cols-3 items-start gap-9">
                    <div className="col-span-2 flex flex-col items-center gap-6 rounded-lg border-2 border-[#9C9C9C] bg-white p-[50px]">
                        {path.length > 0 ? (
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="text-primary text-3xl font-semibold">
                                    Lộ trình của bạn gồm {path.length} đoạn và {path.length - 1} lần chuyển tuyến
                                </h3>
                                <h4 className="text-primary text-2xl font-semibold">
                                    Tổng giá tiền:{' '}
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        path.reduce((total, segment) => total + segment.price * 1000, 0)
                                    )}
                                </h4>
                            </div>
                        ) : (
                            <h3 className="text-primary text-3xl font-semibold">Không tìm thấy lộ trình phù hợp giữa 2 ga này</h3>
                        )}

                        {path.length > 0 && path.map((segment, index) => <SegmentDisplay key={index} segment={segment} index={index} />)}

                        <div className="flex w-full flex-col">
                            <i className="text-lg">
                                <b>Giá vé giữa 2 ga khác tuyến:</b> Giá vé = Tổng giá vé các đoạn cùng tuyến.
                            </i>
                            <i className="text-lg">
                                <b>Giá vé giữa 2 ga cùng tuyến:</b> Giá vé = Giá vé được niêm yết sẵn tại nhà ga.
                            </i>
                            <i className="text-lg">
                                <b>Ngày hết hạn của vé:</b> Ngày hết hạn = Thời điểm mua vé + 30 ngày.
                            </i>
                            <i className="mt-4 text-lg">
                                <b>Lưu ý:</b> Vé một chặng chỉ dùng được 1 lần trong thời gian hiệu lực.
                            </i>
                            <i className="text-lg">
                                <b>Lưu ý:</b> Vé một chặng chỉ có thể check-in và check-out ở đúng nhà ga đã mua.
                            </i>
                            <i className="text-lg">
                                <b>Lưu ý:</b> Vé mua rồi miễn đổi trả, bán lại dưới mọi hình thức.
                            </i>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <SellTicketForm
                            entry={entryStation}
                            exit={exitStation}
                            method={method}
                            total={path.reduce((total, segment) => total + segment.price * 1000, 0)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default SellSingleJourneyDashboardPage
