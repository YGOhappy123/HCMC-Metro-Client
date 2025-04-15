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

const StaffDashboardPage = () => {
    const axios = useAxiosIns()
    const {
        staffs,
        total,
        page,
        limit,
        setPage,
        createStaffMutation,
        updateStaffMutation,
        deactivateStaffMutation,
        buildQuery,
        onFilterSearch,
        onResetFilterSearch
    } = staffService({ enableFetching: true })

    const fetchAllStationsQuery = useQuery({
        queryKey: ['stations-all'],
        queryFn: () => axios.get<IResponseData<IStation[]>>('/stations/metro-stations'),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: true,
        select: res => res.data
    })
    const stations = fetchAllStationsQuery.data?.data || []

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null)
    const [havingFilters, setHavingFilters] = useState(false)

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between p-4">
                <h2 className="font-oswald flex items-center gap-4 text-3xl font-bold text-black/30 uppercase">
                    <span>
                        Quản lý hệ thống <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span className="text-primary">Quản lý nhân viên</span>
                </h2>
                <div className="flex justify-center gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="relative flex min-w-[120px] cursor-pointer items-center justify-center rounded-md border-2 border-solid border-black bg-black/10 px-6 py-3 font-medium text-black hover:opacity-90">
                                Tìm kiếm
                                {havingFilters && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></div>}
                            </div>
                        </PopoverTrigger>
                        <StaffFilter
                            stations={stations}
                            setHavingFilters={setHavingFilters}
                            onChange={buildQuery}
                            onSearch={onFilterSearch}
                            onReset={onResetFilterSearch}
                        />
                    </Popover>

                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger>
                            <div className="border-primary bg-primary min-w-[120px] cursor-pointer rounded-md border-2 border-solid px-6 py-3 font-medium text-white hover:opacity-90">
                                Thêm mới
                            </div>
                        </DialogTrigger>
                        <CreateStaffDialog
                            stations={stations}
                            isOpen={isAddModalOpen}
                            closeDialog={() => setIsAddModalOpen(false)}
                            createStaffMutation={createStaffMutation}
                        />
                    </Dialog>

                    <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
                        <UpdateStaffDialog
                            selectedStaff={selectedStaff}
                            isOpen={isUpdateModalOpen}
                            stations={stations}
                            closeDialog={() => setIsUpdateModalOpen(false)}
                            updateStaffMutation={updateStaffMutation}
                        />
                    </Dialog>
                </div>
            </div>

            <StaffTable
                staffs={staffs}
                total={total}
                page={page}
                limit={limit}
                setPage={setPage}
                onSelectStaff={(staff: IStaff) => {
                    setSelectedStaff(staff)
                    setIsUpdateModalOpen(true)
                }}
                deactivateStaffMutation={deactivateStaffMutation}
            />
        </div>
    )
}

export default StaffDashboardPage
