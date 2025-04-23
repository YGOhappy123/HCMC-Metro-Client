import { useState, useRef, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

type SelectSearchInputProps = {
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

const SelectSearchInput = ({
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
}: SelectSearchInputProps) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase().trim()))

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
                setSearchTerm('') // clear khi click ngoài
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (showDropdown && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [showDropdown])

    const selectedLabel = options.find(option => option.value === value)?.label || '--'

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={() => {
                    setShowDropdown(!showDropdown)
                    onFocus()
                }}
                className={twMerge(
                    `peer text-primary caret-primary focus:border-primary block min-h-[auto] w-full cursor-pointer rounded border-2 border-neutral-500 bg-transparent px-3.5 py-2 leading-[2.15] font-medium transition-all duration-200 ease-linear outline-none motion-reduce:transition-none ${selectClassName}`
                )}
            >
                {selectedLabel}
                <div
                    className={`text-primary pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transition-transform duration-200 ${
                        showDropdown ? 'rotate-180' : 'rotate-0'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {showDropdown && (
                <div className="absolute right-0 left-0 z-10 mt-1 rounded border border-gray-300 bg-white shadow-lg">
                    <input
                        ref={searchInputRef}
                        type="text"
                        className="w-full border-b border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 outline-none"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <ul className="max-h-48 overflow-y-auto text-sm font-medium text-gray-700">
                        {havingDefaultOptions && (
                            <li
                                onClick={() => {
                                    onChange('')
                                    setShowDropdown(false)
                                }}
                                className="cursor-pointer px-3 py-2 text-sm font-medium hover:bg-blue-100"
                            >
                                --
                            </li>
                        )}
                        {filteredOptions.length === 0 && <li className="px-3 py-2 text-gray-400">Không có kết quả</li>}
                        {filteredOptions.map(option => (
                            <li
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value)
                                    setShowDropdown(false)
                                }}
                                className="cursor-pointer px-3 py-2 hover:bg-blue-100"
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
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

export default SelectSearchInput
