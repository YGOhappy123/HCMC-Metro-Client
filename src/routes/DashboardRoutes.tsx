import { Suspense } from 'react'
import {
    OverallDashboardPage,
    StaffDashboardPage,
    // RoomDashboardPage,
    // RoomClassDashboardPage,
    // FloorDashboardPage,
    // FeatureDashboardPage,
    // ServiceDashboardPage,
    CustomerDashboardPage
    // AdminDashboardPage,
    // BookingDashboardPage,
    // TransactionDashboardPage,
    // ServiceBookingDashboardPage
} from '@/pages/DashboardPage'
import DashboardLayout from '@/layouts/DashboardLayout'
import ErrorPage from '@/pages/ErrorPage'
import AuthProtector from '@/components/container/AuthProtector'

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
            }
            // {
            //     path: 'bookings',
            //     element: <BookingDashboardPage />
            // },
            // {
            //     path: 'transactions',
            //     element: <TransactionDashboardPage />
            // },
            // {
            //     path: 'service-bookings',
            //     element: <ServiceBookingDashboardPage />
            // }
        ]
    }
]

export default DashboardRoutes
