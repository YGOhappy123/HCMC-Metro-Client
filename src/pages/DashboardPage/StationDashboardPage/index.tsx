import { useEffect, useState } from 'react'
import { Popover, PopoverTrigger } from '@/components/ui/Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import StationTable from '@/pages/DashboardPage/StationDashboardPage/StationTable'
import StationFilter from '@/pages/DashboardPage/StationDashboardPage/StationFilter'
import StationService from '@/services/stationService'
import useAxiosIns from '@/hooks/useAxiosIns'

const StationDashboardPage = () => {
    const axios = useAxiosIns() // axios: thư viện để gọi API lây dữ liệu
    const {
        Stations,
        total,
        page,
        limit,
        setPage,
        buildQuery,
        onFilterSearch,
        onResetFilterSearch
    } = StationService({ enableFetching: true })

    useEffect(() => {
        setPage(1)
    }, [])

    const [havingFilters, setHavingFilters] = useState(false)

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between p-4">
                <h2 className="font-oswald flex items-center gap-4 text-3xl font-bold text-black/30 uppercase">
                    <span>
                        Tra cứu thông tin <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span className="text-primary">Tra cứu nhà ga</span>
                </h2>
                <div className="flex justify-center gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="relative flex min-w-[120px] cursor-pointer items-center justify-center rounded-md border-2 border-solid border-black bg-black/10 px-6 py-3 font-medium text-black hover:opacity-90">
                                Tìm kiếm
                                {havingFilters && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></div>}
                            </div>
                        </PopoverTrigger>
                        <StationFilter
                            setHavingFilters={setHavingFilters}
                            onChange={buildQuery}
                            onSearch={onFilterSearch}
                            onReset={onResetFilterSearch}
                        />
                    </Popover>

                </div>
            </div>

            <StationTable
                Stations={Stations}
                total={total}
                page={page}
                limit={limit}
                setPage={setPage}
                onSelectStation={(Station: IStation) => {
                    console.log('selected station', Station)
                }}
            />
        </div>
    )
}

export default StationDashboardPage
