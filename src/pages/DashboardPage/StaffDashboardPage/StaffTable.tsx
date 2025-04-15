import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import dayjs from '@/libs/dayjs'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import Button from '@/components/common/Button'

type StaffTableProps = {
    staffs: IStaff[]
    total: number
    page: number
    limit: number
    setPage: (page: number) => void
    onSelectStaff: (staff: IStaff) => void
    deactivateStaffMutation: any
}

const StaffTable = ({ staffs, total, page, limit, setPage, onSelectStaff, deactivateStaffMutation }: StaffTableProps) => {
    const columns: ColumnDef<IStaff>[] = [
        {
            accessorKey: 'staffId',
            header: 'Mã Nhân Viên'
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
                            {email}
                        </div>
                        <div>
                            <span className="font-semibold">Số Điện Thoại: </span>
                            {phoneNumber}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'createdAt',
            header: 'Ngày Và Người Tạo',
            enableHiding: true,
            cell: ({ row }) => {
                const createdAt = row.original.createdAt
                const createdBy = row.original.createdByAdmin

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Ngày tạo: </span>
                            {dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                        <div>
                            <span className="font-semibold">Người tạo: </span>
                            {(createdBy as Partial<IAdmin>).fullName || <i>(Không có)</i>}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'workingStation',
            header: () => <div className="text-center">Ga Đang Công Tác</div>,
            enableHiding: true,
            cell: ({ row }) => {
                const workingStation = row.original.workingStation

                return (
                    <div className="flex justify-center">
                        <div className="table-tag-pink">{workingStation?.stationName}</div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'hireDate',
            header: () => <div className="text-center">Ngày Vào Làm</div>,
            enableHiding: true,
            cell: ({ row }) => {
                const hireDate = row.original.hireDate

                return <div className="flex justify-center">{dayjs(hireDate).format('DD/MM/YYYY')}</div>
            }
        },
        {
            accessorKey: 'actions',
            header: () => <div className="text-center">Hành Động</div>,
            cell: ({ row }) => {
                const staff = row.original

                return (
                    <div className="grid grid-cols-1 gap-2 xl:grid-cols-1">
                        <Button
                            text="Cập nhật thông tin"
                            variant="info"
                            disabled={staff.isActive === false}
                            onClick={() => onSelectStaff(staff)}
                            className="min-w-fit rounded px-3 py-1.5 text-xs"
                        />
                        <ConfirmationDialog
                            Trigger={
                                <button
                                    disabled={staff.isActive === false}
                                    className="min-w-fit cursor-pointer rounded border-2 border-solid border-yellow-600 bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-600 hover:opacity-90 disabled:cursor-not-allowed disabled:border-gray-600 disabled:bg-gray-100 disabled:text-gray-600 disabled:opacity-50"
                                >
                                    {staff.isActive === false ? 'Tài khoản đã khóa' : 'Khóa tài khoản'}
                                </button>
                            }
                            title="Xác nhận khóa tài khoản"
                            body="Bạn có chắc muốn khóa tài khoản này không? Nhân viên sẽ không thể sử dụng tài khoản này trong khi khóa."
                            onConfirm={async () => {
                                await deactivateStaffMutation.mutateAsync(staff.staffId)
                            }}
                        />
                    </div>
                )
            }
        }
    ]

    const lastPage = Math.ceil(total / limit)

    return (
        <div className="flex flex-col gap-8">
            <DataTable columns={columns} data={staffs} />
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

export default StaffTable
