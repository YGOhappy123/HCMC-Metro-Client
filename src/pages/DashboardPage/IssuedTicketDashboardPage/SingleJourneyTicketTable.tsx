import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import dayjs from '@/libs/dayjs'

type SingleJourneyTicketTableProps = {
    tickets: IIssuedSingleJourneyTicket[]
    total: number
    page: number
    limit: number
    setPage: (page: number) => void
}

const SingleJourneyTicketTable = ({ tickets, total, page, limit, setPage }: SingleJourneyTicketTableProps) => {
    const columns: ColumnDef<IIssuedSingleJourneyTicket>[] = [
        {
            accessorKey: 'ticketId',
            header: 'Mã vé'
        },
        // {
        //     accessorKey: 'fullName',
        //     header: 'Khách hàng',
        //     enableHiding: true,
        //     cell: ({ row }) => {
        //         const customerName = row.original.order?.customer?.fullName
        //         return customerName
        //     }
        // },
        {
            accessorKey: 'orderId',
            header: 'Đơn hàng'
        },
        {
            accessorKey: 'price',
            header: 'Giá vé',
            enableHiding: true,
            cell: ({ row }) => {
                const price = row.original.price
                return `${price}.000 VND`
            }
        },
        {
            accessorKey: 'issuedStation',
            header: 'Mua tại',
            enableHiding: true,
            cell: ({ row }) => {
                const issuedStation = row.original.issuedStation?.stationName

                if (!issuedStation) return <span>X</span>

                return (
                    <div className="flex justify-center">
                        <div className="table-tag-pink">{issuedStation}</div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'entryExitStation',
            header: 'Trạm đi và trạm đến',
            enableHiding: true,
            cell: ({ row }) => {
                const entryStation = row.original.entryStation?.stationName
                const exitStation = row.original.exitStation?.stationName

                return (
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="mt-0.25">
                                <span className="font-semibold">Trạm đi: </span>
                            </div>
                            <div className="mt-1">
                                <span className="font-semibold">Trạm đến: </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="table-tag-blue">{entryStation}</div>
                            <div className="table-tag-green">{exitStation}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'issuedExpiredAt',
            header: 'Ngày mua & ngày hết hạn',
            enableHiding: true,
            cell: ({ row }) => {
                const issuedAt = row.original.issuedAt
                const expiredAt = row.original.expiredAt

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Ngày mua: </span>
                            {dayjs(issuedAt).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                        <div>
                            <span className="font-semibold">Ngày hết hạn: </span>
                            {dayjs(expiredAt).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                    </div>
                )
            }
        }
        // {
        //     accessorKey: 'actions',
        //     header: () => <div className="text-center">Hành Động</div>,
        //     cell: ({ row }) => {
        //         const staff = row.original

        //         return (
        //             <div className="grid grid-cols-1 gap-2 xl:grid-cols-1">
        //                 <Button
        //                     text="Cập nhật thông tin"
        //                     variant="info"
        //                     disabled={staff.isActive === false}
        //                     onClick={() => onSelectStaff(staff)}
        //                     className="min-w-fit rounded px-3 py-1.5 text-xs"
        //                 />
        //                 <ConfirmationDialog
        //                     Trigger={
        //                         <button
        //                             disabled={staff.isActive === false}
        //                             className="min-w-fit cursor-pointer rounded border-2 border-solid border-yellow-600 bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-600 hover:opacity-90 disabled:cursor-not-allowed disabled:border-gray-600 disabled:bg-gray-100 disabled:text-gray-600 disabled:opacity-50"
        //                         >
        //                             {staff.isActive === false ? 'Tài khoản đã khóa' : 'Khóa tài khoản'}
        //                         </button>
        //                     }
        //                     title="Xác nhận khóa tài khoản"
        //                     body="Bạn có chắc muốn khóa tài khoản này không? Nhân viên sẽ không thể sử dụng tài khoản này trong khi khóa."
        //                     onConfirm={async () => {
        //                         await deactivateStaffMutation.mutateAsync(staff.staffId)
        //                     }}
        //                 />
        //             </div>
        //         )
        //     }
        // }
    ]

    const lastPage = Math.ceil(total / limit)

    return (
        <div className="flex flex-col gap-8">
            <DataTable columns={columns} data={tickets} />
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

export default SingleJourneyTicketTable
