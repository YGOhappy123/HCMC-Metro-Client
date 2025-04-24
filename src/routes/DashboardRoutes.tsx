import { Suspense } from 'react'
import {
    OverallDashboardPage,
    StaffDashboardPage,
    IssuedTicketDashboardPage,
    CustomerDashboardPage,
    PriceUpdateDashboardPage,
    AdminDashboardPage
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
            {
                path: 'customers',
                element: <CustomerDashboardPage />
            },
            {
                path: 'admins',
                element: <AdminDashboardPage />
            },
            {
                path: 'staffs',
                element: <AuthProtector children={<StaffDashboardPage />} redirect="/auth" allowedRoles={['admin']} />
            },
            {
                path: 'issued-tickets',
                element: <AuthProtector children={<IssuedTicketDashboardPage />} redirect="/auth" allowedRoles={['admin', 'staff']} />
            },
            {
                path: 'trips',
                element: <AuthProtector children={<TripDashboardPage />} redirect="/auth" allowedRoles={['admin']} />
            },
            {
                path: 'ticket-prices-update',
                element: <PriceUpdateDashboardPage />
            }
        ]
    }
]

export default DashboardRoutes
