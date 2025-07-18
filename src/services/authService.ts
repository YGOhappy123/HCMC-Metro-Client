import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import { onError } from '@/utils/errorsHandler'
import { setLogged, setUser } from '@/slices/authSlice'
import { getMappedMessage } from '@/utils/resMessageMapping'
import useAxiosIns from '@/hooks/useAxiosIns'
import cookies from '@/libs/cookies'
import toastConfig from '@/configs/toast'

interface LoginResponse {
    user: IUser
    accessToken: string
    refreshToken: string
}

const authService = () => {
    const axios = useAxiosIns()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: (account: { username: string; password: string }) => axios.post<IResponseData<LoginResponse>>('/auth/login', account),
        onError: onError,
        onSuccess: res => {
            const redirectPath = cookies.get('redirect_path') || '/'
            const { user, accessToken, refreshToken } = res.data.data
            cookies.set('access_token', accessToken, { path: '/', expires: new Date(dayjs(Date.now()).add(30, 'day').toISOString()) })
            cookies.set('refresh_token', refreshToken, { path: '/', expires: new Date(dayjs(Date.now()).add(30, 'day').toISOString()) })

            navigate(redirectPath as string)
            dispatch(setLogged(true))
            dispatch(setUser(user))
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const registerMutation = useMutation({
        mutationFn: (data: { fullName: string; username: string; password: string; confirmPassword: string }) =>
            axios.post<IResponseData<LoginResponse>>('/auth/register', data),
        onError: onError,
        onSuccess: res => {
            const redirectPath = cookies.get('redirect_path') || '/'
            const { user, accessToken, refreshToken } = res.data.data
            cookies.set('access_token', accessToken, { path: '/', expires: new Date(dayjs(Date.now()).add(30, 'day').toISOString()) })
            cookies.set('refresh_token', refreshToken, { path: '/', expires: new Date(dayjs(Date.now()).add(30, 'day').toISOString()) })

            navigate(redirectPath as string)
            dispatch(setLogged(true))
            dispatch(setUser(user))
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const forgotPasswordMutation = useMutation({
        mutationFn: ({ email }: { email: string }) => axios.post<IResponseData<LoginResponse>>('/auth/forgot-password', { email }),
        onError: onError,
        onSuccess: res => {
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const resetPasswordMutation = useMutation({
        mutationFn: (data: { token: string; password: string; confirmPassword: string }) =>
            axios.post<IResponseData<any>>('/auth/reset-password', data),
        onError: onError,
        onSuccess: res => {
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const updatePasswordMutation = useMutation({
        mutationFn: ({ oldPassword, newPassword, confirmPassword }: { oldPassword: string; newPassword: string; confirmPassword: string }) =>
            axios.post<IResponseData<any>>('/auth/change-password', { oldPassword, newPassword, confirmPassword }),
        onError: onError,
        onSuccess: res => {
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const googleAuthMutation = useMutation({
        mutationFn: (googleAccessToken: string) => axios.post('/auth/google-auth', { googleAccessToken }),
        onError: onError,
        onSuccess: res => {
            const redirectPath = cookies.get('redirect_path') || '/'
            const { user, accessToken, refreshToken } = res.data.data
            cookies.set('access_token', accessToken, { path: '/', expires: new Date(dayjs(Date.now()).add(30, 'day').toISOString()) })
            cookies.set('refresh_token', refreshToken, { path: '/', expires: new Date(dayjs(Date.now()).add(30, 'day').toISOString()) })

            navigate(redirectPath as string)
            dispatch(setLogged(true))
            dispatch(setUser(user))
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    return {
        loginMutation,
        registerMutation,
        forgotPasswordMutation,
        resetPasswordMutation,
        updatePasswordMutation,
        googleAuthMutation
    }
}

export default authService
