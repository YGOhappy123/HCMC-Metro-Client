import BuySingleJourney from '@/pages/BuyTicketsPage/BuySingleJourney'
import { useState } from 'react'

const BuyTicketsSection = () => {
    const [ticketType, setTicketType] = useState<'single-journey' | 'subscription'>('single-journey')

    return (
        <section className="bg-ivory flex flex-col items-center px-5 py-[100px]">
            <div className="max-w-container flex w-full flex-col gap-9">
                <div className="flex flex-col items-center gap-5">
                    <p className="text-secondary font-semibold tracking-widest uppercase">Mua vé nhanh chóng và tiện lợi</p>
                    <p className="font-serif text-5xl leading-[1.4] font-semibold text-balance">Mua vé nhanh chỉ với vài thao tác đơn giản</p>
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

                {ticketType === 'single-journey' && <BuySingleJourney />}
            </div>
        </section>
    )
}

export default BuyTicketsSection
