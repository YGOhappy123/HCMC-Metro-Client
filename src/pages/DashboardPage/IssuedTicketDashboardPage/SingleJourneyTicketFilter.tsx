import { useEffect, useState } from 'react'
import { PopoverContent } from '@/components/ui/Popover'
import { IssuedSingleJourneyTicketSortAndFilterParams } from '@/services/issuedSingleJourneyTicketService'
import { DateRange } from 'react-day-picker'

import Button from '@/components/common/Button'
import TextInput from '@/components/common/TextInput'
import SelectInput from '@/components/common/SelectInput'
import DateRangePicker from '@/components/common/DateRangePicker'

type SingleJourneyTicketFilterProps = {
    stations: IStation[]
    activeTab: string
    setHavingFilters: (value: any) => void
    onChange: (params: IssuedSingleJourneyTicketSortAndFilterParams) => void
    onSearch: () => void
    onReset: () => void
}

const SingleJourneyTicketFilter = ({ stations, activeTab, setHavingFilters, onChange, onSearch, onReset }: SingleJourneyTicketFilterProps) => {
    const [searchCustomerName, setSearchCustomerName] = useState<string>('')
    const [searchOrderId, setSearchOrderId] = useState<string>('')
    const [searchPrice, setSearchPrice] = useState<string>('')
    const [searchPaymentStatus, setSearchPaymentStatus] = useState<string>('')
    const [searchIssuedStation, setSearchIssuedStation] = useState<number>(0)
    const [searchEntryStation, setSearchEntryStation] = useState<number>(0)
    const [searchExitStation, setSearchExitStation] = useState<number>(0)
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
        onChange({
            searchCustomerName,
            searchOrderId,
            searchPrice,
            searchPaymentStatus,
            searchIssuedStation,
            searchEntryStation,
            searchExitStation,
            sort,
            range
        })
    }, [searchCustomerName, searchOrderId, searchPrice, searchPaymentStatus, searchIssuedStation, searchEntryStation, searchExitStation, sort, range])

    const handleSearch = () => {
        onSearch()

        if (
            !searchCustomerName &&
            !searchOrderId &&
            !searchPrice &&
            !searchPaymentStatus &&
            !searchIssuedStation &&
            !searchEntryStation &&
            !searchExitStation &&
            sort === '-issuedAt' &&
            !range?.length
        ) {
            setHavingFilters(prev => ({ ...prev, [activeTab]: false }))
        } else {
            setHavingFilters(prev => ({ ...prev, [activeTab]: true }))
        }
    }

    const handleReset = () => {
        setSearchCustomerName('')
        setSearchOrderId('')
        setSearchPrice('')
        setSearchPaymentStatus('')
        setSearchIssuedStation(0)
        setSearchEntryStation(0)
        setSearchExitStation(0)
        setSort('-issuedAt')
        setDate(undefined)
        setHavingFilters(prev => ({ ...prev, [activeTab]: false }))
        onReset()
    }

    return (
        <PopoverContent className="w-[400px] bg-white">
            <div className="mb-4 flex items-center justify-between">
                <Button text="Tìm kiếm" variant="gradient" className="border-primary rounded-2xl px-3 py-1.5 text-xs" onClick={handleSearch} />
                <Button text="Đặt lại" variant="danger" className="rounded-2xl px-3 py-1.5 text-xs" onClick={handleReset} />
            </div>
            <form>
                <div className="mb-4">
                    <TextInput
                        fieldName="orderId"
                        placeholder="Lọc theo mã đơn hàng (sau #)"
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
                <div className="relative mb-4 flex justify-around gap-2 rounded border-2 border-neutral-500">
                    <label className="text-primary absolute -top-3 left-2.5 bg-white px-1 text-[13px] font-medium">
                        Lọc theo trạng thái thanh toán
                    </label>
                    <div className="flex items-center gap-1">
                        <input
                            type="radio"
                            id="paid"
                            name="paidStatus"
                            value="paid"
                            onChange={e => setSearchPaymentStatus(e.target.value)}
                            checked={searchPaymentStatus === 'paid'}
                            className="accent-primary h-4 w-4 cursor-pointer"
                        />
                        <label htmlFor="paid" className="cursor-pointer p-2 font-medium text-neutral-500">
                            Đã thanh toán
                        </label>
                    </div>
                    <div className="flex items-center gap-1">
                        <input
                            type="radio"
                            id="unpaid"
                            name="paidStatus"
                            value="unpaid"
                            onChange={e => setSearchPaymentStatus(e.target.value)}
                            checked={searchPaymentStatus === 'unpaid'}
                            className="accent-primary h-4 w-4 cursor-pointer"
                        />
                        <label htmlFor="unpaid" className="cursor-pointer p-2 font-medium text-neutral-500">
                            Chưa thanh toán
                        </label>
                    </div>
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
                    <SelectInput
                        fieldName="entryStation"
                        placeholder="Lọc theo ga đi"
                        options={stations.map(station => ({ value: station.stationId, label: station.stationName }))}
                        error=""
                        value={searchEntryStation}
                        onChange={(value: string | number) => setSearchEntryStation(value as number)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        selectClassName="py-[9px]"
                    />
                </div>
                <div className="mb-4">
                    <SelectInput
                        fieldName="exitStation"
                        placeholder="Lọc theo ga đến"
                        options={stations.map(station => ({ value: station.stationId, label: station.stationName }))}
                        error=""
                        value={searchExitStation}
                        onChange={(value: string | number) => setSearchExitStation(value as number)}
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

export default SingleJourneyTicketFilter
