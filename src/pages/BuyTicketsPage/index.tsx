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
import BuyTicketsSection from '@/pages/BuyTicketsPage/BuyTicketsSection'

const BuyTicketsPage = () => {
    useTitle('HCMC Metro | Mua Vé')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <div>
            <BuyTicketsSection />
        </div>
    )
}

export default BuyTicketsPage
