import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import SelectInput from '@/components/common/SelectInput'

type FilterFormProps = {
    axios: AxiosInstance
    handleSearch: () => Promise<void>
    selectedTicket: number
    setSelectedTicket: (value: number) => void
}

const FilterForm = ({ axios, handleSearch, selectedTicket, setSelectedTicket }: FilterFormProps) => {
    const fetchAllTicketsQuery = useQuery({
        queryKey: ['subscription-tickets-all'],
        queryFn: () => axios.get<IResponseData<ISubscriptionTicket[]>>('/tickets/subscription'),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: true,
        select: res => res.data
    })
    const tickets = fetchAllTicketsQuery.data?.data || []

    return (
        <div className="flex h-[98px] w-full gap-10 rounded-lg border-2 border-solid p-5">
            <div className="ml-[10px] grid flex-1 grid-cols-[1fr] items-center text-lg">
                <SelectInput
                    fieldName="ticket"
                    placeholder="Chọn loại vé"
                    options={tickets.map(ticket => ({
                        value: ticket.subscriptionTicketId,
                        label: ticket.ticketName
                    }))}
                    error=""
                    value={selectedTicket}
                    onChange={(value: string | number) => setSelectedTicket(value as number)}
                    onFocus={() => {}}
                    labelClassName="bg-white"
                    selectClassName="py-[9px]"
                />
            </div>

            <div className="border-secondary w-[2px] border-l-2 border-solid"></div>
            <button
                className="bg-primary text-ivory hover:bg-primary/90 flex w-[200px] cursor-pointer items-center justify-center rounded font-semibold tracking-widest uppercase disabled:cursor-not-allowed disabled:border-gray-600 disabled:bg-gray-100 disabled:text-gray-600"
                onClick={handleSearch}
            >
                Xem thông tin
            </button>
        </div>
    )
}

export default FilterForm
