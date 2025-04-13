import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setUser } from '@/slices/authSlice'
import customerService from '@/services/customerService'
import staffService from '@/services/staffService'
import adminService from '@/services/adminService'
import useTitle from '@/hooks/useTitle'
import TextInput from '@/components/common/TextInput'
import Button from '@/components/common/Button'

const EditProfilePage = () => {
    useTitle('HCMC Metro | Hồ Sơ')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const { updateCustomerMutation } = customerService({ enableFetching: false })
    const { updateStaffMutation } = staffService({ enableFetching: false })
    const { updateAdminMutation } = adminService({ enableFetching: false })

    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    })

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    })

    useEffect(() => {
        setDefaultFormValues()
    }, [user])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formErrors = validateFormValues()

        if (!formErrors.fullName && !formErrors.email && !formErrors.phoneNumber) {
            if (user.role === 'customer') {
                updateCustomerMutation
                    .mutateAsync({
                        data: {
                            ...formValues,
                            email: formValues.email || undefined,
                            phoneNumber: formValues.phoneNumber || undefined
                        }
                    })
                    .then(() => updateAuthUser())
                    .catch(() => setDefaultFormValues())
            } else if (user.role === 'staff') {
                updateStaffMutation
                    .mutateAsync({ staffId: user.userId, data: { ...formValues } })
                    .then(() => updateAuthUser())
                    .catch(() => setDefaultFormValues())
            } else {
                updateAdminMutation
                    .mutateAsync({ data: { ...formValues } })
                    .then(() => updateAuthUser())
                    .catch(() => setDefaultFormValues())
            }
        } else {
            setErrors(formErrors)
        }
    }

    const updateAuthUser = () => {
        const newUserData = { ...user }
        newUserData.fullName = formValues.fullName
        newUserData.email = formValues.email
        newUserData.phoneNumber = formValues.phoneNumber

        dispatch(setUser(newUserData as IUser))
    }

    const validateFormValues = () => {
        const { fullName, email, phoneNumber } = formValues
        const formErrors = { ...errors }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

        if (!fullName.trim()) formErrors.fullName = formErrors.fullName || 'Họ và tên không được để trống.'
        if (user.role !== 'customer' && !email.trim()) formErrors.email = formErrors.email || 'Địa chỉ email không được để trống.'
        if (email.trim() && !emailRegex.test(email)) formErrors.email = formErrors.email || 'Địa chỉ email của bạn không hợp lệ.'
        if (user.role !== 'customer' && !phoneNumber.trim()) formErrors.phoneNumber = formErrors.phoneNumber || 'Số điện thoại không được để trống.'
        if (phoneNumber.trim() && !phoneRegex.test(phoneNumber))
            formErrors.phoneNumber = formErrors.phoneNumber || 'Số điện thoại của bạn không hợp lệ.'

        return formErrors
    }

    const setDefaultFormValues = () => {
        setFormValues({
            fullName: user.fullName,
            email: user?.email ?? '',
            phoneNumber: user?.phoneNumber ?? ''
        })
    }

    return (
        <div className="w-full lg:w-auto lg:flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <h3 className="font-oswald text-primary -mb-4 text-4xl leading-[50px] uppercase">Chi tiết tài khoản</h3>
                <TextInput
                    fieldName="fullName"
                    placeholder="Họ và tên"
                    error={errors.fullName}
                    value={formValues.fullName}
                    disabled={user.role === 'staff'}
                    onChange={(value: string) => setFormValues(prev => ({ ...prev, fullName: value }))}
                    onFocus={() => setErrors(prev => ({ ...prev, fullName: '' }))}
                />
                <TextInput
                    fieldName="email"
                    placeholder="Địa chỉ email"
                    error={errors.email}
                    value={formValues.email}
                    disabled={user.role === 'staff'}
                    onChange={(value: string) => setFormValues(prev => ({ ...prev, email: value }))}
                    onFocus={() => setErrors(prev => ({ ...prev, email: '' }))}
                />
                <TextInput
                    fieldName="phoneNumber"
                    placeholder="Số điện thoại"
                    error={errors.phoneNumber}
                    value={formValues.phoneNumber}
                    disabled={user.role === 'staff'}
                    onChange={(value: string) => setFormValues(prev => ({ ...prev, phoneNumber: value }))}
                    onFocus={() => setErrors(prev => ({ ...prev, phoneNumber: '' }))}
                />
                <Button
                    text="Cập nhật thông tin"
                    type="submit"
                    variant="gradient"
                    className="w-full rounded-full text-lg font-semibold capitalize"
                    disabled={user.role === 'staff'}
                />
            </form>
        </div>
    )
}

export default EditProfilePage
