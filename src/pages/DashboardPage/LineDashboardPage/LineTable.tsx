import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import Button from '@/components/common/Button'
import { useNavigate } from 'react-router-dom'

type LineTableProps = {
    Lines: ILine[]
    total: number
    page: number
    limit: number
    setPage: (page: number) => void
    onSelectLine?: (Line: ILine) => void
}

const LineTable = ({ Lines, total, page, limit, setPage, onSelectLine }: LineTableProps) => {
    const navigate = useNavigate();
    const columns: ColumnDef<ILine>[] = [
        {
            accessorKey: 'lineId', // hiển thị dữ liệu của property LineId
            header: 'Mã Tuyến'
        },
        {
            accessorKey: 'lineName',
            header: 'Tên Tuyến'
        },
        {
            accessorKey: 'distance',
            header: 'Khoảng cách'
        },
        {
            accessorKey: 'stations',
            header: () => <div className="text-center">Nhà Ga</div>,
            cell: ({ row }) => {
                const { lineId } = row.original;
                return (
                    <div className="grid grid-cols-1 gap-2 xl:grid-cols-1">
                        <Button
                            text="Xem nhà ga"
                            variant="info"
                            className="min-w-fit rounded px-3 py-1.5 text-xs"
                            onClick={() => navigate(`/dashboard/stations?lineId=${lineId}`)}
                        />
                    </div>
                )
            }
        }
    ]

    const lastPage = Math.ceil(total / limit)

    return (
        <div className="flex flex-col gap-8">
            <DataTable columns={columns} data={Lines} />
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

export default LineTable
