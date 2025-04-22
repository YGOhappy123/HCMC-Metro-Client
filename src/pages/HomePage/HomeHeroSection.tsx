import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { INTRODUCTION_VIDEO_URL } from '@/configs/constants'
import BackgroundPoster from '@/components/ui/BackgroundPoster'

const HomeHeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="relative">
            <BackgroundPoster imageUrl="https://metrohanoi.vn/wp-content/uploads/2018/09/So-Tay-TT_T32-banner.jpg" size="big" />

            <div className="max-w-container absolute bottom-[90px] left-1/2 grid w-full -translate-x-1/2 grid-cols-5 gap-[60px] px-5 2xl:bottom-[170px]">
                <div className="col-span-3 flex flex-col gap-6">
                    <p className="text-ivory font-semibold uppercase">Dịch vụ giao thông công cộng tốt nhất tại Thành phố Hồ Chí Minh</p>
                    <p className="text-ivory font-serif text-5xl leading-[1.4] font-semibold capitalize">
                        Nào, <span className="text-secondary">hãy cùng tìm</span> tờ vé tàu lý tưởng của bạn{' '}
                        <span className="text-secondary">tại đây ...</span>
                    </p>
                    <p className="text-ivory font-semibold capitalize">
                        Chuyến đi mơ ước của bạn, chỉ cách một cú nhấp chuột: Tìm sự thoải mái cho chuyến đi của bạn tại thành phố Hồ Chí Minh
                    </p>
                    <div className="flex items-center gap-6">
                        <button
                            className="bg-accent text-ivory hover:bg-accent/90 flex h-[60px] w-[280px] cursor-pointer items-center justify-center rounded-full font-semibold tracking-widest uppercase"
                            onClick={() => navigate('/our-services')}
                        >
                            Tìm hiểu thêm
                        </button>
                        <button
                            className="bg-ivory text-primary hover:bg-ivory/90 flex h-[60px] w-[230px] cursor-pointer items-center justify-center rounded-full font-semibold tracking-widest uppercase"
                            onClick={() => navigate('/buy-tickets')}
                        >
                            Đặt vé
                        </button>
                    </div>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                    <Link
                        className="bg-secondary hover:bg-secondary/90 flex aspect-square w-[90px] cursor-pointer items-center justify-center rounded-full"
                        to={INTRODUCTION_VIDEO_URL}
                    >
                        <FontAwesomeIcon icon={faPlay} className="text-white" size="2xl" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HomeHeroSection
