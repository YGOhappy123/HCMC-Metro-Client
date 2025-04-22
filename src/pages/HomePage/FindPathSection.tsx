import { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'
import useAxiosIns from '@/hooks/useAxiosIns'
import StationsChoosingForm from '@/pages/HomePage/StationsChoosingForm'

const FindPathSection = () => {
    const [path, setPath] = useState<IPath | undefined>(undefined)

    return (
        <section className="bg-ivory flex flex-col items-center px-5">
            <div className="max-w-container flex w-full flex-col gap-9">
                <div className="flex flex-col items-center gap-5">
                    <p className="text-secondary font-semibold tracking-widest uppercase">Tra cứu lộ trình</p>
                    <p className="font-serif text-5xl leading-[1.4] font-semibold text-balance">Tra cứu lộ trình nhanh chóng và hiệu quả</p>
                </div>
                <StationsChoosingForm setPath={setPath} />
                {path && (
                    <div className="flex flex-col items-center gap-6 rounded-3xl bg-white p-[50px]">
                        {path.length > 0 ? (
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="text-primary text-3xl font-semibold">
                                    Lộ trình của bạn gồm {path.length} đoạn và {path.length - 1} lần chuyển tuyến
                                </h3>
                                <h4 className="text-primary text-2xl font-semibold">
                                    Tổng giá tiền:{' '}
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        path.reduce((total, segment) => total + segment.price * 1000, 0)
                                    )}
                                </h4>
                            </div>
                        ) : (
                            <h3 className="text-primary text-3xl font-semibold">Không tìm thấy lộ trình phù hợp giữa 2 ga này</h3>
                        )}

                        {path.length > 0 && path.map((segment, index) => <SegmentDisplay key={index} segment={segment} index={index} />)}

                        <div className="flex w-full flex-col">
                            <i className="text-lg">
                                <b>Giá vé giữa 2 ga khác tuyến:</b> Giá vé = Tổng giá vé các đoạn cùng tuyến.
                            </i>
                            <i className="text-lg">
                                <b>Giá vé giữa 2 ga cùng tuyến:</b> Giá vé = Giá vé được niêm yết sẵn tại nhà ga.
                            </i>
                            <i className="text-lg">
                                <b>Ngày hết hạn của vé:</b> Ngày hết hạn = Thời điểm mua vé + 30 ngày.
                            </i>
                            <i className="mt-4 text-lg">
                                <b>Lưu ý:</b> Vé một chặng chỉ dùng được 1 lần trong thời gian hiệu lực.
                            </i>
                            <i className="text-lg">
                                <b>Lưu ý:</b> Vé một chặng chỉ có thể check-in và check-out ở đúng nhà ga đã mua.
                            </i>
                            <i className="text-lg">
                                <b>Lưu ý:</b> Vé mua rồi miễn đổi trả, bán lại dưới mọi hình thức.
                            </i>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

type SegmentDisplayProps = {
    segment: IPathSegment
    index: number
}

export const SegmentDisplay = ({ segment, index }: SegmentDisplayProps) => {
    const axios = useAxiosIns()

    const fetchLineInfoQuery = useQuery({
        queryKey: ['line-info', segment.line],
        queryFn: () => axios.get<IResponseData<ILine[]>>(`/stations/metro-lines?filter=${JSON.stringify({ lineName: segment.line })}`),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: true,
        select: res => res.data
    })
    const lineInfo = fetchLineInfoQuery.data?.data?.[0]

    const activeStationIndexes = useMemo(() => {
        if (!lineInfo || !lineInfo.stations) return []

        const entryIndex = lineInfo.stations.findIndex(st => (st as IStation).stationId === segment.from)!
        const exitIndex = lineInfo.stations.findIndex(st => (st as IStation).stationId === segment.to)!
        const start = Math.min(entryIndex, exitIndex)
        const end = Math.max(entryIndex, exitIndex)
        return Array.from({ length: end - start + 1 }, (_, i) => i + start)
    }, [segment, lineInfo])

    return (
        <div className="w-full">
            {index === 0 && lineInfo && (
                <h4 className="mb-4 text-xl font-semibold">
                    <FontAwesomeIcon icon={faArrowRight} /> Xuất phát tại ga:{' '}
                    {(lineInfo.stations as IStation[])?.find(st => st.stationId === segment.from)!.stationName}
                </h4>
            )}
            {index > 0 && lineInfo && (
                <h4 className="mb-4 text-xl font-semibold">
                    <FontAwesomeIcon icon={faArrowRight} /> Chuyển tuyến tại ga:{' '}
                    {(lineInfo.stations as IStation[])?.find(st => st.stationId === segment.from)!.stationName}
                </h4>
            )}
            <h4 className="text-xl font-semibold">
                <FontAwesomeIcon icon={faArrowRight} /> Đoạn {(index + 1).toString().padStart(2, '0')}: {segment.line}. Giá tiền:{' '}
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(segment.price * 1000)}
            </h4>
            {lineInfo && (
                <div className="overflow-x-auto">
                    <ul className="steps py-5">
                        {(lineInfo.stations as IStation[])?.map((station, idx) => (
                            <li
                                className={twMerge(
                                    `step text-balance ${activeStationIndexes.includes(idx) ? 'step-secondary' : 'after:text-white!'}`
                                )}
                                key={station.stationId}
                            >
                                {station.stationName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default FindPathSection
