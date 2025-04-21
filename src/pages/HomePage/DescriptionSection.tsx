import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

const DESCRIPTION_IMAGES = [
    'https://cafefcdn.com/203337114487263232/2024/10/14/metro-so-1-tphcm-con-nhieu-ton-tai-chua-du-dieu-kien-nghiem-thu-18957-1728889475383-17288894760931397653419.jpg',
    'https://cdn.daibieunhandan.vn/images/7d9f8ecb37067d05677df4b645a4a0e09deefe27e8df4487b4ea360d21b28ae468a253ef8f6ff8e98ae864d6fd72bf6d/1-8167.jpg',
    'https://staticgthn.kinhtedothi.vn/Uploaded/ngoctranggthn/2024_11_05/anh_chup_man_hinh_2024-11-05_luc_17_24_20_MNVK.png'
]

const DescriptionSection = () => {
    return (
        <section className="bg-ivory flex flex-col items-center px-5 py-[100px]">
            <div className="max-w-container flex w-full flex-col gap-9">
                <div className="flex items-center justify-between">
                    <div className="flex max-w-[70%] flex-col gap-5">
                        <p className="text-secondary font-semibold tracking-widest uppercase">Vài nét về chúng tôi</p>
                        <p className="font-serif text-5xl leading-[1.4] font-semibold text-balance">
                            Tàu điện Việt Nam với giá cả phải chăng cùng các tiện ích hiện đại
                        </p>
                    </div>
                    <Link to="/our-services">
                        <div className="text-primary font-semibold tracking-widest uppercase">
                            Tìm hiểu thêm <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-[30px] pt-10">
                    <div className="relative flex flex-col items-start gap-5 pr-5 pl-[50px]">
                        <div
                            className="bg-accent absolute bottom-0 left-0 rounded-t-3xl"
                            style={{
                                width: 'calc(100% + 120px)',
                                height: 'calc(100% + 40px)'
                            }}
                        ></div>
                        <FontAwesomeIcon icon={faQuoteLeft} className="z-[1] text-[#DADADA]" size="3x" />
                        <p className="z-[1] text-lg font-semibold text-white/75 italic xl:text-[22px] xl:leading-[1.2] 2xl:text-[26px] 2xl:leading-[1.3]">
                            "On Track for a Better Tomorrow!"
                        </p>
                    </div>
                    {DESCRIPTION_IMAGES.map(imageUrl => (
                        <div key={imageUrl} className="bg-ivory z-[1] h-[175px] rounded-t-3xl px-[10px] pt-[10px] lg:h-[200px]">
                            <div
                                className="h-full rounded-t-2xl bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${imageUrl})`
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default DescriptionSection
