import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import dayjs from '@/libs/dayjs'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import Button from '@/components/common/Button'

type PathTableProps = {
    paths: IPath[]
}

const PathTable = ({ paths }: PathTableProps) => {
    const columns: ColumnDef<IPath>[] = [
        {
            accessorKey: 'fromStation',
            header: 'Trạm đi',
            enableHiding: true,
            cell: ({ row }) => {
                const fromStation = row.original.fromStation

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Tên trạm: </span>
                            {fromStation.stationName}
                        </div>
                        <div>
                            <span className="font-semibold">Địa chỉ: </span>
                            {fromStation.location}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'toStation',
            header: 'Trạm đến',
            enableHiding: true,
            cell: ({ row }) => {
                const toStation = row.original.toStation

                return (
                    <div>
                        <div>
                            <span className="font-semibold">Tên trạm: </span>
                            {toStation.stationName}
                        </div>
                        <div>
                            <span className="font-semibold">Địa chỉ: </span>
                            {toStation.location}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'line',
            header: 'Thuộc tuyến'
        },
        {
            accessorKey: 'price',
            header: 'Giá tiền'
        }
        // {
        //     accessorKey: 'workingStation',
        //     header: () => <div className="text-center">Ga Đang Công Tác</div>,
        //     enableHiding: true,
        //     cell: ({ row }) => {
        //         const workingStation = row.original.workingStation

        //         return (
        //             <div className="flex justify-center">
        //                 <div className="table-tag-pink">{workingStation?.stationName}</div>
        //             </div>
        //         )
        //     }
        // },
    ]

    return (
        <div className="flex flex-col gap-8">
            <DataTable columns={columns} data={paths} />
            {/* <div className="join flex w-full justify-center">
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
            </div> */}
        </div>
    )
}

export default PathTable
