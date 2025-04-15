import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import { cn } from '@/libs/shadcn-ui'

type DatePickerProps = {
    disabled?: boolean
    date: Date | undefined
    setDate: (value: Date | undefined) => void
    error?: string
    onFocus?: () => void
    className?: string
    triggerClassName?: string
    placeHolder?: string
}

const DatePicker = ({ disabled = false, date, setDate, error = '', onFocus = ()=> {}, className, triggerClassName, placeHolder }: DatePickerProps) => {
    return (
        <div className={cn(`${className}`)}>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        disabled={disabled}
                        onFocus={onFocus}
                        className={cn(
                            `text-primary focus:border-primary flex w-full items-center gap-2 rounded border-2 border-neutral-500 px-3 py-2 leading-[2.15] font-medium ${triggerClassName}`
                        )}
                    >
                        <CalendarIcon />
                        {date ? format(date, 'dd LLL, y', { locale: vi }) : <span>{placeHolder || 'Chọn ngày tạo'}</span>}
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={vi} className='rounded-lg bg-white' />
                </PopoverContent>
            </Popover>
            {error && <p className="absolute text-sm font-medium text-red-600">{error}</p>}
        </div>
    )
}

export default DatePicker
