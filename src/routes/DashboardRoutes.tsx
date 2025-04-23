import { Suspense } from 'react'
import {
    OverallDashboardPage,
    StaffDashboardPage,
    StationDashboardPage,
    LineDashboardPage,
    TicketPriceLookupDashboardPage,
    IssuedTicketDashboardPage,
    // RoomDashboardPage,
    // RoomClassDashboardPage,
    // FloorDashboardPage,
    // FeatureDashboardPage,
    // ServiceDashboardPage,
    CustomerDashboardPage,
    // AdminDashboardPage,
    // BookingDashboardPage,
    // TransactionDashboardPage,
    PriceUpdateDashboardPage
} from '@/pages/DashboardPage'
import DashboardLayout from '@/layouts/DashboardLayout'
import ErrorPage from '@/pages/ErrorPage'
import AuthProtector from '@/components/container/AuthProtector'
import TripDashboardPage from '@/pages/DashboardPage/TripDashboardPage'

const DashboardRoutes = [
    {
        path: '/dashboard',
        element: (
            <Suspense>
                <AuthProtector children={<DashboardLayout />} redirect="/auth" allowedRoles={['admin', 'staff']} />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <OverallDashboardPage />
            },
            // {
            //     path: 'rooms',
            //     element: <RoomDashboardPage />
            // },
            // {
            //     path: 'room-classes',
            //     element: <RoomClassDashboardPage />
            // },
            // {
            //     path: 'floors',
            //     element: <FloorDashboardPage />
            // },
            // {
            //     path: 'services',
            //     element: <ServiceDashboardPage />
            // },
            // {
            //     path: 'features',
            //     element: <FeatureDashboardPage />
            // },
            // {
            //     path: 'services',
            //     element: <ServiceDashboardPage />
            // },
            {
                path: 'customers',
                element: <CustomerDashboardPage />
            },
            // {
            //     path: 'admins',
            //     element: <AdminDashboardPage />
            // },
            {
                path: 'staffs',
                element: <AuthProtector children={<StaffDashboardPage />} redirect="/auth" allowedRoles={['admin']} />
            },
            {
                path: 'stations',
                element: <AuthProtector children={<StationDashboardPage />} redirect="/auth" allowedRoles={['admin']} />
            },
            {
                path: 'lines',
                element: <AuthProtector children={<LineDashboardPage />} redirect="/auth" allowedRoles={['admin']} />
            },
            {
                path: 'ticket-prices',
                element: <AuthProtector children={<TicketPriceLookupDashboardPage />} redirect="/auth" allowedRoles={['admin', 'staff']} />
            },
            {
                path: 'issued-tickets',
                element: <AuthProtector children={<IssuedTicketDashboardPage />} redirect="/auth" allowedRoles={['admin', 'staff']} />
            },
            {
                path: 'trips',
                element: <AuthProtector children={<TripDashboardPage />} redirect="/auth" allowedRoles={['admin']} />
            },
            // {
            //     path: 'bookings',
            //     element: <BookingDashboardPage />
            // },
            // {
            //     path: 'transactions',
            //     element: <TransactionDashboardPage />
            // },
            {
                path: 'ticket-prices-update',
                element: <PriceUpdateDashboardPage />
            }
        ]
    }
]

export default DashboardRoutes
