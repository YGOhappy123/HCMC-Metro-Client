import { FormEvent, useState } from 'react'
import { FormType } from '@/pages/AuthPage'
import TextInput from '@/components/common/TextInput'
import PasswordInput from '@/components/common/PasswordInput'
import Button from '@/components/common/Button'
import GoogleAuthButton from '@/pages/AuthPage/GoogleAuthButton'
import authService from '@/services/authService'

type RegisterFormProps = {
    changeFormType: (type: FormType) => void
}

const RegisterForm = ({ changeFormType }: RegisterFormProps) => {
    const [formValues, setFormValues] = useState({
        fullName: '',
        username: '',
        password: '',
        cfPassword: ''
    })

    const [errors, setErrors] = useState({
        fullName: '',
        username: '',
        password: '',
        cfPassword: ''
    })

    const { registerMutation } = authService()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formErrors = validateFormValues()

        if (!formErrors.fullName && !formErrors.username && !formErrors.password && !formErrors.cfPassword) {
            await registerMutation.mutateAsync({
                fullName: formValues.fullName,
                username: formValues.username,
                password: formValues.password,
                confirmPassword: formValues.cfPassword
            })
        } else {
            setErrors(formErrors)
        }
    }

    const validateFormValues = () => {
        const { fullName, username, password, cfPassword } = formValues
        const formErrors = { ...errors }

        if (!fullName.trim()) formErrors.fullName = formErrors.fullName || 'Họ và tên không được để trống.'
        if (!username.trim()) formErrors.username = formErrors.username || 'Tên đăng nhập không được để trống.'
        if (username.length < 8 || username.length > 20) formErrors.username = formErrors.username || 'Tên đăng nhập phải dài từ 8 đến 20 ký tự.'
        if (!password.trim()) formErrors.password = formErrors.password || 'Mật khẩu không được để trống.'
        if (password.length < 8 || password.length > 20) formErrors.password = formErrors.password || 'Mật khẩu phải dài từ 8 đến 20 ký tự.'
        if (cfPassword !== password) formErrors.cfPassword = formErrors.cfPassword || 'Mật khẩu không trùng khớp.'

        return formErrors
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col px-5 py-7">
            <h2 className="text-primary mb-10 text-center text-4xl font-medium">Đăng Ký Tài Khoản</h2>

            <div className="mb-10">
                <TextInput
                    fieldName="fullName"
                    placeholder="Họ và tên"
                    error={errors.fullName}
                    value={formValues.fullName}
                    onChange={(value: string) => setFormValues(prev => ({ ...prev, fullName: value }))}
                    onFocus={() => setErrors(prev => ({ ...prev, fullName: '' }))}
                />
            </div>

            <div className="mb-10">
                <TextInput
                    fieldName="username"
                    placeholder="Tên đăng nhập"
                    autoComplete="username"
                    error={errors.username}
                    value={formValues.username}
                    onChange={(value: string) => setFormValues(prev => ({ ...prev, username: value }))}
                    onFocus={() => setErrors(prev => ({ ...prev, username: '' }))}
                />
            </div>

            <div className="mb-10 grid grid-cols-2 gap-3">
                <PasswordInput
                    fieldName="password"
                    placeholder="Mật khẩu"
                    autoComplete="new-password"
                    error={errors.password}
                    value={formValues.password}
                    onChange={(value: string) => setFormValues(prev => ({ ...prev, password: value }))}
                    onFocus={() => setErrors(prev => ({ ...prev, password: '' }))}
                />
                <PasswordInput
                    fieldName="cfPassword"
                    placeholder="Xác nhận mật khẩu"
                    error={errors.cfPassword}
                    value={formValues.cfPassword}
                    onChange={(value: string) => setFormValues(prev => ({ ...prev, cfPassword: value }))}
                    onFocus={() => setErrors(prev => ({ ...prev, cfPassword: '' }))}
                />
            </div>

            <div className="flex flex-col items-center">
                <Button text="Đăng Ký" type="submit" variant="gradient" className="w-full rounded font-semibold capitalize" />

                <div className="mt-10 w-full">
                    <div className="relative border-t border-[#101319]">
                        <span className="bg-ivory absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 font-medium text-[#101319]">
                            Hoặc đăng ký bằng
                        </span>
                    </div>
                    <GoogleAuthButton text="Đăng ký bằng tài khoản Google" />
                </div>

                <div className="mt-6">
                    <span className="font-medium">Đã có tài khoản? </span>
                    <span className="text-primary cursor-pointer font-bold hover:underline" onClick={() => changeFormType('login')}>
                        Đăng nhập
                    </span>
                </div>
            </div>
        </form>
    )
}

export default RegisterForm
