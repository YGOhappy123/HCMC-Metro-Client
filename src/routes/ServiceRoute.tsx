import path from "path";
import { Children, lazy, Suspense } from "react";

const ServicePage = lazy(()=> import('@/pages/ServicePage/ServicePage'));
const ErrorPage = lazy(()=> import('@/pages/ErrorPage'))
const MainLayout = lazy(()=> import('@/layouts/MainLayout'));

const ServiceRoute = [
    {
        path : '/our-services',
        element: (
            <Suspense fallback={"loading"}>
                <MainLayout />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children : [
            {
                index : true,
                element: (
                    <Suspense fallback={'loading'}>
                        <ServicePage />
                    </Suspense>
                )
            }
        ]
    }
]
export default ServiceRoute;