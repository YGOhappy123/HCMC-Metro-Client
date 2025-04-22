import { useEffect } from 'react'
import useTitle from '@/hooks/useTitle'
import BuyTicketsSection from '@/pages/BuyTicketsPage/BuyTicketsSection'

const BuyTicketsPage = () => {
    useTitle('HCMC Metro | Mua Vé')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <BuyTicketsSection />
        </div>
    )
}

export default BuyTicketsPage
