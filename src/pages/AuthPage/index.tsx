import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { RootState } from '@/store'
import useTitle from '@/hooks/useTitle'
import toastConfig from '@/configs/toast'
import AuthCarousel from '@/components/ui/AuthCarousel'
import LoginForm from '@/pages/AuthPage/LoginForm'
import RegisterForm from '@/pages/AuthPage/RegisterForm'
import ForgotPasswordForm from '@/pages/AuthPage/ForgotPasswordForm'
import ResetPasswordForm from '@/pages/AuthPage/ResetPasswordForm'

export type FormType = 'login' | 'register' | 'forgot' | 'reset'

const AuthPage = () => {
    useTitle('HCMC Metro | Tài Khoản')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { isLogged } = useSelector(
        (state: RootState) => state.auth,
        () => true
    )
    const [query] = useSearchParams()
    const [formType, setFormType] = useState<FormType>('login')

    useEffect(() => {
        if (query.get('type')) {
            setFormType(query.get('type') as FormType)
        }
    }, [query])

    if (isLogged) {
        toast('Bạn đã đăng nhập rồi. Nếu bạn muốn sử dụng một tài khoản khác, vui lòng đăng xuất khỏi tài khoản hiện tại.', toastConfig('info'))
        return <Navigate to="/" />
    } else {
        return (
            <div className="bg-accent flex h-screen w-full items-center justify-center">
                <div className="bg-ivory flex gap-3 rounded-xl p-3">
                    <div className="h-[640px] w-[540px]">
                        <AuthCarousel />
                    </div>

                    <div className="h-[640px] w-[540px]">
                        {formType === 'login' && <LoginForm changeFormType={setFormType} />}
                        {formType === 'register' && <RegisterForm changeFormType={setFormType} />}
                        {formType === 'forgot' && <ForgotPasswordForm changeFormType={setFormType} />}
                        {formType === 'reset' && <ResetPasswordForm changeFormType={setFormType} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthPage
