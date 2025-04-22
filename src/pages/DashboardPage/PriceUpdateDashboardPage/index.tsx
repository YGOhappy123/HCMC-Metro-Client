import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import UpdateSingleJourney from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSingleJourney'
import UpdateSubscription from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSubscription'

const PriceUpdateDashboardPage = () => {
    const [ticketType, setTicketType] = useState<'single-journey' | 'subscription'>('single-journey')

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between p-4">
                <h2 className="font-oswald flex items-center gap-4 text-3xl font-bold text-black/30 uppercase">
                    <span>
                        Quản lý hệ thống <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span className="text-primary">Cập nhật giá vé</span>
                </h2>
            </div>

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
                        id="subscription"
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

            {ticketType === 'single-journey' && <UpdateSingleJourney />}
            {ticketType === 'subscription' && <UpdateSubscription />}
        </div>
    )
}

export default PriceUpdateDashboardPage
