import { useEffect, useState } from 'react'
import { PopoverContent } from '@/components/ui/Popover'
import { IssuedSubscriptionTicketSortAndFilterParams } from '@/services/issuedSubscriptionTicketService'
import { DateRange } from 'react-day-picker'

import Button from '@/components/common/Button'
import TextInput from '@/components/common/TextInput'
import SelectInput from '@/components/common/SelectInput'
import DateRangePicker from '@/components/common/DateRangePicker'

type SubscriptionTicketFilterProps = {
    stations: IStation[]
    subscriptionTickets: ISubscriptionTicket[]
    setHavingFilters: (value: boolean) => void
    onChange: (params: IssuedSubscriptionTicketSortAndFilterParams) => void
    onSearch: () => void
    onReset: () => void
}

const SubscriptionTicketFilter = ({
    stations,
    subscriptionTickets,
    setHavingFilters,
    onChange,
    onSearch,
    onReset
}: SubscriptionTicketFilterProps) => {
    const [searchCustomerName, setSearchCustomerName] = useState<string>('')
    const [searchOrderId, setSearchOrderId] = useState<string>('')
    const [searchPrice, setSearchPrice] = useState<string>('')
    const [searchIssuedStation, setSearchIssuedStation] = useState<number>(0)
    const [searchSubscriptionTicket, setSearchSubscriptionTicket] = useState<number>(0)
    const [range, setRange] = useState<string[] | any[]>()
    const [sort, setSort] = useState<string>('-issuedAt')
    const [date, setDate] = useState<DateRange | undefined>(undefined)

    useEffect(() => {
        if (date) {
            const dateRange = [date.from]
            if (date.to) dateRange.push(date.to)

            setRange(dateRange)
        } else {
            setRange([])
        }
    }, [date])

    useEffect(() => {
        onChange({ searchCustomerName, searchOrderId, searchPrice, searchIssuedStation, searchSubscriptionTicket, sort, range })
    }, [searchCustomerName, searchOrderId, searchPrice, searchIssuedStation, searchSubscriptionTicket, sort, range])

    const handleSearch = () => {
        onSearch()

        if (!searchCustomerName && !searchOrderId && !searchPrice && !searchIssuedStation && sort === '-issuedAt' && !range?.length) {
            setHavingFilters(false)
        } else {
            setHavingFilters(true)
        }
    }

    const handleReset = () => {
        setSearchCustomerName('')
        setSearchOrderId('')
        setSearchPrice('')
        setSearchIssuedStation(0)
        setSearchSubscriptionTicket(0)
        setSort('-issuedAt')
        setDate(undefined)
        setHavingFilters(false)
        onReset()
    }

    return (
        <PopoverContent className="w-[400px] bg-white">
            <div className="mb-4 flex items-center justify-between">
                <Button text="Tìm kiếm" variant="gradient" className="border-primary rounded-2xl px-3 py-1.5 text-xs" onClick={handleSearch} />
                <Button text="Đặt lại" variant="danger" className="rounded-2xl px-3 py-1.5 text-xs" onClick={handleReset} />
            </div>
            <form>
                {/* <div className="mb-4">
                    <TextInput
                        fieldName="name"
                        placeholder="Lọc theo tên khách hàng"
                        error=""
                        value={searchCustomerName}
                        onChange={(value: string) => setSearchCustomerName(value)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        inputClassName="leading-2"
                    />
                </div> */}
                <div className="mb-4">
                    <TextInput
                        fieldName="orderId"
                        placeholder="Lọc theo mã đơn hàng"
                        error=""
                        value={searchOrderId}
                        onChange={(value: string) => setSearchOrderId(value)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        inputClassName="leading-2"
                    />
                </div>
                <div className="mb-4">
                    <TextInput
                        fieldName="price"
                        placeholder="Lọc theo giá vé (x 1000 VND)"
                        error=""
                        value={searchPrice}
                        onChange={(value: string) => setSearchPrice(value)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        inputClassName="leading-2"
                    />
                </div>
                <div className="mb-4">
                    <SelectInput
                        fieldName="subscriptionTicket"
                        placeholder="Lọc theo loại vé"
                        options={subscriptionTickets.map(ticket => ({ value: ticket.subscriptionTicketId, label: ticket.ticketName }))}
                        error=""
                        value={searchSubscriptionTicket}
                        onChange={(value: string | number) => setSearchSubscriptionTicket(value as number)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        selectClassName="py-[9px]"
                    />
                </div>
                <div className="mb-4">
                    <SelectInput
                        fieldName="issuedStation"
                        placeholder="Lọc theo ga mua vé"
                        options={stations.map(station => ({ value: station.stationId, label: station.stationName }))}
                        error=""
                        value={searchIssuedStation}
                        onChange={(value: string | number) => setSearchIssuedStation(value as number)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        selectClassName="py-[9px]"
                    />
                </div>
                <div className="mb-4">
                    <DateRangePicker date={date} setDate={setDate} triggerClassName="leading-normal" placeHolder="Lọc theo ngày mua" />
                </div>
                <div>
                    <SelectInput
                        fieldName="sort"
                        placeholder="Sắp xếp theo"
                        options={[
                            { value: '-issuedAt', label: 'Ngày mua giảm dần' },
                            { value: '+issuedAt', label: 'Ngày mua tăng dần' }
                        ]}
                        error=""
                        value={sort}
                        onChange={(value: string | number) => setSort(value as string)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        selectClassName="py-[9px]"
                    />
                </div>
            </form>
        </PopoverContent>
    )
}

export default SubscriptionTicketFilter
