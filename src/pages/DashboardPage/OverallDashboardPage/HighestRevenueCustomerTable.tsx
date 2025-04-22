import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'

type HighestRevenueCustomerTableProps = {
    guests: ICustomer[]
}

const HighestRevenueCustomerTable = ({ guests }: HighestRevenueCustomerTableProps) => {
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
            accessorKey: 'email',
            header: 'Email',
            cell: ({ row }) => {
                const email = row.original.email
                return <span>{email || <i>(Chưa cập nhật)</i>}</span>
            }
        },
        {
            accessorKey: 'phoneNumber',
            header: 'Số Điện Thoại',
            cell: ({ row }) => {
                const phoneNumber = row.original.phoneNumber
                return <span>{phoneNumber || <i>(Chưa cập nhật)</i>}</span>
            }
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
            accessorKey: 'ticketCount',
            header: () => <div className="text-center">Số Vé Đã Mua</div>,
            cell: ({ row }) => {
                const ticketCount = row.original.ticketCount
                return <div className="flex justify-center">{(ticketCount as number).toString().padStart(2, '0')}</div>
            }
        },
        {
            accessorKey: 'totalRevenues',
            header: () => <div className="text-center">Số Tiền Giao Dịch</div>,
            cell: ({ row }) => {
                const totalRevenues = row.original.totalRevenues
                return (
                    <div className="flex justify-center">
                        <div className="table-tag-green border-3 font-bold">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((totalRevenues as number) * 1000)}
                        </div>
                    </div>
                )
            }
        }
    ]

    return (
        <div className="flex w-full flex-col items-center gap-4">
            <h2 className="text-accent text-2xl font-semibold">Top 5 khách hàng có giá trị giao dịch cao nhất</h2>
            <div className="w-full">
                <DataTable columns={columns} data={guests} />
            </div>
        </div>
    )
}

export default HighestRevenueCustomerTable
