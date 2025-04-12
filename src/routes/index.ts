import { createBrowserRouter } from 'react-router-dom'
import MainRoutes from '@/routes/MainRoutes'
import AuthRoutes from '@/routes/AuthRoutes'
import DashboardRoutes from '@/routes/DashboardRoutes'

const developmentRoutes = createBrowserRouter([...MainRoutes, ...AuthRoutes, ...DashboardRoutes])
const testingRoutes = createBrowserRouter([...MainRoutes, ...AuthRoutes, ...DashboardRoutes])
const productionRoutes = createBrowserRouter([...MainRoutes, ...AuthRoutes, ...DashboardRoutes])

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
