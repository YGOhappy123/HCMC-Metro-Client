import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog'

import { RootState } from '@/store'
import Button from '@/components/common/Button'
import TextInput from '@/components/common/TextInput'
import SelectInput from '@/components/common/SelectInput'
import DatePicker from '@/components/common/DatePicker'

type UpdateStaffDialogProps = {
    selectedStaff: IStaff | null
    stations: IStation[]
    isOpen: boolean
    closeDialog: () => void
    updateStaffMutation: any
}

const UpdateStaffDialog = ({ selectedStaff, stations, isOpen, closeDialog, updateStaffMutation }: UpdateStaffDialogProps) => {
    const user = useSelector((state: RootState) => state.auth.user)

    const [formValues, setFormValues] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        workingStationId: 0
    })

    const [errors, setErrors] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        workingStationId: ''
    })

    const handleSubmit = async () => {
        const formErrors = validateFormValues()

        if (!formErrors.fullName && !formErrors.phoneNumber && !formErrors.email && !formErrors.workingStationId) {
            await updateStaffMutation
                .mutateAsync({
                    staffId: selectedStaff?.staffId,
                    data: {
                        fullName: formValues.fullName,
                        phoneNumber: formValues.phoneNumber,
                        email: formValues.email,
                        workingStationId: formValues.workingStationId
                    }
                })
                .then(() => closeDialog())
        } else {
            setErrors(formErrors)
        }
    }

    const validateFormValues = () => {
        const { fullName, email, phoneNumber, workingStationId } = formValues
        const formErrors = { ...errors }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

        if (!fullName.trim()) formErrors.fullName = formErrors.fullName || 'Họ và tên không được để trống.'
        if (!email.trim()) formErrors.email = formErrors.email || 'Địa chỉ email không được để trống.'
        if (!emailRegex.test(email)) formErrors.email = formErrors.email || 'Địa chỉ email không hợp lệ.'
        if (!phoneNumber.trim()) formErrors.phoneNumber = formErrors.phoneNumber || 'Số điện thoại không được để trống.'
        if (!phoneRegex.test(phoneNumber)) formErrors.phoneNumber = formErrors.phoneNumber || 'Số điện thoại không hợp lệ.'
        if (!workingStationId) formErrors.workingStationId = formErrors.workingStationId || 'Vui lòng chọn nhà ga công tác.'

        return formErrors
    }

    useEffect(() => {
        if (isOpen && selectedStaff) {
            setFormValues({
                fullName: selectedStaff?.fullName ?? '',
                phoneNumber: selectedStaff?.phoneNumber ?? '',
                email: selectedStaff?.email ?? '',
                workingStationId: selectedStaff?.workingStationId ?? 0
            })
            setErrors({
                fullName: '',
                phoneNumber: '',
                email: '',
                workingStationId: ''
            })
        }
    }, [isOpen])

    return (
        <DialogContent className="max-w-[800px] bg-white">
            <DialogHeader>
                <DialogTitle>Cập nhật thông tin nhân viên</DialogTitle>
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
                                date={new Date(selectedStaff?.hireDate ?? '')}
                                placeHolder="Chọn ngày công tác"
                                setDate={() => {}}
                                triggerClassName="leading-normal h-[54px] disabled:cursor-not-allowed disabled:text-neutral-500"
                                error=""
                                onFocus={() => {}}
                                disabled
                            />
                        </div>
                        <div className="mb-5">
                            <TextInput
                                fieldName="updatedBy"
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

export default UpdateStaffDialog
