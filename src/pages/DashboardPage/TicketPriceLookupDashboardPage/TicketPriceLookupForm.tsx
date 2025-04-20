import { useEffect, useState } from 'react'

import { Form } from '@/components/ui/Form'
import SelectInput from '@/components/common/SelectInput'
import Button from '@/components/common/Button'

type PaymentMethod = {
    value: string
    label: string
}

type FormValues = {
    fromStationId: number | ''
    toStationId: number | ''
    paymentMethod: string
}

function TicketPriceLookupForm({
    stations,
    onSubmit,
    onReset
}: {
    stations: IStation[]
    onSubmit: (values: FormValues) => void
    onReset: () => void
}) {
    const [formValues, setFormValues] = useState<FormValues>({
        fromStationId: '',
        toStationId: '',
        paymentMethod: ''
    })

    const [errors, setErrors] = useState({
        fromStationId: '',
        toStationId: '',
        paymentMethod: ''
    })

    // useEffect(() => {
    //     if (formValues.fromStationId && formValues.toStationId && formValues.fromStationId === formValues.toStationId) {
    //         setErrors({
    //             ...errors,
    //             fromStationId: 'Ga đi và ga đến không được trùng nhau.',
    //             toStationId: 'Ga đi và ga đến không được trùng nhau.'
    //         })
    //     } else {
    //         // Reset lỗi nếu đã sửa
    //         setErrors({ ...errors, fromStationId: '', toStationId: '' })
    //     }
    // }, [formValues.fromStationId, formValues.toStationId])

    const paymentMethods: PaymentMethod[] = [
        { value: 'cash', label: 'Tiền mặt' },
        { value: 'creditCard', label: 'Thẻ tín dụng' },
        { value: 'digitalWallet', label: 'Ví điện tử' },
        { value: 'sfc', label: 'Thẻ SFC' }
    ]

    function validateFormValues() {
        const { fromStationId, toStationId, paymentMethod } = formValues
        const formErrors = { ...errors }

        if (fromStationId === '') formErrors.fromStationId = formErrors.fromStationId || 'Vui lòng chọn nhà ga xuất phát.'
        if (toStationId === '') formErrors.toStationId = formErrors.toStationId || 'Vui lòng chọn nhà ga muốn đến'
        if (fromStationId === toStationId) {
            formErrors.fromStationId = formErrors.fromStationId || 'Ga đi và ga đến không được trùng nhau.'
            formErrors.toStationId = formErrors.toStationId || 'Ga đi và ga đến không được trùng nhau.'
        }
        if (paymentMethod === '') formErrors.paymentMethod = formErrors.paymentMethod || 'Vui lòng chọn phương thức thanh toán'

        return formErrors
    }

    function handleReset() {
        setFormValues({
            fromStationId: '',
            toStationId: '',
            paymentMethod: ''
        })
        setErrors({ fromStationId: '', toStationId: '', paymentMethod: '' })
        onReset()
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const formErrors = validateFormValues()
        if (!formErrors.fromStationId && !formErrors.toStationId && !formErrors.paymentMethod) {
            onSubmit(formValues)
        } else {
            setErrors(formErrors)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="mx-auto my-5 flex w-3/5 flex-col items-center gap-y-8">
                <div className="flex w-full items-center justify-between gap-x-1">
                    <SelectInput
                        fieldName="fromStationId"
                        placeholder="Trạm xuất phát"
                        error={errors.fromStationId}
                        options={stations.map(station => ({ value: station.stationId, label: station.stationName }))}
                        value={formValues.fromStationId}
                        onChange={(value: string | number) => setFormValues(prev => ({ ...prev, fromStationId: value as number }))}
                        onFocus={() => setErrors(prev => ({ ...prev, fromStationId: '' }))}
                        labelClassName="bg-white"
                        selectClassName="w-72"
                    />
                    <span className="text-4xl">&rarr;</span>

                    <SelectInput
                        fieldName="toStationId"
                        placeholder="Trạm đích"
                        error={errors.toStationId}
                        options={stations.map(station => ({ value: station.stationId, label: station.stationName }))}
                        value={formValues.toStationId}
                        onChange={(value: string | number) => setFormValues(prev => ({ ...prev, toStationId: value as number }))}
                        onFocus={() => setErrors(prev => ({ ...prev, toStationId: '' }))}
                        labelClassName="bg-white"
                        selectClassName="w-72"
                    />
                </div>

                <div className="w-full">
                    <SelectInput
                        fieldName="paymentMethod"
                        placeholder="Phương thức thanh toán"
                        value={formValues.paymentMethod}
                        error={errors.paymentMethod}
                        options={paymentMethods}
                        onChange={(value: string | number) => setFormValues(prev => ({ ...prev, paymentMethod: value as string }))}
                        onFocus={() => setErrors(prev => ({ ...prev, paymentMethod: '' }))}
                        labelClassName="bg-white"
                    />
                </div>

                <div className="flex w-full justify-end gap-4">
                    <Button onClick={handleReset} text="Reset" type="button" />
                    <Button text="Tra cứu" variant="gradient" type="submit" disabled={formValues.fromStationId === formValues.toStationId} />
                </div>
            </div>
        </Form>
    )
}

export default TicketPriceLookupForm
