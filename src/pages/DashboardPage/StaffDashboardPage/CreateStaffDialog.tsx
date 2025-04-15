import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog'

import { RootState } from '@/store'
import Button from '@/components/common/Button'
import TextInput from '@/components/common/TextInput'
import SelectInput from '@/components/common/SelectInput'
import DatePicker from '@/components/common/DatePicker'
import dayjs from 'dayjs'

type CreateStaffDialogProps = {
    stations: IStation[]
    isOpen: boolean
    closeDialog: () => void
    createStaffMutation: any
}

const CreateStaffDialog = ({ stations, isOpen, closeDialog, createStaffMutation }: CreateStaffDialogProps) => {
    const user = useSelector((state: RootState) => state.auth.user)

    const [formValues, setFormValues] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        workingStationId: 0,
        hireDate: undefined
    })

    const [errors, setErrors] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        workingStationId: '',
        hireDate: ''
    })

    const handleSubmit = async () => {
        const formErrors = validateFormValues()

        if (!formErrors.fullName && !formErrors.phoneNumber && !formErrors.email && !formErrors.hireDate && !formErrors.workingStationId) {
            await createStaffMutation
                .mutateAsync({
                    fullName: formValues.fullName,
                    phoneNumber: formValues.phoneNumber,
                    email: formValues.email,
                    hireDate: dayjs(formValues.hireDate).format('YYYY-MM-DD'),
                    workingStationId: formValues.workingStationId
                })
                .then(() => closeDialog())
        } else {
            setErrors(formErrors)
        }
    }

    const validateFormValues = () => {
        const { fullName, email, phoneNumber, hireDate, workingStationId } = formValues
        const formErrors = { ...errors }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

        if (!fullName.trim()) formErrors.fullName = formErrors.fullName || 'Họ và tên không được để trống.'
        if (!email.trim()) formErrors.email = formErrors.email || 'Địa chỉ email không được để trống.'
        if (!emailRegex.test(email)) formErrors.email = formErrors.email || 'Địa chỉ email không hợp lệ.'
        if (!phoneNumber.trim()) formErrors.phoneNumber = formErrors.phoneNumber || 'Số điện thoại không được để trống.'
        if (!phoneRegex.test(phoneNumber)) formErrors.phoneNumber = formErrors.phoneNumber || 'Số điện thoại không hợp lệ.'
        if (hireDate == undefined) formErrors.hireDate = formErrors.hireDate || 'Ngày công tác không được để trống.'
        if (workingStationId === 0) formErrors.workingStationId = formErrors.workingStationId || 'Vui lòng chọn nhà ga công tác.'

        return formErrors
    }

    useEffect(() => {
        if (isOpen) {
            setFormValues({
                fullName: '',
                phoneNumber: '',
                email: '',
                workingStationId: 0,
                hireDate: undefined
            })
            setErrors({
                fullName: '',
                phoneNumber: '',
                email: '',
                workingStationId: '',
                hireDate: ''
            })
        }
    }, [isOpen])

    return (
        <DialogContent className="max-w-[800px] bg-white">
            <DialogHeader>
                <DialogTitle>Tạo nhân viên mới</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="border-b-2"></div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="mb-10">
                            <TextInput
                                fieldName="fullName"
                                placeholder="Họ và tên"
                                error={errors.fullName}
                                value={formValues.fullName}
                                onChange={(value: string) => setFormValues(prev => ({ ...prev, fullName: value }))}
                                onFocus={() => setErrors(prev => ({ ...prev, fullName: '' }))}
                                labelClassName="bg-white"
                            />
                        </div>
                        <div className="mb-10">
                            <TextInput
                                fieldName="email"
                                placeholder="Email"
                                error={errors.email}
                                value={formValues.email}
                                onChange={(value: string) => setFormValues(prev => ({ ...prev, email: value }))}
                                onFocus={() => setErrors(prev => ({ ...prev, email: '' }))}
                                labelClassName="bg-white"
                            />
                        </div>
                        <div className="mb-5">
                            <TextInput
                                fieldName="phoneNumber"
                                placeholder="Số điện thoại"
                                error={errors.phoneNumber}
                                value={formValues.phoneNumber}
                                onChange={(value: string) => setFormValues(prev => ({ ...prev, phoneNumber: value }))}
                                onFocus={() => setErrors(prev => ({ ...prev, phoneNumber: '' }))}
                                labelClassName="bg-white"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-10">
                            <SelectInput
                                fieldName="workingStationId"
                                placeholder="Ga công tác"
                                options={stations.map(station => ({ value: station.stationId, label: station.stationName }))}
                                error={errors.workingStationId}
                                value={formValues.workingStationId}
                                onChange={(value: string | number) => setFormValues(prev => ({ ...prev, workingStationId: value as number }))}
                                onFocus={() => setErrors(prev => ({ ...prev, workingStationId: '' }))}
                                labelClassName="bg-white"
                            />
                        </div>
                        <div className="mb-10">
                            <DatePicker
                                date={formValues.hireDate}
                                placeHolder="Chọn ngày công tác"
                                setDate={(value: Date | undefined) => setFormValues(prev => ({ ...prev, hireDate: value as any }))}
                                triggerClassName="leading-normal h-[54px]"
                                error={errors.hireDate}
                                onFocus={() => setErrors(prev => ({ ...prev, hireDate: '' }))}
                            />
                        </div>
                        <div className="mb-5">
                            <TextInput
                                fieldName="createdBy"
                                placeholder="Người tạo"
                                error=""
                                disabled={true}
                                value={user.fullName}
                                onChange={() => {}}
                                onFocus={() => {}}
                                labelClassName="bg-white"
                            />
                        </div>
                    </div>
                </div>
            </form>
            <div className="border-b-2"></div>
            <DialogFooter>
                <Button text="Hủy bỏ" variant="danger" onClick={closeDialog} />
                <Button text="Xác nhận" variant="success" onClick={handleSubmit} />
            </DialogFooter>
        </DialogContent>
    )
}

export default CreateStaffDialog
