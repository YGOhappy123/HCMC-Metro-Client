import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import dayjs from 'dayjs'

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
            accessorKey: 'createdAt',
            header: 'Ngày Tạo',
            cell: ({ row }) => {
                const createdAt = row.original.createdAt

                return (
                    <div>
                        <div>{dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss')}</div>
                    </div>
                )
            }
        }
    ]

    return (
        <div className="flex w-full flex-col items-center gap-4">
            <h2 className="text-accent text-2xl font-semibold">Top 5 khách hàng mới nhất của website</h2>
            <div className="w-full">
                <DataTable columns={columns} data={guests} />
            </div>
        </div>
    )
}

export default HighestRevenueCustomerTable
