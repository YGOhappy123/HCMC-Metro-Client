import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'

type SfcCardTableProps = {
    tickets: IIssuedSfcCard[]
    total: number
    page: number
    limit: number
    setPage: (page: number) => void
}

const SfcCardTable = ({ tickets, total, page, limit, setPage }: SfcCardTableProps) => {
    const columns: ColumnDef<IIssuedSfcCard>[] = [
        {
            accessorKey: 'sfcCardId',
            header: 'Mã vé'
        },
        {
            accessorKey: 'balance',
            header: 'Số dư',
            enableHiding: true,
            cell: ({ row }) => {
                const balance = row.original.balance
                return `${balance}.000 VND`
            }
        },
        {
            accessorKey: 'issuedStation',
            header: () => <div className="text-center">Mua tại</div>,
            enableHiding: true,
            cell: ({ row }) => {
                const issuedStation = row.original.issuedStation?.stationName

                return (
                    <div className="flex justify-center">
                        <div className="table-tag-pink">{issuedStation}</div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'issuedAt',
            header: 'Ngày mua'
        }
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

export default SfcCardTable
