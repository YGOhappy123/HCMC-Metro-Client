import { useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHotel } from '@fortawesome/free-solid-svg-icons'
import useTitle from '@/hooks/useTitle'
import useAxiosIns from '@/hooks/useAxiosIns'
import dayjs from 'dayjs'

const ThankYouPage = () => {
    useTitle('HCMC Metro | Tri Ân')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [searchParams] = useSearchParams()
    const axios = useAxiosIns()
    const navigate = useNavigate()

    useEffect(() => {
        const verifyPayment = async () => {
            const queryString = searchParams.toString()
            await axios.get(`/customers/tickets/verify-payment?${queryString}`)
        }

        verifyPayment()
    }, [searchParams])

    const paymentMethod = searchParams.get('vnp_BankCode')
    const message = useMemo(() => {
        switch (searchParams.get('vnp_ResponseCode')) {
            case '00':
                return 'Giao dịch thành công'
            case '07':
                return 'Giao dịch thất bại: Phát hiện dấu hiệu bất thường'
            case '09':
                return 'Giao dịch thất bại: Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking'
            case '10':
                return 'Giao dịch thất bại: Khách hàng xác thực thông tin tài khoản sai quá 3 lần'
            case '11':
                return 'Giao dịch thất bại: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch'
            case '12':
                return 'Giao dịch thất bại: Tài khoản của khách hàng bị khóa'
            case '13':
                return 'Giao dịch thất bại: Quý khách nhập sai mật khẩu xác thực giao dịch (OTP)'
            case '24':
                return 'Giao dịch thất bại: Khách hàng hủy giao dịch'
            case '51':
                return 'Giao dịch thất bại: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch'
            case '65':
                return 'Giao dịch thất bại: Tài khoản của quý khách đã vượt quá hạn mức giao dịch trong ngày'
            case '75':
                return 'Giao dịch thất bại: Ngân hàng thanh toán đang bảo trì'
            case '79':
                return 'Giao dịch thất bại: Khách hàng nhập sai mật khẩu thanh toán quá số lần quy định'
            default:
                return 'Giao dịch thất bại: Lỗi không xác định'
        }
    }, [searchParams.get('vnp_ResponseCode')])

    return (
        <div className="flex h-screen items-center justify-between bg-[#FAFAFB] text-[#699282]">
            <img src="/images/tkp-left-pattern.png" alt="thank-you-page-asset" className="h-full" />

            <div>
                <div className="mb-[45px] flex flex-col items-center gap-5">
                    <img src="/images/tkp-title.png" alt="thank-you-page-asset" className="w-[650px]" />
                    <p className="text-xl font-medium uppercase">Cảm ơn bạn đã ủng hộ HCMC Metro</p>
                </div>
                <div className="flex flex-col items-center">
                    <h4 className="text-lg font-medium">{message}</h4>
                    <p className="text-black/45">Ngày thanh toán: {dayjs(searchParams.get('vnp_PayDate')).format('HH:mm:ss DD/MM/YYYY')}</p>
                    <p className="mb-[30px] text-black/45">
                        Mã đơn hàng: {searchParams.get('vnp_TxnRef')} - {paymentMethod}
                    </p>
                    <div className="flex items-center gap-6">
                        <button
                            className="flex h-[60px] w-[250px] cursor-pointer items-center justify-center gap-3 rounded-full bg-[#699282] font-semibold tracking-widest text-[#D9D9D9] uppercase hover:bg-[#699282]/90"
                            onClick={() => navigate('/profile/orders')}
                        >
                            <FontAwesomeIcon icon={faHotel} size="lg" /> Quản lý đơn
                        </button>
                        <button
                            className="flex h-[60px] w-[250px] cursor-pointer items-center justify-center gap-3 rounded-full bg-[#D9D9D9] font-semibold tracking-widest text-[#699282] uppercase hover:bg-[#D9D9D9]/90"
                            onClick={() => navigate('/')}
                        >
                            <FontAwesomeIcon icon={faHome} size="lg" /> Về trang chủ
                        </button>
                    </div>
                </div>
            </div>

            <img src="/images/tkp-right-pattern.png" alt="thank-you-page-asset" className="h-full" />
        </div>
    )
}

export default ThankYouPage
