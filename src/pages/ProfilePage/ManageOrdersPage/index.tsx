import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getMappedSort } from '@/utils/apiSortMapping'
import useTitle from '@/hooks/useTitle'
import useAxiosIns from '@/hooks/useAxiosIns'
import Button from '@/components/common/Button'
import SelectInput from '@/components/common/SelectInput'
import MyOrderCard from '@/pages/ProfilePage/ManageOrdersPage/MyOrderCard'

//     useEffect(() => setPage(1), [activeStatus])

//     const lastPage = Math.ceil([...myBookings.filter(bk => !activeStatus || bk.status === activeStatus)].length / limit)

//     return (
//             <div className="grid grid-cols-3 justify-center gap-4">
//                 <Button
//                     text="Tất cả"
//                     variant={activeStatus === undefined ? 'gradient' : undefined}
//                     onClick={() => setActiveStatus(undefined)}
//                     className="w-full rounded-full text-lg font-semibold capitalize"
//                 />
//                 {['Pending', 'Confirmed', 'Cancelled', 'CheckedIn', 'CheckedOut', 'PaymentDone'].map(status => (
//                     <Button
//                         key={status}
//                         text={getMappedBookingStatus(status)}
//                         variant={activeStatus === status ? 'gradient' : undefined}
//                         onClick={() => setActiveStatus(prev => (prev === status ? undefined : (status as BookingStatus)))}
//                         className="w-full rounded-full text-lg font-semibold capitalize"
//                     />
//                 ))}
//             </div>

//             {myBookings.length > 0 ? (
//                 <>
//                     {[...myBookings.filter(bk => !activeStatus || bk.status === activeStatus)]
//                         .slice((page - 1) * limit, page * limit)
//                         .map(booking => (
//                             <MyBookingCard
//                                 key={booking.id}
//                                 booking={booking}
//                                 fetchMyBookingsQuery={fetchMyBookingsQuery}
//                                 services={availableServices}
//                             />
//                         ))}

//                     <div className="mt-2">
//                         <Pagination>
//                             <PaginationContent>
//                                 <PaginationItem>
//                                     <PaginationPrevious onClick={() => setPage(page === 1 ? 1 : page - 1)} />
//                                 </PaginationItem>
//                                 {Array.from({ length: lastPage }, (_, i) => i + 1).map(num => (
//                                     <PaginationItem key={num}>
//                                         <PaginationLink isActive={num === page} onClick={() => setPage(num)}>
//                                             {num}
//                                         </PaginationLink>
//                                     </PaginationItem>
//                                 ))}
//                                 <PaginationItem>
//                                     <PaginationNext onClick={() => setPage(page === lastPage ? lastPage : page + 1)} />
//                                 </PaginationItem>
//                             </PaginationContent>
//                         </Pagination>
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     <div className="text-left font-semibold text-[#6E6E6E]">
//                         <p className="text-lg">Bạn chưa có đơn đặt phòng nào!</p>
//                         <p>Chúng tôi mong sẽ sớm được gặp bạn tại Stay Mate Hotel &hearts;</p>
//                     </div>
//                     <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
//                         <Button
//                             text="Tìm hiểu thêm"
//                             onClick={() => navigate('/about-us')}
//                             variant="gradient"
//                             className="w-full rounded-full text-lg font-semibold capitalize"
//                         />
//                         <Button
//                             text="Đặt phòng ngay"
//                             onClick={() => navigate('/booking')}
//                             className="w-full rounded-full text-lg font-semibold capitalize"
//                         />
//                     </div>
//                 </>
//             )}
//         </div>
//     )
// }

// export default ManageOrdersPage

