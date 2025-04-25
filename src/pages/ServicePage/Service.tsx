import { LucideNavigation, PictureInPicture2, Zap } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Service: React.FC = () => {
    return (
        <>
            <div>
                <div className="mx-auto max-w-5xl px-[50px] py-[70px] text-justify">
                    <h2 className="text-primary mb-[30px] text-center text-4xl font-medium">Bạn là người bận rộn ?</h2>
                    <p className="mb-3 text-[20px] leading-7 font-semibold tracking-wide text-slate-500">
                        Bạn đang tìm cách di chuyển trong thành phố nhanh chóng, tiết kiệm và không còn lo kẹt xe? Metro TP.HCM chính là lựa chọn lý
                        tưởng cho cuộc sống đô thị hiện đại!
                    </p>
                    <p className="mb-3 text-[20px] leading-7 font-semibold tracking-wide text-slate-500">
                        Giờ đây, bạn có thể đặt vé metro theo ngày hoặc theo tháng chỉ với vài thao tác đơn giản ngay trên điện thoại hoặc máy tính.
                        Không cần xếp hàng, không cần mang tiền mặt, không còn lo trễ giờ – tất cả đều được số hóa, tiện lợi và linh hoạt theo nhu cầu
                        của bạn.
                    </p>

                    <p className="mb-3 text-[20px] leading-7 font-semibold tracking-wide text-slate-500">
                        Dù bạn là người đi làm, sinh viên hay du khách, metro là cách thông minh nhất để di chuyển khắp Sài Gòn – nhanh hơn, rẻ hơn và
                        xanh hơn.
                    </p>
                    <ul className="my-4 flex gap-4">
                        <li className="flex gap-2 text-[14px] leading-7 font-semibold tracking-wide text-slate-500">
                            <LucideNavigation className="text-orange-500" /> <span>Giảm giá khi mua vé tháng!</span>
                        </li>
                        <li className="flex gap-2 text-[14px] leading-7 font-semibold tracking-wide text-slate-500">
                            <Zap className="text-green-400" />
                            Ưu đãi cho học sinh, sinh viên.
                        </li>
                        <li className="flex gap-2 text-[14px] leading-7 font-semibold tracking-wide text-slate-500">
                            <PictureInPicture2 className="text-pink-500" />
                            Cập nhật, tra cứu tuyến đường
                        </li>
                    </ul>
                    <div className="flex items-center justify-center">
                        <button className="bg-primary border-primay hover:text-primary rounded-2xl border-2 px-[16px] py-[9px] text-white transition-all duration-200 hover:bg-white">
                            <Link to={'/buy-tickets'}>Đặt vé ngay</Link>
                        </button>
                    </div>
                </div>
                <div className="bg-primary mx-auto flex items-center justify-center px-[50px] py-[40px] text-justify">
                    <div className="max-w-5xl">
                        <h2 className="mb-[30px] text-center text-4xl font-medium text-white">Bạn cần sự tiện dụng ?</h2>
                        <p className="mb-3 text-[20px] leading-7 font-semibold tracking-wide text-white">
                            Vé 1 ngày: Cho phép đi không giới hạn trong 1 ngày. Phù hợp với người cần di chuyển nhiều trong ngày hoặc khách du lịch
                            muốn trải nghiệm metro.
                        </p>
                        <p className="mb-3 text-[20px] leading-7 font-semibold tracking-wide text-white">
                            Vé 3 ngày: Sử dụng trong 3 ngày liên tiếp, không giới hạn số lượt đi. Thích hợp với người có kế hoạch công tác hoặc du
                            lịch ngắn ngày.
                        </p>
                        <p className="mb-3 text-[20px] leading-7 font-semibold tracking-wide text-white">
                            Vé tháng phổ thông: Dành cho mọi đối tượng, sử dụng trong 30 ngày. Lựa chọn tiện lợi và tiết kiệm cho người đi làm hằng
                            ngày bằng metro.
                        </p>
                        <p className="mb-3 text-[20px] leading-7 font-semibold tracking-wide text-white">
                            Vé tháng HSSV: Vé tháng dành riêng cho học sinh, sinh viên có thẻ còn hiệu lực. Thời hạn 30 ngày, với mức giá ưu đãi bằng
                            một nửa vé phổ thông.
                        </p>
                        <ul className="my-4 flex gap-4">
                            <li className="flex gap-2 text-[14px] leading-7 font-semibold tracking-wide text-white">
                                <LucideNavigation className="text-orange-500" /> <span>Không cần mua vé mỗi ngày.</span>
                            </li>
                            <li className="flex gap-2 text-[14px] leading-7 font-semibold tracking-wide text-white">
                                <Zap className="text-green-400" />
                                Quản lý chi phí rõ ràng.
                            </li>
                            <li className="flex gap-2 text-[14px] leading-7 font-semibold tracking-wide text-white">
                                <PictureInPicture2 className="text-pink-500" />
                                Tiết kiệm chi phí dài hạn
                            </li>
                        </ul>
                        <div className="flex items-center justify-center">
                            <button className="text-primary hover:bg-primary rounded-2xl border-2 border-white bg-white px-[16px] py-[9px] transition-all duration-200 hover:text-white">
                                <Link to={'/buy-tickets'}>Đặt vé ngay</Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="relative h-[600px] overflow-hidden">
                    <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col justify-around p-[80px] px-[120px]">
                        <div className="flex flex-col">
                            <h2 className="text-primary-light z-10 text-[40px] font-bold uppercase">Chính sách chất lượng</h2>
                            <p className="text-primary-light z-10 text-[30px] font-bold uppercase">TCVN ISO 9001:2015</p>
                        </div>
                        <div className="flex justify-end">
                            <div className="mt-[100px] grid w-[75%] grid-cols-2 grid-rows-2 justify-end gap-[60px]">
                                <div className="flex gap-4">
                                    <div>
                                        <div className="bg-primary h-[50px] w-[50px] rounded-full text-center text-2xl leading-[50px] font-medium text-white">
                                            1
                                        </div>
                                    </div>
                                    <div>
                                        <div className="border-primary-light text-primary rounded-2xl border-[2px] bg-white p-[10px] font-medium tracking-wide">
                                            Xây dựng hình ảnh tốt đẹp về hệ thống đường sắt đô thị TP.HCM, góp phần cải thiện môi trường và nâng cao
                                            chất lượng cuộc sống người dân.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div>
                                        <div className="bg-primary h-[50px] w-[50px] rounded-full text-center text-2xl leading-[50px] font-medium text-white">
                                            2
                                        </div>
                                    </div>
                                    <div>
                                        <div className="border-primary-light text-primary rounded-2xl border-[2px] bg-white p-[10px] font-medium tracking-wide">
                                            Phát huy sức mạnh nội bộ và trách nhiệm của từng cá nhân trong hệ thống quản lý chất lượng.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div>
                                        <div className="bg-primary h-[50px] w-[50px] rounded-full text-center text-2xl leading-[50px] font-medium text-white">
                                            3
                                        </div>
                                    </div>
                                    <div>
                                        <div className="border-primary-light text-primary rounded-2xl border-[2px] bg-white p-[10px] font-medium tracking-wide">
                                            Tuân thủ đúng theo các quy định pháp luật và các yêu cầu của khách hàng.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div>
                                        <div className="bg-primary h-[50px] w-[50px] rounded-full text-center text-2xl leading-[50px] font-medium text-white">
                                            4
                                        </div>
                                    </div>
                                    <div>
                                        <div className="border-primary-light text-primary rounded-2xl border-[2px] bg-white p-[10px] font-medium tracking-wide">
                                            Phát triển nguồn nhân lực toàn diện, nâng cao năng lực, kỹ năng, ý thức trách nhiệm trong công việc.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 z-[1] h-[650px] w-full bg-black opacity-65"></div>
                    <div>
                        <img src="/public/images/banner_service_2.jpg" className="absolute top-0 left-0 mt-[-100px] h-[700px] w-full object-cover" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Service
