import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Dialog, DialogTrigger } from '@/components/ui/Dialog'
import { Popover, PopoverTrigger } from '@/components/ui/Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import StaffTable from '@/pages/DashboardPage/StaffDashboardPage/StaffTable'
import CreateStaffDialog from '@/pages/DashboardPage/StaffDashboardPage/CreateStaffDialog'
import StaffFilter from '@/pages/DashboardPage/StaffDashboardPage/StaffFilter'
import staffService from '@/services/staffService'
import useAxiosIns from '@/hooks/useAxiosIns'
import UpdateStaffDialog from '@/pages/DashboardPage/StaffDashboardPage/UpdateStaffDialog'
import { Form } from '@/components/ui/Form'
import TicketPriceLookupForm from './TicketPriceLookupForm'
import PathTable from './PathTable'
import Spinner from '@/components/ui/Spinner'

type FormValues = {
    fromStationId: number | ''
    toStationId: number | ''
    paymentMethod: string
}

const TicketPriceLookupDashboardPage = () => {
    const [searchCriteria, setSearchCriteria] = useState<FormValues | null>(null)

    function handleSearchSubmit(values: FormValues) {
        setSearchCriteria(values)
    }

    function handleReset() {
        setSearchCriteria(null)
    }

    const axios = useAxiosIns()

    const fetchAllStationsQuery = useQuery({
        queryKey: ['stations-all'],
        queryFn: () => axios.get<IResponseData<IStation[]>>('/stations/metro-stations'),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: true,
        select: res => res.data
    })
    const stations = fetchAllStationsQuery.data?.data || []

    const { isLoading, data: paths = [] } = useQuery({
        queryKey: ['paths', searchCriteria],
        queryFn: () => {
            if (!searchCriteria) return null

            return axios.get<IResponseData<IPath[]>>('/stations/metro-path-enriched', {
                params: {
                    start: searchCriteria.fromStationId,
                    end: searchCriteria.toStationId,
                    method: searchCriteria.paymentMethod
                }
            })
        },
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: !!searchCriteria,
        select: res => res?.data.data || []
    })

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between p-4">
                <h2 className="font-oswald flex items-center gap-4 text-3xl font-bold text-black/30 uppercase">
                    <span>
                        Tra cứu thông tin <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span className="text-primary">Tra cứu giá vé</span>
                </h2>
            </div>

            <h2 className="font-oswald text-center text-3xl font-bold text-black/30 uppercase">
                <span>Nhập thông tin</span>
            </h2>
            <TicketPriceLookupForm stations={stations} onSubmit={handleSearchSubmit} onReset={handleReset} />
            {paths.length > 0 && <PathTable paths={paths} />}
        </div>
    )
}

export default TicketPriceLookupDashboardPage
