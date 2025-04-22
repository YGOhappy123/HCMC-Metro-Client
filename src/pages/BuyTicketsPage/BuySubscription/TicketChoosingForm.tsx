import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PAYMENT_METHOD_MAPPING } from '@/utils/paymentMethodMapping'
import SelectInput from '@/components/common/SelectInput'
import useAxiosIns from '@/hooks/useAxiosIns'

type TicketChoosingFormProps = {
    setSelectedTicket: (value: ISubscriptionTicket | null) => void
}

const TicketChoosingForm = ({ setSelectedTicket }: TicketChoosingFormProps) => {
    const axios = useAxiosIns()
    const [ticketId, setTicketId] = useState<number>(0)
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('digitalWallet')

    const fetchAllTicketsQuery = useQuery({
        queryKey: ['public-subscription-tickets-all'],
        queryFn: () => axios.get<IResponseData<ISubscriptionTicket[]>>('/tickets/public-subscription'),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: true,
        select: res => res.data
    })
    const tickets = fetchAllTicketsQuery.data?.data || []

    return (
        <div className="flex h-[98px] w-full gap-10 rounded-full border-2 border-solid border-[#9C9C9C] bg-[#FFFBF2] p-5 text-[#4D4D4D]">
            <div className="ml-[10px] grid flex-2 grid-cols-[1fr] items-center text-lg">
                <SelectInput
                    fieldName="ticket"
                    placeholder="Chọn vé cần tra cứu"
                    options={tickets.map(ticket => ({ value: ticket.subscriptionTicketId, label: ticket.ticketName }))}
                    error=""
                    value={ticketId}
                    onChange={(value: string | number) => setTicketId(value as number)}
                    onFocus={() => {}}
                    labelClassName="bg-[#FFFBF2]"
                    selectClassName="py-[9px] rounded-md"
                />
            </div>
            <div className="border-secondary w-[2px] border-l-2 border-solid"></div>
            <div className="grid flex-1 grid-cols-[1fr] items-center text-lg">
                <SelectInput
                    fieldName="station"
                    placeholder="Chọn phương thức thanh toán"
                    options={[
                        {
                            value: 'digitalWallet',
                            label: PAYMENT_METHOD_MAPPING['digitalWallet']
                        }
                    ]}
                    error=""
                    value={paymentMethod}
                    havingDefaultOptions={false}
                    onChange={(value: string | number) => setPaymentMethod(value as PaymentMethod)}
                    onFocus={() => {}}
                    labelClassName="bg-[#FFFBF2]"
                    selectClassName="py-[9px] rounded-md"
                    disabled
                />
            </div>
            <button
                className="bg-primary text-ivory hover:bg-primary/90 flex w-[200px] cursor-pointer items-center justify-center rounded-full font-semibold tracking-widest uppercase disabled:cursor-not-allowed disabled:border-gray-600 disabled:bg-gray-100 disabled:text-gray-600"
                onClick={() => setSelectedTicket(tickets.find(ticket => ticket.subscriptionTicketId === Number(ticketId)) || null)}
                disabled={!ticketId}
            >
                Xem thông tin
            </button>
        </div>
    )
}
export default TicketChoosingForm
