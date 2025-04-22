import { Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import ErrorPage from '@/pages/ErrorPage'
import HomePage from '@/pages/HomePage'
import BuyTicketsPage from '@/pages/BuyTicketsPage'

const MainRoutes = [
    {
        path: '/',
        element: (
            <Suspense>
                <MainLayout />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: '/buy-tickets',
                element: <BuyTicketsPage />
            }
        ]
    }
]

export default MainRoutes
