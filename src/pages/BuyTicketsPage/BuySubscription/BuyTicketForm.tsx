import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { onError } from '@/utils/errorsHandler'
import TextInput from '@/components/common/TextInput'
import Button from '@/components/common/Button'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

type BuyTicketFormProps = {
    selectedTicket: ISubscriptionTicket | null
}

const BuyTicketForm = ({ selectedTicket }: BuyTicketFormProps) => {
    const axios = useAxiosIns()
    const user = useSelector((state: RootState) => state.auth.user)
    const [value, setValue] = useState<number>(1)
    const [error, setError] = useState<string>('')

    const unitPrice = (selectedTicket?.price ?? 0) * 1000

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (value < 1) return
        if (!user) return toast('Vui lòng đăng nhập để sử dụng tính năng này.', toastConfig('info'))
        if (user.role !== 'customer') return toast('Tính năng mua vé chỉ dành cho khách hàng.', toastConfig('info'))

        try {
            const res = await axios.post('/customers/tickets/subscription', {
                ticketId: selectedTicket?.subscriptionTicketId,
                quantity: Number(value)
            })

            const paymentUrl = res?.data?.data?.paymentUrl
            if (paymentUrl) {
                window.location.href = paymentUrl
            }
        } catch (error) {
            onError(error as any)
        }
    }

    return (
        <div className="rounded-3xl bg-white p-[50px]">
            {selectedTicket && selectedTicket.requirements == null ? (
                <form onSubmit={handleSubmit} className="flex w-full flex-col">
                    <h3 className="text-primary mb-6 text-center text-3xl font-semibold">Mua vé thời hạn</h3>
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

                    <Button
                        text="Thanh toán bằng ví VnPay"
                        type="submit"
                        variant="gradient"
                        className="mt-5 rounded font-semibold capitalize"
                        disabled={value < 1}
                    />
                </form>
            ) : (
                <div className="flex w-full flex-col">
                    <h3 className="text-primary mb-6 text-center text-3xl font-semibold">Mua vé thời hạn</h3>
                    <div className="flex flex-col gap-3 py-5 text-lg">
                        <p className="text-justify">Khách hàng chỉ có thể mua các loại vé thời hạn không có yêu cầu đặc biệt.</p>
                        <p className="text-justify">
                            Để mua vé này, quý khách vui lòng liên hệ nhân viên và xuất trình các giấy tờ/ chứng nhận cần thiết.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
export default BuyTicketForm
