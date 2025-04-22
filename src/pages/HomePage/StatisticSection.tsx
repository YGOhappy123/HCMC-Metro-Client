const StatisticSection = () => {
    return (
        <section className="bg-accent flex justify-center px-5 py-[50px]">
            <div className="max-w-container text-ivory grid w-full grid-cols-2 gap-8 font-serif xl:grid-cols-4">
                <div className="flex flex-col items-center gap-5">
                    <span className="text-5xl font-semibold">
                        200<sup className="ml-3 text-2xl">+</sup>
                    </span>
                    <span className="text-xl font-semibold capitalize">Tàu Chạy Mỗi Ngày</span>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <span className="text-5xl font-semibold">1st</span>
                    <span className="text-xl font-semibold capitalize">Top 1 Dịch Vụ 2024</span>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <span className="text-5xl font-semibold">
                        20M<sup className="ml-3 text-2xl">+</sup>
                    </span>
                    <span className="text-xl font-semibold capitalize">Khách Hàng Mỗi Năm</span>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <span className="text-5xl font-semibold">
                        100<sup className="ml-3 text-2xl">+</sup>
                    </span>
                    <span className="text-xl font-semibold capitalize">Nhà Ga Tại TPHCM</span>
                </div>
            </div>
        </section>
    )
}

export default StatisticSection
