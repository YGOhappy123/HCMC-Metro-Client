import { useEffect, useState } from 'react'
import { PopoverContent } from '@/components/ui/Popover'
import { DateRange } from 'react-day-picker'

import Button from '@/components/common/Button'
import SelectInput from '@/components/common/SelectInput'
import DateRangePicker from '@/components/common/DateRangePicker'
import SelectSearchInput from '@/components/common/SelectSearchInput'
import { TripSortAndFilterParams } from '@/services/tripService'

type TripFilterProps = {
    stations: IStation[]
    subscriptionTickets: ISubscriptionTicket[]
    setHavingFilters: (value: any) => void
    onChange: (params: TripSortAndFilterParams) => void
    onSearch: () => void
    onReset: () => void
}

const TripFilter = ({ stations, subscriptionTickets, setHavingFilters, onChange, onSearch, onReset }: TripFilterProps) => {
    const [searchTicketId, setSearchTicketId] = useState<string>('')
    const [searchEntryStation, setSearchEntryStation] = useState<number>(0)
    const [searchExitStation, setSearchExitStation] = useState<number>(0)
    const [rangeEntry, setRangeEntry] = useState<string[] | any[]>()
    const [rangeExit, setRangeExit] = useState<string[] | any[]>()
    const [sort, setSort] = useState<string>('-entryTime')
    const [dateEntry, setDateEntry] = useState<DateRange | undefined>(undefined)
    const [dateExit, setDateExit] = useState<DateRange | undefined>(undefined)

    useEffect(() => {
        if (dateEntry) {
            const dateEntryRange = [dateEntry.from]
            if (dateEntry.to) dateEntryRange.push(dateEntry.to)

            setRangeEntry(dateEntryRange)
        } else {
            setRangeEntry([])
        }
    }, [dateEntry])

    useEffect(() => {
        if (dateExit) {
            const dateExitRange = [dateExit.from]
            if (dateExit.to) dateExitRange.push(dateExit.to)

            setRangeExit(dateExitRange)
        } else {
            setRangeExit([])
        }
    }, [dateExit])

    useEffect(() => {
        onChange({ searchEntryStation, searchExitStation, sort, rangeEntry, rangeExit })
    }, [searchEntryStation, searchExitStation, sort, rangeEntry, rangeExit])

    const handleSearch = () => {
        onSearch()

        if (!searchEntryStation && !searchExitStation && sort === '-entryTime' && !rangeEntry?.length && !rangeExit?.length) {
            setHavingFilters(false)
        } else {
            setHavingFilters(true)
        }
    }

    const handleReset = () => {
        setSearchEntryStation(0)
        setSearchExitStation(0)
        setSort('-entryTime')
        setDateEntry(undefined)
        setDateExit(undefined)
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
                        fieldName="orderId"
                        placeholder="Lọc theo mã vé"
                        error=""
                        value={searchTicketId}
                        onChange={(value: string) => setSearchTicketId(value)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        inputClassName="leading-2"
                    />
                </div> */}
                {/* <div className="mb-4">
                    <SelectInput
                        fieldName="ticketType"
                        placeholder="Lọc theo loại vé"
                        options={subscriptionTickets.map(ticket => ({ value: ticket.subscriptionTicketId, label: ticket.ticketName }))}
                        error=""
                        value={
                        onChange={(value: string | number) => setSearchSubscriptionTicket(value as number)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        selectClassName="py-[9px]"
                    />
                </div> */}
                <div className="mb-4">
                    <SelectSearchInput
                        fieldName="checkinStation"
                        placeholder="Lọc theo ga check-in"
                        options={stations.map(station => ({ value: station.stationId, label: station.stationName }))}
                        error=""
                        value={searchEntryStation}
                        onChange={(value: string | number) => setSearchEntryStation(value as number)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        selectClassName="py-[3px]"
                    />
                </div>
                <div className="mb-4">
                    <SelectSearchInput
                        fieldName="checkoutStation"
                        placeholder="Lọc theo ga checkout"
                        options={stations.map(station => ({ value: station.stationId, label: station.stationName }))}
                        error=""
                        value={searchExitStation}
                        onChange={(value: string | number) => setSearchExitStation(value as number)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        selectClassName="py-[3px]"
                    />
                </div>
                <div className="mb-4">
                    <DateRangePicker date={dateEntry} setDate={setDateEntry} triggerClassName="leading-normal" placeHolder="Lọc theo ngày check-in" />
                </div>
                <div className="mb-4">
                    <DateRangePicker date={dateExit} setDate={setDateExit} triggerClassName="leading-normal" placeHolder="Lọc theo ngày check-out" />
                </div>
                <div>
                    <SelectInput
                        fieldName="sort"
                        placeholder="Sắp xếp theo"
                        options={[
                            { value: '-entryTime', label: 'Ngày check-in giảm dần' },
                            { value: '+entryTime', label: 'Ngày check-in tăng dần' },
                            { value: '-exitTime', label: 'Ngày check-out giảm dần' },
                            { value: '+exitTime', label: 'Ngày check-out tăng dần' }
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

export default TripFilter
