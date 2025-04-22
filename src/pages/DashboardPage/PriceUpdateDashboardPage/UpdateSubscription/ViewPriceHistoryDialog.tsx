import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { IGroupedTicketPrice } from '@/pages/DashboardPage/PriceUpdateDashboardPage/UpdateSubscription'
import { getMappedPaymentMethod } from '@/utils/paymentMethodMapping'
import Button from '@/components/common/Button'
import dayjs from 'dayjs'

type ViewPriceHistoryDialogProps = {
    priceGroup: IGroupedTicketPrice | null
    closeDialog: () => void
}

const ViewPriceHistoryDialog = ({ priceGroup, closeDialog }: ViewPriceHistoryDialogProps) => {
    const columns: ColumnDef<ISubscriptionTicketPrice>[] = [
        {
            accessorKey: 'priceId',
            header: 'Mã Giá Tiền'
        },
        {
            accessorKey: 'price',
            header: () => <div className="text-center">Giá Tiền</div>,
            cell: ({ row }) => {
                const price = row.original.price

                return (
                    <div className="flex justify-center">
                        <div className="table-tag-green">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price! * 1000)}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'dates',
            header: () => <div className="text-center">Ngày Cập Nhật</div>,
            cell: ({ row }) => {
                const updatedAt = row.original.updatedAt

                return <div className="flex justify-center">{dayjs(updatedAt).format('DD/MM/YYYY HH:mm:ss')}</div>
            }
        },
        {
            accessorKey: 'updatedBy',
            header: 'Người Cập Nhật',
            cell: ({ row }) => {
                const updatedBy = row.original.updatedByAdmin

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Mã admin: </span>
                            {updatedBy?.adminId}
                        </div>
                        <div>
                            <span className="font-semibold">Họ và tên: </span>
                            {(updatedBy as Partial<IAdmin>).fullName}
                        </div>
                    </div>
                )
            }
        }
    ]

    return (
        <DialogContent className="max-w-[700px] bg-white">
            <DialogHeader>
                <DialogTitle>Lịch sử cập nhật giá vé</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="border-b-2"></div>
            <div className="max-h-[400px] overflow-y-auto">
                <DataTable columns={columns} data={priceGroup?.prices ?? []} noDataMessage="Vé này chưa được cập nhật giá." />
            </div>
            <div className="border-b-2"></div>
            <DialogFooter>
                <Button text="Đóng" variant="danger" onClick={closeDialog} />
            </DialogFooter>
        </DialogContent>
    )
}

export default ViewPriceHistoryDialog
