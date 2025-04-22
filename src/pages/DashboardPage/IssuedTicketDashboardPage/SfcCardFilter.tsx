import { useEffect, useState } from 'react'
import { PopoverContent } from '@/components/ui/Popover'
import { IssuedSfcCardSortAndFilterParams } from '@/services/issuedSfcCardService'
import { DateRange } from 'react-day-picker'

import Button from '@/components/common/Button'
import TextInput from '@/components/common/TextInput'
import SelectInput from '@/components/common/SelectInput'
import DateRangePicker from '@/components/common/DateRangePicker'

type SfcCardFilterProps = {
    stations: IStation[]
    setHavingFilters: (value: boolean) => void
    onChange: (params: IssuedSfcCardSortAndFilterParams) => void
    onSearch: () => void
    onReset: () => void
}

const SfcCardFilter = ({ stations, setHavingFilters, onChange, onSearch, onReset }: SfcCardFilterProps) => {
    const [searchIssuedStation, setSearchIssuedStation] = useState<number>(0)
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
        onChange({ searchIssuedStation, sort, range })
    }, [searchIssuedStation, sort, range])

    const handleSearch = () => {
        onSearch()

        if (!searchIssuedStation && sort === '-issuedAt' && !range?.length) {
            setHavingFilters(false)
        } else {
            setHavingFilters(true)
        }
    }

    const handleReset = () => {
        setSearchIssuedStation(0)
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

export default SfcCardFilter
