import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { INTRODUCTION_VIDEO_URL } from '@/configs/constants'

type ServicesGallerySectionProps = {
    images: {
        gallery: {
            feature: string
            top: string[]
            bottom: string[]
        }
        banner: string
    }
}

const ServicesGallerySection = ({ images }: ServicesGallerySectionProps) => {
    const navigate = useNavigate()

    return (
        <>
            <div className="max-w-container flex w-full flex-col gap-9">
                <div className="flex flex-col items-center gap-5">
                    <p className="text-secondary font-semibold tracking-widest uppercase">Bộ sưu tập các khoảnh khắc tại HCMC Metro</p>
                    <p className="font-serif text-5xl leading-[1.4] font-semibold text-balance">HCMC Metro - Địa điểm check-in không thể bỏ qua</p>
                </div>
                <div className="grid grid-cols-12 gap-[30px]">
                    <div className="relative col-span-6 h-[320px]">
                        <div
                            className="h-full rounded-3xl bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${images.gallery.feature})`
                            }}
                        ></div>
                        <div className="absolute inset-0 flex flex-col justify-end rounded-3xl bg-linear-[180deg,rgba(0,0,0,0.04)_0%,rgba(38,91,158,0.83)_66%] p-[35px]">
                            <div className="flex items-center gap-[60px]">
                                <div className="flex-1">
                                    <p className="text-ivory font-serif text-2xl font-semibold">Tiện nghi hiện đại</p>
                                    <p className="mt-2 text-justify text-lg text-white/75">
                                        Các nhà ga và tàu điện đều được lắp đặt các thiết bị hiện đại và cao cấp, đảm bảo một trải nghiệm tốt nhất
                                    </p>
                                </div>
                                <Link
                                    className="bg-secondary hover:bg-secondary/90 flex aspect-square w-[90px] cursor-pointer items-center justify-center rounded-full"
                                    to={INTRODUCTION_VIDEO_URL}
                                >
                                    <FontAwesomeIcon icon={faPlay} className="text-white" size="2xl" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    {images.gallery.top.map(imageUrl => (
                        <div key={imageUrl} className="col-span-3 h-[320px]">
                            <div
                                className="h-full rounded-3xl bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${imageUrl})`
                                }}
                            ></div>
                        </div>
                    ))}
                    {images.gallery.bottom.map(imageUrl => (
                        <div key={imageUrl} className="col-span-4 h-[320px]">
                            <div
                                className="h-full rounded-3xl bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${imageUrl})`
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-container w-full pt-[100px]">
                <div className="relative aspect-[10/4]">
                    <div
                        className="h-full rounded-3xl bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${images.banner})`
                        }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-linear-[90deg,rgba(38,91,158,0.95)_0%,rgba(0,0,0,0.11)_100%] p-[35px]">
                        <div className="flex max-w-[720px] flex-col items-center gap-5">
                            <p className="text-ivory text-center font-serif text-5xl leading-[1.4] font-semibold text-balance">
                                Cùng tận hưởng tờ vé tàu phù hợp với ước mơ của bạn!
                            </p>
                            <p className="text-justify text-xl text-white/75">Còn rất nhiều dịch vụ tuyệt vời đang chờ bạn khám phá tại HCMC Metro</p>
                            <button
                                className="bg-primary text-ivory hover:bg-primary/90 flex h-[60px] w-[280px] cursor-pointer items-center justify-center rounded-full font-semibold tracking-widest uppercase"
                                onClick={() => navigate('/buy-tickets')}
                            >
                                Đặt vé ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServicesGallerySection
