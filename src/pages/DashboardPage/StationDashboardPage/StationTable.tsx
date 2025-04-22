import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/DataTable'
import Button from '@/components/common/Button'
import { useNavigate } from 'react-router-dom'

type StationTableProps = {
    Stations: IStation[]
    total: number
    page: number
    limit: number
    setPage: (page: number) => void
    onSelectStation: (Station: IStation) => void
}

const StationTable = ({ Stations, total, page, limit, setPage, onSelectStation }: StationTableProps) => {
    
    const navigate = useNavigate();

    const columns: ColumnDef<IStation>[] = [
        {
            accessorKey: 'stationId', // hiển thị dữ liệu của property StationId
            header: 'Mã Nhà Ga'
        },
        {
            accessorKey: 'stationName',
            header: 'Tên Nhà Ga'
        },
        {
            accessorKey: 'location',
            header: 'Vị Trí Nhà Ga'
        },
        {
            accessorKey: 'lines',
            header: 'Tuyến',
            cell: (row) => {
                const {stationId} = row.row.original;
                return (
                    <div className="grid grid-cols-1 gap-2 xl:grid-cols-1">
                        <Button
                            text="Xem tuyến"
                            variant="info"
                            className="min-w-fit rounded px-3 py-1.5 text-xs"
                            onClick={() => navigate(`/dashboard/lines?stationId=${stationId}`)}
                        />
                    </div>
                )
            }
        }
    ]


    const lastPage = Math.ceil(total / limit)

    return (
        <div className="flex flex-col gap-8">
            <DataTable columns={columns} data={Stations} />
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

export default StationTable
