import { useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Popover, PopoverTrigger } from '@/components/ui/Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import CustomerTable from '@/pages/DashboardPage/CustomerDashboardPage/CustomerTable'
import CustomerFilter from '@/pages/DashboardPage/CustomerDashboardPage/CustomerFilter'
import TicketDialog from '@/pages/DashboardPage/CustomerDashboardPage/TicketDialog'
import customerService from '@/services/customerService'

const CustomerDashboardPage = () => {
    const { customers, total, page, limit, setPage, buildQuery, onFilterSearch, onResetFilterSearch, deactivateCustomerMutation } = customerService({
        enableFetching: true
    })

    const [havingFilters, setHavingFilters] = useState(false)
    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null)

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between p-4">
                <h2 className="font-oswald flex items-center gap-4 text-3xl font-bold text-black/30 uppercase">
                    <span>
                        Tra cứu thông tin <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span className="text-primary">Danh sách khách hàng</span>
                </h2>
                <div className="flex justify-center gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="relative flex min-w-[120px] cursor-pointer items-center justify-center rounded-md border-2 border-solid border-black bg-black/10 px-6 py-3 font-medium text-black hover:opacity-90">
                                Tìm kiếm
                                {havingFilters && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></div>}
                            </div>
                        </PopoverTrigger>
                        <CustomerFilter
                            setHavingFilters={setHavingFilters}
                            onChange={buildQuery}
                            onSearch={onFilterSearch}
                            onReset={onResetFilterSearch}
                        />
                    </Popover>
                </div>
            </div>

            <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
                <TicketDialog customer={selectedCustomer} closeDialog={() => setIsTicketDialogOpen(false)} />
            </Dialog>

            <CustomerTable
                customers={customers}
                total={total}
                page={page}
                limit={limit}
                setPage={setPage}
                onSelectCustomer={(customer: ICustomer) => {
                    setSelectedCustomer(customer)
                    setIsTicketDialogOpen(true)
                }}
                deactivateCustomerMutation={deactivateCustomerMutation}
            />
        </div>
    )
}

export default CustomerDashboardPage