const ManageOrdersPage = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(4)
    const [paymentStatus, setPaymentStatus] = useState<boolean | undefined>(undefined)
    const [sort, setSort] = useState<string>('-orderId')

    useTitle('HCMC Metro | Đơn Hàng Của Tôi')
    useEffect(() => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }, [page])

    const navigate = useNavigate()
    const axios = useAxiosIns()

    const fetchMyOrdersQuery = useQuery({
        queryKey: ['my-orders', page, limit, paymentStatus, sort],
        queryFn: () => {
            return axios.get<IResponseData<IOrder[]>>(
                `/customers/my-orders?skip=${limit * (page - 1)}&limit=${limit}&filter=${JSON.stringify(paymentStatus !== undefined ? { payments: paymentStatus } : {})}&sort=${JSON.stringify(getMappedSort(sort))}`
            )
        },
        refetchOnWindowFocus: false,
        refetchInterval: 30000,
        enabled: true,
        select: res => res.data
    })
    const orders = fetchMyOrdersQuery.data?.data ?? []

    useEffect(() => {
        if (page !== 1) {
            setPage(1)
        }
    }, [paymentStatus])

    console.log(orders)

    return (
        <div className="flex w-full flex-col gap-6 lg:w-auto lg:flex-1">
            <h3 className="font-oswald text-primary text-4xl leading-[50px] uppercase">Đơn hàng của tôi</h3>

            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-10">
                    <div className="flex items-center gap-1">
                        <input
                            type="radio"
                            id="all"
                            name="paymentStatus"
                            value="all"
                            checked={paymentStatus === undefined}
                            onChange={() => setPaymentStatus(undefined)}
                            className="accent-primary h-4 w-4 cursor-pointer"
                        />
                        <label htmlFor="all" className="cursor-pointer p-2">
                            Tất cả trạng thái
                        </label>
                    </div>
                    <div className="flex items-center gap-1">
                        <input
                            type="radio"
                            id="paid"
                            name="paymentStatus"
                            value="paid"
                            checked={paymentStatus === true}
                            onChange={() => setPaymentStatus(true)}
                            className="accent-primary h-4 w-4 cursor-pointer"
                        />
                        <label htmlFor="paid" className="cursor-pointer p-2">
                            Đã thanh toán
                        </label>
                    </div>
                    <div className="flex items-center gap-1">
                        <input
                            type="radio"
                            id="unpaid"
                            name="paymentStatus"
                            value="unpaid"
                            checked={paymentStatus === false}
                            onChange={() => setPaymentStatus(false)}
                            className="accent-primary h-4 w-4 cursor-pointer"
                        />
                        <label htmlFor="unpaid" className="cursor-pointer p-2">
                            Chưa thanh toán
                        </label>
                    </div>
                </div>

                <SelectInput
                    fieldName="sort"
                    placeholder="Sắp xếp theo"
                    options={[
                        { value: '-orderId', label: 'Ngày tạo giảm dần' },
                        { value: '+orderId', label: 'Ngày tạo tăng dần' }
                    ]}
                    error=""
                    value={sort}
                    onChange={(value: string | number) => setSort(value as string)}
                    onFocus={() => {}}
                    selectClassName="py-[9px] min-w-[250px]"
                    havingDefaultOptions={false}
                />
            </div>

            {orders.length > 0 && (
                <>
                    {orders.map(order => (
                        <MyOrderCard key={order.orderId} order={order} />
                    ))}

                    <div className="mt-2">
                        {/* <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious onClick={() => setPage(page === 1 ? 1 : page - 1)} />
                                </PaginationItem>
                                {Array.from({ length: lastPage }, (_, i) => i + 1).map(num => (
                                    <PaginationItem key={num}>
                                        <PaginationLink isActive={num === page} onClick={() => setPage(num)}>
                                            {num}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext onClick={() => setPage(page === lastPage ? lastPage : page + 1)} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination> */}
                    </div>
                </>
            )}

            {orders.length <= 0 && !fetchMyOrdersQuery.isFetching && (
                <>
                    <div className="text-center font-semibold text-[#6E6E6E]">
                        {paymentStatus === undefined ? (
                            <p className="text-lg">Bạn chưa có đơn hàng nào!</p>
                        ) : (
                            <p className="text-lg">Bạn chưa có đơn hàng mang trạng thái này!</p>
                        )}
                        <p>Chúng tôi mong sẽ sớm được gặp bạn tại HCMC Metro &hearts;</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
                        <Button
                            text="Tìm hiểu thêm"
                            onClick={() => navigate('/our-services')}
                            variant="gradient"
                            className="w-full rounded-full text-lg font-semibold capitalize"
                        />
                        <Button
                            text="Đặt vé ngay"
                            onClick={() => navigate('/buy-tickets')}
                            className="w-full rounded-full text-lg font-semibold capitalize"
                        />
                    </div>
                </>
            )}
        </div>
    )
}
export default ManageOrdersPage
