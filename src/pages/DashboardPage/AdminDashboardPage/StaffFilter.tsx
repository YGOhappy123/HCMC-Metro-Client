import { useEffect, useState } from 'react'
import { PopoverContent } from '@/components/ui/Popover'
import { StaffSortAndFilterParams } from '@/services/staffService'
import { DateRange } from 'react-day-picker'

import Button from '@/components/common/Button'
import TextInput from '@/components/common/TextInput'
import SelectInput from '@/components/common/SelectInput'
import DateRangePicker from '@/components/common/DateRangePicker'

type StaffFilterProps = {
    stations: IStation[]
    setHavingFilters: (value: boolean) => void
    onChange: (params: StaffSortAndFilterParams) => void
    onSearch: () => void
    onReset: () => void
}

const StaffFilter = ({ stations, setHavingFilters, onChange, onSearch, onReset }: StaffFilterProps) => {
    const [searchName, setSearchName] = useState<string>('')
    const [searchEmail, setSearchEmail] = useState<string>('')
    const [searchPhoneNumber, setSearchPhoneNumber] = useState<string>('')
    const [searchStation, setSearchStation] = useState<number>(0)
    const [searchIsWorking, setSearchIsWorking] = useState<string | undefined>(undefined)
    const [range, setRange] = useState<string[] | any[]>()
    const [sort, setSort] = useState<string>('-createdAt')
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
        onChange({ searchName, searchEmail, searchPhoneNumber, searchStation, searchIsWorking, sort, range })
    }, [searchName, searchEmail, searchPhoneNumber, searchStation, searchIsWorking, sort, range])

    const handleSearch = () => {
        onSearch()

        if (!searchName && !searchEmail && !searchPhoneNumber && !searchStation && !searchIsWorking && sort === '-createdAt' && !range?.length) {
            setHavingFilters(false)
        } else {
            setHavingFilters(true)
        }
    }

    const handleReset = () => {
        setSearchName('')
        setSearchEmail('')
        setSearchPhoneNumber('')
        setSearchStation(0)
        setSearchIsWorking(undefined)
        setSort('-createdAt')
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
                    <TextInput
                        fieldName="name"
                        placeholder="Lọc theo tên"
                        error=""
                        value={searchName}
                        onChange={(value: string) => setSearchName(value)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        inputClassName="leading-2"
                    />
                </div>
                <div className="mb-4">
                    <TextInput
                        fieldName="email"
                        placeholder="Lọc theo email"
                        error=""
                        value={searchEmail}
                        onChange={(value: string) => setSearchEmail(value)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        inputClassName="leading-2"
                    />
                </div>
                <div className="mb-4">
                    <TextInput
                        fieldName="phoneNumber"
                        placeholder="Lọc theo số điện thoại"
                        error=""
                        value={searchPhoneNumber}
                        onChange={(value: string) => setSearchPhoneNumber(value)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        inputClassName="leading-2"
                    />
                </div>
                <div className="mb-4">
                    <DateRangePicker date={date} setDate={setDate} triggerClassName="leading-normal" placeHolder="Lọc theo ngày vào làm" />
                </div>
                <div className="mb-4">
                    <SelectInput
                        fieldName="station"
                        placeholder="Lọc theo ga công tác"
                        options={stations.map(station => ({ value: station.stationId, label: station.stationName }))}
                        error=""
                        value={searchStation}
                        onChange={(value: string | number) => setSearchStation(value as number)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        selectClassName="py-[9px]"
                    />
                </div>
                <div className="mb-4">
                    <SelectInput
                        fieldName="isWorking"
                        placeholder="Lọc theo trạng thái làm việc"
                        options={[
                            { value: 'true', label: 'Còn làm việc' },
                            { value: 'false', label: 'Đã nghỉ' }
                        ]}
                        error=""
                        value={searchIsWorking ?? ''}
                        onChange={(value: string | number) => setSearchIsWorking(value as string)}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        selectClassName="py-[9px]"
                    />
                </div>
                <div>
                    <SelectInput
                        fieldName="sort"
                        placeholder="Sắp xếp theo"
                        options={[
                            { value: '-createdAt', label: 'Ngày tạo giảm dần' },
                            { value: '+createdAt', label: 'Ngày tạo tăng dần' }
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

export default StaffFilter
