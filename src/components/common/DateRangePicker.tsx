import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import { cn } from '@/libs/shadcn-ui'

type DateRangePickerProps = {
    date: DateRange | undefined
    setDate: (value: DateRange | undefined) => void
    className?: string
    triggerClassName?: string
    placeHolder?: string
}

const DateRangePicker = ({ date, setDate, className, triggerClassName, placeHolder }: DateRangePickerProps) => {
    return (
        <div className={cn(`${className}`)}>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        className={cn(
                            `text-primary focus:border-primary flex w-full items-center gap-2 rounded border-2 border-neutral-500 px-3 py-2 leading-[2.15] font-medium ${triggerClassName}`
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'dd LLL, y', { locale: vi })} - {format(date.to, 'dd LLL, y', { locale: vi })}
                                </>
                            ) : (
                                format(date.from, 'dd LLL, y', { locale: vi })
                            )
                        ) : (
                            <span>{placeHolder || 'Lọc theo ngày tạo'}</span>
                        )}
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto bg-white p-0">
                    <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} locale={vi} />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DateRangePicker
