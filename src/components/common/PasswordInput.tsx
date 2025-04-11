import { HTMLInputAutoCompleteAttribute, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

type PasswordInputProps = {
    fieldName: string
    placeholder: string
    autoComplete?: HTMLInputAutoCompleteAttribute | undefined
    error: string
    value: string
    onChange: (value: string) => void
    onFocus: () => void
}

const PasswordInput = ({ placeholder, fieldName, autoComplete = 'on', error, value, onChange, onFocus }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPw = () => setShowPassword(prev => !prev)

    return (
        <div className="relative">
            <input
                autoComplete={autoComplete}
                type={showPassword ? 'text' : 'password'}
                className="peer text-primary caret-primary focus:border-primary block min-h-[auto] w-full rounded border-2 border-neutral-500 bg-transparent px-3 py-2 pr-12 leading-[2.15] font-medium transition-all duration-200 ease-linear outline-none motion-reduce:transition-none"
                id={fieldName}
                placeholder=" "
                spellCheck={false}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={onFocus}
            />
            <label
                htmlFor={fieldName}
                className="bg-ivory peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary pointer-events-none absolute top-1/2 left-3 mb-0 max-w-[90%] origin-[0_0] -translate-y-1/2 truncate px-1 font-medium text-neutral-500 transition-all duration-200 ease-out peer-focus:top-0.5 peer-focus:scale-[0.8] peer-[:not(:placeholder-shown)]:top-0.5 peer-[:not(:placeholder-shown)]:scale-[0.8] motion-reduce:transition-none"
            >
                {placeholder}
            </label>

            <button type="button" className="text-primary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={toggleShowPw}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="lg" className="mt-1" />
            </button>
            {error && <p className="absolute text-sm font-medium text-red-600">{error}</p>}
        </div>
    )
}

export default PasswordInput
