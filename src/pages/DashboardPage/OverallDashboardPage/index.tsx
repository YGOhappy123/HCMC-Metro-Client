import statisticService, { StatisticCriteria } from '@/services/statisticService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { getMappedSalesOrigin } from '@/utils/paymentMethodMapping'
import Button from '@/components/common/Button'
import NewestCustomerTable from '@/pages/DashboardPage/OverallDashboardPage/NewestCustomerTable'
import HighestRevenueCustomerTable from '@/pages/DashboardPage/OverallDashboardPage/HighestRevenueCustomerTable'
import RevenuesChart from '@/pages/DashboardPage/OverallDashboardPage/RevenuesChart'
import StatisticCard from '@/pages/DashboardPage/OverallDashboardPage/StatisticCard'
import OriginsChart from '@/pages/DashboardPage/OverallDashboardPage/OriginsChart'

const STATISTIC_CRITERIA_BUTTONS = [
    {
        label: 'Hôm nay',
        value: 'daily'
    },
    {
        label: 'Tuần này',
        value: 'weekly'
    },
    {
        label: 'Tháng này',
        value: 'monthly'
    },
    {
        label: 'Năm nay',
        value: 'yearly'
    }
]

const OverallDashboardPage = () => {
    const { type, setType, getSummaryDataQuery, getPopularDataQuery, getRevenuesChartQuery, getOriginsChartQuery } = statisticService({
        enableFetching: true
    })

    const userCounts = getSummaryDataQuery.data?.users
    const ticketCounts = getSummaryDataQuery.data?.ticketCount
    const revenueCounts = getSummaryDataQuery.data?.revenues
    const revenuesChartData = getRevenuesChartQuery.data
    const originsChartData = getOriginsChartQuery.data
    const newestCustomers = getPopularDataQuery.data?.newestCustomers
    const highestRevenueCustomers = getPopularDataQuery.data?.highestRevenueCustomers

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between p-4">
                <h2 className="font-oswald flex items-center gap-4 text-3xl font-bold text-black/30 uppercase">
                    <span>
                        HCMC Metro <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span className="text-primary">Tình hình hoạt động</span>
                </h2>

                <div className="flex justify-center gap-4">
                    {STATISTIC_CRITERIA_BUTTONS.map(button => (
                        <Button
                            key={button.value}
                            text={button.label}
                            variant={type === button.value ? 'gradient' : undefined}
                            onClick={() => setType(button.value as StatisticCriteria)}
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="col-span-2 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-3">
                    <StatisticCard
                        loading={getSummaryDataQuery.isLoading}
                        value={(revenueCounts?.currentCount ?? 0) * 1000}
                        previousValue={(revenueCounts?.previousCount ?? 0) * 1000}
                        label="Doanh thu"
                        unit="Vnđ"
                        to="/dashboard/transactions"
                    />
                    <StatisticCard
                        loading={getSummaryDataQuery.isLoading}
                        value={userCounts?.currentCount ?? 0}
                        previousValue={userCounts?.previousCount ?? 0}
                        label="Khách hàng mới"
                        unit="Tài khoản"
                        to="/dashboard/customers"
                    />
                    <StatisticCard
                        loading={getSummaryDataQuery.isLoading}
                        value={ticketCounts?.currentCount ?? 0}
                        previousValue={ticketCounts?.previousCount ?? 0}
                        label="Vé đã bán ra"
                        unit="Vé"
                        to="/dashboard/ticketCounts"
                    />
                </div>

                <div className="col-span-2">
                    <RevenuesChart
                        loading={getRevenuesChartQuery.isLoading}
                        data={revenuesChartData}
                        title={`Biểu đồ doanh thu trong ${STATISTIC_CRITERIA_BUTTONS.find(item => item.value === type)?.label.toLocaleLowerCase()}`}
                    />
                </div>

                <div className="col-span-2 grid grid-cols-2 gap-5">
                    <OriginsChart
                        loading={getOriginsChartQuery.isLoading}
                        data={(originsChartData ?? []).map((item: any) => ({
                            name: getMappedSalesOrigin(item.origin),
                            value: item.totalUnits
                        }))}
                        title={`Biểu đồ (%) số lượng vé bán ra trong ${STATISTIC_CRITERIA_BUTTONS.find(item => item.value === type)?.label.toLocaleLowerCase()}`}
                    />
                    <OriginsChart
                        loading={getOriginsChartQuery.isLoading}
                        data={(originsChartData ?? []).map((item: any) => ({
                            name: getMappedSalesOrigin(item.origin),
                            value: item.totalSales * 1000
                        }))}
                        title={`Biểu đồ (%) doanh thu bán vé trong ${STATISTIC_CRITERIA_BUTTONS.find(item => item.value === type)?.label.toLocaleLowerCase()}`}
                    />
                </div>

                <div className="col-span-2">
                    <HighestRevenueCustomerTable guests={highestRevenueCustomers ?? []} />
                </div>

                <div className="col-span-2">
                    <NewestCustomerTable guests={newestCustomers ?? []} />
                </div>
            </div>
        </div>
    )
}

export default OverallDashboardPage
