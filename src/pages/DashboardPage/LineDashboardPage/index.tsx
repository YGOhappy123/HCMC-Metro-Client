import { useEffect, useState } from 'react'
import { Popover, PopoverTrigger } from '@/components/ui/Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import LineTable from '@/pages/DashboardPage/LineDashboardPage/LineTable'
import LineFilter from '@/pages/DashboardPage/LineDashboardPage/LineFilter'
import lineService from '@/services/lineService'
import useAxiosIns from '@/hooks/useAxiosIns'

const LineDashboardPage = () => {
    const axios = useAxiosIns() // axios: thư viện để gọi API lây dữ liệu

    const {
        Lines,
        total,
        page,
        limit,
        setPage,
        buildQuery,
        onFilterSearch,
        onResetFilterSearch
    } = lineService({ enableFetching: true })
    const [havingFilters, setHavingFilters] = useState(false)

    useEffect(() => {
        setPage(1)
    }, [])

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between p-4">
                <h2 className="font-oswald flex items-center gap-4 text-3xl font-bold text-black/30 uppercase">
                    <span>
                        Tra cứu thông tin <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span className="text-primary">Tra cứu tuyến tàu</span>
                </h2>
                <div className="flex justify-center gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="relative flex min-w-[120px] cursor-pointer items-center justify-center rounded-md border-2 border-solid border-black bg-black/10 px-6 py-3 font-medium text-black hover:opacity-90">
                                Tìm kiếm
                                {havingFilters && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></div>}
                            </div>
                        </PopoverTrigger>
                        <LineFilter
                            setHavingFilters={setHavingFilters}
                            onChange={buildQuery}
                            onSearch={onFilterSearch}
                            onReset={onResetFilterSearch}
                        />
                    </Popover>
                </div>
            </div>

            <LineTable
                Lines={Lines}
                total={total}
                page={page}
                limit={limit}
                setPage={setPage}
            />
        </div>
    )
}

export default LineDashboardPage
