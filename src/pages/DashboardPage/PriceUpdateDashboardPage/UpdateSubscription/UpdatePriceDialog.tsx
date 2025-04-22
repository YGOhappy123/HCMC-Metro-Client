import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { IGroupedTicketPrice } from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSubscription'
import { PAYMENT_METHOD_MAPPING } from '@/utils/paymentMethodMapping'
import { getMappedMessage } from '@/utils/resMessageMapping'
import { onError } from '@/utils/errorsHandler'
import Button from '@/components/common/Button'
import TextInput from '@/components/common/TextInput'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

type UpdatePriceDialogProps = {
    priceGroup: IGroupedTicketPrice | null
    closeDialog: () => void
    onUpdateDone: () => Promise<void>
}

const UpdatePriceDialog = ({ priceGroup, closeDialog, onUpdateDone }: UpdatePriceDialogProps) => {
    return (
        <DialogContent className="max-w-[800px] bg-white">
            <DialogHeader>
                <DialogTitle>Cập nhật giá vé thời hạn: {priceGroup?.ticket.ticketName}</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="border-b-2"></div>
            <div className="max-h-[400px] overflow-y-auto">
                <UpdatePriceForm
                    ticketId={priceGroup?.ticket?.subscriptionTicketId ?? 0}
                    initValue={priceGroup?.prices?.[0]?.price ?? 0}
                    placeholder="Giá tiền cho tất cả phương thức"
                    closeDialog={closeDialog}
                    onUpdateDone={onUpdateDone}
                />

                <i>
                    <b>Lưu ý:</b> Giá được tính theo đơn vị nghìn Việt Nam đồng (vnđ).
                </i>
            </div>
            <div className="border-b-2"></div>
            <DialogFooter>
                <Button text="Đóng" variant="danger" onClick={closeDialog} />
            </DialogFooter>
        </DialogContent>
    )
}

type UpdatePriceFormProps = {
    ticketId: number
    initValue: number
    placeholder: string
    closeDialog: () => void
    onUpdateDone: () => Promise<void>
}

const UpdatePriceForm = ({ ticketId, initValue, placeholder, closeDialog, onUpdateDone }: UpdatePriceFormProps) => {
    const axios = useAxiosIns()
    const [value, setValue] = useState<number>(initValue)
    const [error, setError] = useState<string>('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (value <= 0 || value === initValue) return

        try {
            const res = await axios.patch('/prices/subscription', {
                ticketId: ticketId,
                price: value
            })

            toast(getMappedMessage(res.data.message), toastConfig('success'))
            onUpdateDone()
            closeDialog()
        } catch (error) {
            onError(error as any)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-5 py-5">
            <TextInput
                fieldName="price"
                placeholder={placeholder}
                error={error}
                value={value.toString()}
                onChange={(val: string) => setValue(Number.parseInt(val) >= 0 ? Number.parseInt(val) : 0)}
                onFocus={() => setError('')}
                type="number"
                labelClassName="bg-white"
                wrapperClassName="flex-1"
            />
            <Button
                text="Xác nhận"
                type="submit"
                variant="gradient"
                className="rounded font-semibold capitalize"
                disabled={value <= 0 || value === initValue}
            />
        </form>
    )
}

export default UpdatePriceDialog
