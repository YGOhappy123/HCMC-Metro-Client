import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import dayjs from '@/libs/dayjs'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import Button from '@/components/common/Button'

type CustomerTableProps = {
    customers: ICustomer[]
    total: number
    page: number
    limit: number
    setPage: (page: number) => void
    onSelectCustomer: (customer: ICustomer) => void
    deactivateCustomerMutation: any
}

const CustomerTable = ({ customers, total, page, limit, setPage, onSelectCustomer, deactivateCustomerMutation }: CustomerTableProps) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const columns: ColumnDef<ICustomer>[] = [
        {
            accessorKey: 'customerId',
            header: 'Mã Khách Hàng'
        },
        {
            accessorKey: 'fullName',
            header: 'Họ Và Tên'
        },
        {
            accessorKey: 'avatar',
            header: () => <div className="text-center">Ảnh Đại Diện</div>,
            cell: ({ row }) => {
                const avatar = row.original.avatar

                return (
                    <div className="flex justify-center">
                        <img src={avatar} alt="Avatar" className="h-10 w-10 rounded-full" />
                    </div>
                )
            }
        },
        {
            accessorKey: 'contact',
            header: 'Thông Tin Liên Hệ',
            enableHiding: true,
            cell: ({ row }) => {
                const email = row.original.email
                const phoneNumber = row.original.phoneNumber

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Email: </span>
                            {email || <i>(Chưa cập nhật)</i>}
                        </div>
                        <div>
                            <span className="font-semibold">Số Điện Thoại: </span>
                            {phoneNumber || <i>(Chưa cập nhật)</i>}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'createdAt',
            header: () => <div className="text-center">Ngày Tạo Tài Khoản</div>,
            enableHiding: true,
            cell: ({ row }) => {
                const createdAt = row.original.createdAt

                return <div className="flex justify-center">{dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss')}</div>
            }
        },
        {
            accessorKey: 'actions',
            header: () => <div className="text-center">Hành Động</div>,
            cell: ({ row }) => {
                const customer = row.original

                return (
                    <div className="grid grid-cols-1 gap-2 xl:grid-cols-1">
                        <Button
                            text="Lịch sử mua vé"
                            variant="info"
                            onClick={() => onSelectCustomer(customer)}
                            className="min-w-fit rounded px-3 py-1.5 text-xs"
                        />
                        {user.role === 'admin' && (
                            <ConfirmationDialog
                                Trigger={
                                    <button
                                        disabled={customer.isActive === false}
                                        className="min-w-fit cursor-pointer rounded border-2 border-solid border-yellow-600 bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-600 hover:opacity-90 disabled:cursor-not-allowed disabled:border-gray-600 disabled:bg-gray-100 disabled:text-gray-600 disabled:opacity-50"
                                    >
                                        {customer.isActive === false ? 'Tài khoản đã khóa' : 'Khóa tài khoản'}
                                    </button>
                                }
                                title="Xác nhận khóa tài khoản"
                                body="Bạn có chắc muốn khóa tài khoản này không? Khách hàng sẽ không thể sử dụng tài khoản này trong khi khóa. Các vé và dịch vụ đã mua vẫn có thể tiếp tục sử dụng đến thời gian hết hạn."
                                onConfirm={async () => {
                                    await deactivateCustomerMutation.mutateAsync(customer.customerId)
                                }}
                            />
                        )}
                    </div>
                )
            }
        }
    ]

    const lastPage = Math.ceil(total / limit)

    return (
        <div className="flex flex-col gap-8">
            <DataTable columns={columns} data={customers} />
            <div className="join flex w-full justify-center">
                <div className="join">
                    <button
                        className="join-item btn border-primary cursor-pointer disabled:opacity-70"
                        disabled={page === 1}
                        onClick={() => setPage(page === 1 ? 1 : page - 1)}
                    >
                        «
                    </button>
                    <button className="join-item btn border-primary">
                        Trang {page}/{lastPage}
                    </button>
                    <button
                        className="join-item btn border-primary cursor-pointer disabled:opacity-70"
                        disabled={page === lastPage}
                        onClick={() => setPage(page === lastPage ? lastPage : page + 1)}
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomerTable
