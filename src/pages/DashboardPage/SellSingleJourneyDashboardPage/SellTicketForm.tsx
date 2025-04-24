import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { onError } from '@/utils/errorsHandler'
import { getMappedMessage } from '@/utils/resMessageMapping'
import { getMappedPaymentMethod } from '@/utils/paymentMethodMapping'
import TextInput from '@/components/common/TextInput'
import Button from '@/components/common/Button'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

type SellTicketFormProps = {
    entry: IStation | null
    exit: IStation | null
    method: PaymentMethod
    total: number
}

const SellTicketForm = ({ entry, exit, method, total }: SellTicketFormProps) => {
    const axios = useAxiosIns()
    const [value, setValue] = useState<number>(1)
    const [error, setError] = useState<string>('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (value < 1) return

        try {
            const res = await axios.post('/tickets/sell-single-journey', {
                start: entry?.stationId ?? 0,
                end: exit?.stationId ?? 0,
                quantity: Number(value),
                method: method
            })

            toast(getMappedMessage(res.data.message), toastConfig('success'))
        } catch (error) {
            onError(error as any)
        }
    }

    return (
        <div className="rounded-lg border-2 border-[#9C9C9C] bg-white p-[50px]">
            <form onSubmit={handleSubmit} className="flex w-full flex-col">
                <h3 className="text-primary mb-6 text-center text-3xl font-semibold">Bán vé một chặng</h3>
                <div className="py-5">
                    <TextInput
                        fieldName="entry"
                        placeholder="Ga xuất phát"
                        error=""
                        value={entry?.stationName ?? ''}
                        onChange={(value: string) => {}}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        disabled
                    />
                </div>

                <div className="py-5">
                    <TextInput
                        fieldName="exit"
                        placeholder="Ga đích đến"
                        error=""
                        value={exit?.stationName ?? ''}
                        onChange={(value: string) => {}}
                        onFocus={() => {}}
                        labelClassName="bg-white"
                        disabled
                    />
                </div>

                <div className="py-5">
                    <TextInput
                        fieldName="price"
                        placeholder="Số lượng"
                        error={error}
                        value={value.toString()}
                        onChange={(val: string) => setValue(Number.parseInt(val) >= 1 ? Number.parseInt(val) : 1)}
                        onFocus={() => setError('')}
                        type="number"
                        labelClassName="bg-white"
                        wrapperClassName="flex-1"
                    />
                </div>

                <div className="py-5">
                    <TextInput
                        fieldName="price"
                        placeholder="Tổng tiền"
                        error={error}
                        value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value) * total)}
                        onChange={(val: string) => {}}
                        onFocus={() => setError('')}
                        labelClassName="bg-white"
                        wrapperClassName="flex-1"
                        disabled
                    />
                </div>

                <div className="py-5">
                    <TextInput
                        fieldName="method"
                        placeholder="Phương thức thanh toán"
                        error={error}
                        value={getMappedPaymentMethod(method)}
                        onChange={(val: string) => {}}
                        onFocus={() => setError('')}
                        labelClassName="bg-white"
                        wrapperClassName="flex-1"
                        disabled
                    />
                </div>

                <Button text="Bán vé" type="submit" variant="gradient" className="mt-5 rounded font-semibold capitalize" disabled={value < 1} />
            </form>
        </div>
    )
}
export default SellTicketForm
