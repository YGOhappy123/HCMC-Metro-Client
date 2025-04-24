import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { onError } from '@/utils/errorsHandler'
import { getMappedPaymentMethod } from '@/utils/paymentMethodMapping'
import { getMappedMessage } from '@/utils/resMessageMapping'
import TextInput from '@/components/common/TextInput'
import Button from '@/components/common/Button'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

type SellTicketFormProps = {
    method: PaymentMethod
    selectedTicket: ISubscriptionTicket | null
}

const SellTicketForm = ({ method, selectedTicket }: SellTicketFormProps) => {
    const axios = useAxiosIns()
    const [value, setValue] = useState<number>(1)
    const [error, setError] = useState<string>('')

    const unitPrice = (selectedTicket?.price ?? 0) * 1000

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (value < 1) return

        try {
            const res = await axios.post('/tickets/sell-subscription', {
                ticketId: selectedTicket?.subscriptionTicketId,
                quantity: Number(value),
                method: method
            })

            toast(getMappedMessage(res.data.message), toastConfig('success'))
        } catch (error) {
            onError(error as any)
        }
    }

    return (
        <div className="rounded-3xl border-2 border-[#9C9C9C] bg-white p-[50px]">
            <form onSubmit={handleSubmit} className="flex w-full flex-col">
                <h3 className="text-primary mb-6 text-center text-3xl font-semibold">Bán vé thời hạn</h3>
                <div className="py-5">
                    <TextInput
                        fieldName="ticket"
                        placeholder="Loại vé"
                        error=""
                        value={selectedTicket?.ticketName ?? ''}
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
                        value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value) * unitPrice)}
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
