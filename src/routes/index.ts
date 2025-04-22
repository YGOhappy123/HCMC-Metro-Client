import { createBrowserRouter } from 'react-router-dom'
import MainRoutes from '@/routes/MainRoutes'
import AuthRoutes from '@/routes/AuthRoutes'
import DashboardRoutes from '@/routes/DashboardRoutes'
import ProfileRoutes from '@/routes/ProfileRoutes'
import ServiceRoute from './ServiceRoute'

const developmentRoutes = createBrowserRouter([...MainRoutes, ...AuthRoutes, ...ProfileRoutes, ...DashboardRoutes, ...ServiceRoute])
const testingRoutes = createBrowserRouter([...MainRoutes, ...AuthRoutes, ...ProfileRoutes, ...DashboardRoutes, ...ServiceRoute])
const productionRoutes = createBrowserRouter([...MainRoutes, ...AuthRoutes, ...ProfileRoutes, ...DashboardRoutes, ...ServiceRoute])

const getRouter = (environment: 'development' | 'testing' | 'production') => {
    switch (environment) {
        case 'development':
            return developmentRoutes
        case 'testing':
            return testingRoutes
        case 'production':
            return productionRoutes
    }
}

export default getRouter
