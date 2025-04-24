import React from "react";

const Banner : React.FC = () => {
    return (
        <>
            <div>
                <div className="relative h-[650px]">
                    <div className="z-[2] h-[650px] w-full absolute flex">
                        <div className="flex flex-[2] items-center justify-center">
                            <div className="border-l-[5px] border-primary-light pl-[15px]">
                                <h1 className="text-[50px] text-white uppercase font-bold">Metro Hồ Chí Minh</h1>
                                <p className="text-primary-light text-[40px] font-bold uppercase">Kết Nối Thành Phố</p>
                                <p className="text-primary-light text-[40px] font-bold uppercase"> Đơn Giản Hơn Bao Giờ Hết</p>
                            </div>
                        </div>
                        <div className="flex-1"></div>
                    </div>
                    <div className="z-[1] bg-black h-[650px] w-full absolute opacity-75">
                    </div>
                    <div>
                        <img src="/public/images/banner_service.jpg" alt="banner" className="absolute top-0 left-0 z-0 w-full h-[650px] object-cover"/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Banner;