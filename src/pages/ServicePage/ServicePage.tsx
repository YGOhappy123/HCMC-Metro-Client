import { lazy } from "react";

const Banner = lazy(()=> import('./Banner'));
const Service = lazy(()=> import('./Service'));

const ServicePage : React.FC = () => {
    return (
        <>
            <Banner />
            <Service />
        </>
    );
}

export default ServicePage;