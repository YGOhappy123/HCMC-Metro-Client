import { useEffect } from 'react'
import useTitle from '@/hooks/useTitle'
import StatisticSection from '@/pages/HomePage/StatisticSection'
import HomeHeroSection from '@/pages/HomePage/HomeHeroSection'
import DescriptionSection from '@/pages/HomePage/DescriptionSection'
import GallerySection from '@/pages/HomePage/GallerySection'

const HomePage = () => {
    useTitle('HCMC Metro | Trang Chủ')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <HomeHeroSection />
            <StatisticSection />
            <DescriptionSection />
            <GallerySection />
        </div>
    )
}

export default HomePage
