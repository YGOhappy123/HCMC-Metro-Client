import { twMerge } from 'tailwind-merge'

type SelectInputProps = {
    fieldName: string
    placeholder: string
    value: string | number
    error: string
    options: { value: string | number; label: string }[]
    onChange: (value: string | number) => void
    onFocus: () => void
    havingDefaultOptions?: boolean
    selectClassName?: string
    labelClassName?: string
}

const SelectInput = ({
    fieldName,
    placeholder,
    value,
    error,
    options,
    onChange,
    onFocus,
    havingDefaultOptions = true,
    selectClassName,
    labelClassName
}: SelectInputProps) => {
    return (
        <div className="relative">
            <select
                className={twMerge(
                    `peer text-primary caret-primary focus:border-primary block min-h-[auto] w-full cursor-pointer rounded border-2 border-neutral-500 bg-transparent px-3 py-3.5 leading-[2.15] font-medium transition-all duration-200 ease-linear outline-none motion-reduce:transition-none ${selectClassName}`
                )}
                id={fieldName}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={onFocus}
            >
                {havingDefaultOptions && <option value="">--</option>}
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label
                htmlFor={fieldName}
                className={twMerge(
                    `bg-ivory peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary pointer-events-none absolute top-1/2 left-3 mb-0 max-w-[90%] origin-[0_0] -translate-y-1/2 truncate px-1 font-medium text-neutral-500 transition-all duration-200 ease-out peer-focus:top-0.5 peer-focus:scale-[0.8] peer-[:not(:placeholder-shown)]:top-0.5 peer-[:not(:placeholder-shown)]:scale-[0.8] motion-reduce:transition-none ${labelClassName}`
                )}
            >
                {placeholder}
            </label>
            {error && <p className="absolute text-sm font-medium text-red-600">{error}</p>}
        </div>
    )
}

export default SelectInput
