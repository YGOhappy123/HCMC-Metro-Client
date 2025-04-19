import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import ServicesGallerySection from '@/pages/HomePage/ServicesGallerySection'

const DESCRIPTION_IMAGES = {
    gallery: {
        feature:
            'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        top: [
            'https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1615529179035-e760f6a2dcee?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        bottom: [
            'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1617806265182-7b3f847f0b75?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1602872029708-84d970d3382b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ]
    },
    banner: 'https://cdnv2.tgdd.vn/mwg-static/common/News/1259810/cach-tra-cuu-lo-trinh-tuyen-metro-so-1-aH2.jpg'
}

const HIGHLIGHTED_TICKETS = [
    {
        image: 'https://tphcm.cdnchinhphu.vn/zoom/700_438/334895287454388224/2024/11/21/metro-1-tphcm-may-ban-ve-17321684510701317448598-41-0-1041-1600-crop-17321685340821302591316.jpg',
        name: 'Vé một chặng',
        description: 'Đây là loại vé tiện dụng khi bạn muốn di chuyển giữa 2 nhà ga khác nhau và sử dụng được một lần, với giá chỉ từ 6.000đ mỗi lượt'
    },
    {
        image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/10/1227234/Metro-So-1.3.jpg',
        name: 'Vé thời hạn',
        description:
            'Đây là loại vé giúp bạn di chuyển không giới hạn trong thời gian hiệu lực, với giá chỉ từ 40.000đ mỗi ngày và 300.000đ mỗi tháng'
    },
    {
        image: 'https://media.vov.vn/sites/default/files/styles/front_large/public/2024-12/z6152874642059_a2b4009d80b6ca29d5118555fddaea06.jpg?resize=p_8,w_',
        name: 'Thẻ tích lũy SFC',
        description:
            'Đây là loại thẻ cho phép bạn nạp tiền tích lũy và trừ sau mỗi chuyến đi thay vì phải mua vé nhiều lần, bạn có thể rút số dư bất cứ lúc nào'
    }
]

const GallerySection = () => {
    return (
        <section className="bg-ivory flex flex-col items-center px-5 py-[100px]">
            <ServicesGallerySection images={DESCRIPTION_IMAGES} />

            <div className="max-w-container flex w-full flex-col gap-9 pt-[100px]">
                <div className="flex items-center justify-between">
                    <div className="flex max-w-[70%] flex-col gap-5">
                        <p className="text-secondary font-semibold tracking-widest uppercase">Vài dịch vụ nổi bật của chúng tôi</p>
                        <p className="font-serif text-5xl leading-[1.4] font-semibold text-balance">
                            HCMC Metro mang cho bạn các loại vé và thẻ với giá cả và tác dụng đa dạng.
                        </p>
                    </div>
                    <Link to="/buy-tickets">
                        <div className="text-primary font-semibold tracking-widest uppercase">
                            Đặt vé ngay <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </Link>
                </div>
                <div className="grid grid-cols-3 gap-[30px] px-3">
                    {HIGHLIGHTED_TICKETS.map(ticket => (
                        <div key={ticket.name} className="flex flex-col overflow-hidden rounded-3xl">
                            <div
                                className="aspect-[8/5] bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${ticket.image})`
                                }}
                            ></div>
                            <div className="flex flex-1 flex-col gap-[26px] bg-white p-[35px]">
                                <div>
                                    <p className="font-serif text-[25px] font-semibold text-balance">{ticket.name}</p>
                                    <div className="mt-[15px] line-clamp-3 text-lg text-[#6E6E6E]">{ticket.description}</div>
                                </div>
                                <Link to="/buy-tickets" className="mt-auto">
                                    <div className="text-primary font-semibold tracking-widest uppercase">
                                        Đặt vé ngay <FontAwesomeIcon icon={faArrowRight} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default GallerySection
