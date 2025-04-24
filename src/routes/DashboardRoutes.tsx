import { Suspense } from 'react'
import {
    OverallDashboardPage,
    StaffDashboardPage,
    StationDashboardPage,
    LineDashboardPage,
    AdminDashboardPage,
    IssuedTicketDashboardPage,
    CustomerDashboardPage,
    PriceUpdateDashboardPage,
    SellSingleJourneyDashboardPage,
    SellSubscriptionDashboardPage
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
                path: 'sell-single-journey',
                element: <AuthProtector children={<SellSingleJourneyDashboardPage />} redirect="/auth" allowedRoles={['staff']} />
            },
            {
                path: 'sell-subscription',
                element: <AuthProtector children={<SellSubscriptionDashboardPage />} redirect="/auth" allowedRoles={['staff']} />
            },
            {
                path: 'staffs',
                element: <AuthProtector children={<StaffDashboardPage />} redirect="/auth" allowedRoles={['admin']} />
            },
            {
                path: 'admins',
                element: <AuthProtector children={<AdminDashboardPage />} redirect="/auth" allowedRoles={['admin']} />
            },
            {
                path: 'stations',
                element: <StationDashboardPage />
            },
            {
                path: 'lines',
                element: <LineDashboardPage />
            },
            {
                path: 'issued-tickets',
                element: <IssuedTicketDashboardPage />
            },
            {
                path: 'trips',
                element: <TripDashboardPage />
            },
            {
                path: 'ticket-prices-update',
                element: <PriceUpdateDashboardPage />
            }
        ]
    }
]

export default DashboardRoutes
